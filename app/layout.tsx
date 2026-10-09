import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'VibeLearn NextGen — Cognitive Quest Studio',
  description:
    'An adaptive engagement studio powered by local Ollama with live telemetry fingerprinting and experiment mode.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#0F081D] text-slate-100 font-sans antialiased h-screen overflow-hidden">
        {children}
      </body>
    </html>
  );
}
