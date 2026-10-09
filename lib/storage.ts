import { StudentProfile, LearningFingerprint, ActivityType, ActivityEngagement } from './types';

export const DEFAULT_PROFILE: StudentProfile = {
  name: 'Ayo',
  grade: 9,
  group: 'STEM',
  courses: ['Computer Science', 'Physics', 'Math'],
  mood: 'Curious',
  learningStyle: 'Visuals',
  streakDays: 6,
  questsCompleted: 14,
  successRate: 92,
};

export const DEFAULT_FINGERPRINT: LearningFingerprint = {
  bestActivities: ['Challenge', 'Visual', 'Experiment'],
  preferredSessionMinutes: 12,
  difficultyTrajectory: 'Medium→Hard',
  bestRecoveryStrategy: 'Real-world experiments',
  engagementHistory: [
    { type: 'Challenge', engagementDelta: 28, timestamp: Date.now() - 3600000 },
    { type: 'Visual', engagementDelta: 18, timestamp: Date.now() - 7200000 },
  ],
  lastUpdated: Date.now(),
};

const PROFILE_KEY = 'vl_student_profile';
const FINGERPRINT_KEY = 'vl_learning_fingerprint';
const OFFLINE_QUEUE_KEY = 'vl_offline_sync_queue';

export function getStoredProfile(): StudentProfile {
  if (typeof window === 'undefined') return DEFAULT_PROFILE;
  try {
    const item = localStorage.getItem(PROFILE_KEY);
    return item ? JSON.parse(item) : DEFAULT_PROFILE;
  } catch {
    return DEFAULT_PROFILE;
  }
}

export function saveStoredProfile(profile: StudentProfile): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  } catch (e) {
    console.error('Failed to save profile', e);
  }
}

export function getFingerprint(): LearningFingerprint {
  if (typeof window === 'undefined') return DEFAULT_FINGERPRINT;
  try {
    const item = localStorage.getItem(FINGERPRINT_KEY);
    return item ? JSON.parse(item) : DEFAULT_FINGERPRINT;
  } catch {
    return DEFAULT_FINGERPRINT;
  }
}

export function saveFingerprint(fp: LearningFingerprint): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(FINGERPRINT_KEY, JSON.stringify(fp));
  } catch (e) {
    console.error('Failed to save fingerprint', e);
  }
}

export function updateFingerprint(
  fp: LearningFingerprint,
  activityType: ActivityType,
  engagementDelta: number
): LearningFingerprint {
  const entry: ActivityEngagement = {
    type: activityType,
    engagementDelta,
    timestamp: Date.now(),
  };

  const history = [...fp.engagementHistory, entry].slice(-50);

  const sums: Record<string, number> = {};
  const counts: Record<string, number> = {};

  for (const e of history) {
    sums[e.type] = (sums[e.type] || 0) + e.engagementDelta;
    counts[e.type] = (counts[e.type] || 0) + 1;
  }

  const sortedActivities = (Object.keys(sums) as ActivityType[]).sort(
    (a, b) => sums[b] / counts[b] - sums[a] / counts[a]
  );

  const recent = history.slice(-8);
  const avgDelta = recent.reduce((sum, item) => sum + item.engagementDelta, 0) / (recent.length || 1);

  let trajectory: LearningFingerprint['difficultyTrajectory'] = fp.difficultyTrajectory;
  if (avgDelta > 15) trajectory = 'Medium→Hard';
  else if (avgDelta > 5) trajectory = 'Easy→Medium';
  else if (avgDelta < -5) trajectory = 'Easy';

  const updated: LearningFingerprint = {
    bestActivities: sortedActivities.slice(0, 3),
    preferredSessionMinutes: fp.preferredSessionMinutes,
    difficultyTrajectory: trajectory,
    bestRecoveryStrategy: 'Interactive Code Playground',
    engagementHistory: history,
    lastUpdated: Date.now(),
  };

  saveFingerprint(updated);
  return updated;
}

export interface OfflineAction {
  id: string;
  type: string;
  title: string;
  timestamp: number;
}

export function getOfflineQueue(): OfflineAction[] {
  if (typeof window === 'undefined') return [];
  try {
    const item = localStorage.getItem(OFFLINE_QUEUE_KEY);
    return item ? JSON.parse(item) : [];
  } catch {
    return [];
  }
}

export function enqueueOfflineAction(action: OfflineAction): void {
  if (typeof window === 'undefined') return;
  const list = getOfflineQueue();
  list.push(action);
  try {
    localStorage.setItem(OFFLINE_QUEUE_KEY, JSON.stringify(list));
  } catch (e) {
    console.error('Failed to enqueue offline item', e);
  }
}

export function clearOfflineQueue(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(OFFLINE_QUEUE_KEY, JSON.stringify([]));
  } catch {}
}
