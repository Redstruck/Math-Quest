export interface GameSession {
  correctAnswers: number;
  wrongAttempts: number;
  startTime: number;
  endTime?: number;
  mode: 'practice' | 'endless';
  skippedQuestions: number;
}

export interface Question {
  multiplicand: number;
  multiplier: number;
  answer: number;
  tableId: number;
  id: string;
  completed?: boolean;
  skipped?: boolean;
}

export interface GameState {
  selectedTables: number[];
  currentQuestion: Question | null;
  currentAttempts: number;
  session: GameSession;
  questions: Question[];
  currentQuestionIndex: number;
  mode: 'practice' | 'endless';
  skipEnabled: boolean;
  endlessCorrectCount: number;
  canEndSession: boolean;
}

export interface TableProgress {
  tableId: number;
  questions: Question[];
  completed: number;
  total: number;
}

export interface Theme {
  id: string;
  name: string;
  price: number;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
  };
  preview: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  price?: number;
  requirement?: {
    type: 'correctAnswers' | 'sessions' | 'accuracy';
    value: number;
  };
  icon: string;
  color: string;
  unlocked: boolean;
}

export interface Pet {
  id: string;
  name: string;
  price: number;
  emoji: string;
  description: string;
}

export interface UserProgress {
  totalCorrectAnswers: number;
  totalSessions: number;
  bestAccuracy: number;
}

export type AppView = 'menu' | 'setup' | 'gameplay' | 'summary' | 'shop' | 'collection';