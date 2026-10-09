import { NextRequest, NextResponse } from 'next/server';
import { buildSystemPrompt } from '@/lib/prompt';
import { StudentProfile, LearningFingerprint } from '@/lib/types';

export const runtime = 'nodejs';

const OLLAMA_BASE = process.env.OLLAMA_BASE_URL || 'http://localhost:11434';
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'llama3.2:1b';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages, profile, fingerprint } = body as {
      messages: Array<{ role: 'user' | 'assistant'; content: string }>;
      profile: StudentProfile;
      fingerprint?: LearningFingerprint;
    };

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Missing messages array' }, { status: 400 });
    }

    const systemPrompt = buildSystemPrompt(profile, fingerprint);
    const payloadMessages = [
      { role: 'system', content: systemPrompt },
      ...messages,
    ];

    const res = await fetch(`${OLLAMA_BASE}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: OLLAMA_MODEL,
        messages: payloadMessages,
        stream: true,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      return NextResponse.json({ error: `Ollama error: ${errText}` }, { status: 502 });
    }

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        const reader = res.body?.getReader();
        if (!reader) {
          controller.close();
          return;
        }
        const decoder = new TextDecoder();
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            const text = decoder.decode(value, { stream: true });
            for (const line of text.split('\n')) {
              if (!line.trim()) continue;
              try {
                const parsed = JSON.parse(line);
                const chunk = parsed?.message?.content ?? '';
                if (chunk) controller.enqueue(encoder.encode(chunk));
                if (parsed?.done) {
                  controller.close();
                  return;
                }
              } catch {
                // Ignore partial JSON
              }
            }
          }
          controller.close();
        } catch (err) {
          controller.error(err);
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
      },
    });
  } catch (error: any) {
    console.error('Ollama chat error:', error);
    return NextResponse.json({ error: error?.message || 'Server error' }, { status: 500 });
  }
}
