export type GradeLevel = 6 | 7 | 8 | 9 | 10 | 11 | 12;

export type TrackGroup =
  | 'General'
  | 'Science'
  | 'Commerce'
  | 'Arts'
  | 'STEM'
  | 'Exam Prep';

export type Course =
  | 'Math'
  | 'Science'
  | 'English'
  | 'Social Studies'
  | 'Computer Science'
  | 'Physics'
  | 'Chemistry'
  | 'Biology'
  | 'History'
  | 'Geography';

export type Mood = 'Bored' | 'Confused' | 'Curious' | 'Tired' | 'Okay';

export type LearningStyle = 'Examples' | 'Stories' | 'Steps' | 'Quizzes' | 'Visuals';

export type ActivityType = 'Game' | 'Visual' | 'Challenge' | 'Text' | 'Experiment' | 'Quiz';

export interface ActivityEngagement {
  type: ActivityType;
  engagementDelta: number;
  timestamp: number;
}

export interface LearningFingerprint {
  bestActivities: ActivityType[];
  preferredSessionMinutes: number;
  difficultyTrajectory: 'Easy→Medium' | 'Medium→Hard' | 'Hard' | 'Easy';
  bestRecoveryStrategy: string;
  engagementHistory: ActivityEngagement[];
  lastUpdated: number;
}

export type ExperimentStatus = 'idle' | 'predicting' | 'running' | 'revealed';

export interface ExperimentOption {
  label: string;
  value: string;
}

export interface ExperimentBlock {
  id: string;
  code: string;
  language: string;
  question: string;
  options: ExperimentOption[];
  correctAnswer: string;
  explanation: string;
  followUp: string;
  status: ExperimentStatus;
  selectedAnswer?: string;
}

export interface StudentProfile {
  name: string;
  grade: GradeLevel;
  group: TrackGroup;
  courses: Course[];
  mood: Mood;
  learningStyle: LearningStyle;
  streakDays: number;
  questsCompleted: number;
  successRate: number;
}

export interface Quest {
  id: string;
  title: string;
  category: string;
  subject: Course;
  difficulty: 'Beginner' | 'Intermediate' | 'Mastery';
  icon: string;
  description: string;
  promptSeed: string;
  sampleCode?: string;
}
