import { Question, TableProgress } from '../types';

export const generateQuestionsForMode = (
  tables: number[], 
  mode: 'practice' | 'endless'
): Question[] => {
  const questions: Question[] = [];
  
  if (mode === 'practice') {
    // Practice mode: Generate all questions for selected tables
    tables.forEach(table => {
      for (let i = 1; i <= 12; i++) {
        questions.push({
          multiplicand: table,
          multiplier: i,
          answer: table * i,
          tableId: table,
          id: `${table}-${i}`,
          completed: false,
          skipped: false
        });
      }
    });
  } else {
    // Endless mode: Generate a large pool of questions for random selection
    for (let round = 0; round < 10; round++) {
      tables.forEach(table => {
        for (let i = 1; i <= 12; i++) {
          questions.push({
            multiplicand: table,
            multiplier: i,
            answer: table * i,
            tableId: table,
            id: `${table}-${i}-${round}`,
            completed: false,
            skipped: false
          });
        }
      });
    }
  }
  
  // Shuffle questions
  return questions.sort(() => Math.random() - 0.5);
};

export const getTableProgress = (questions: Question[], tables: number[]): TableProgress[] => {
  return tables.map(tableId => {
    const tableQuestions = questions.filter(q => q.tableId === tableId);
    const completed = tableQuestions.filter(q => q.completed || q.skipped).length;
    
    return {
      tableId,
      questions: tableQuestions,
      completed,
      total: tableQuestions.length
    };
  });
};

export const getTableColors = (): { [key: number]: string } => ({
  2: 'from-blue-200 to-blue-300',
  3: 'from-green-200 to-green-300',
  4: 'from-purple-200 to-purple-300',
  5: 'from-pink-200 to-pink-300',
  6: 'from-yellow-200 to-yellow-300',
  7: 'from-red-200 to-red-300',
  8: 'from-indigo-200 to-indigo-300',
  9: 'from-orange-200 to-orange-300',
  10: 'from-teal-200 to-teal-300',
  11: 'from-cyan-200 to-cyan-300',
  12: 'from-rose-200 to-rose-300'
});

export const formatTime = (seconds: number): string => {
  return seconds.toFixed(1);
};

export const calculateAccuracy = (correct: number, total: number): number => {
  if (total === 0) return 0;
  return Math.round((correct / total) * 100);
};

export const getNextQuestion = (
  questions: Question[], 
  mode: 'practice' | 'endless',
  currentIndex: number
): { question: Question | null; index: number; isComplete: boolean } => {
  
  if (mode === 'practice') {
    // Find next incomplete question
    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      if (!question.completed && !question.skipped) {
        return { question, index: i, isComplete: false };
      }
    }
    return { question: null, index: -1, isComplete: true };
  } else {
    // Endless mode: continue with next question in shuffled order
    if (currentIndex + 1 < questions.length) {
      return { 
        question: questions[currentIndex + 1], 
        index: currentIndex + 1, 
        isComplete: false 
      };
    } else {
      // Reshuffle and continue
      const availableQuestions = questions.filter(q => !q.completed && !q.skipped);
      if (availableQuestions.length > 0) {
        const shuffled = availableQuestions.sort(() => Math.random() - 0.5);
        return { question: shuffled[0], index: 0, isComplete: false };
      }
      return { question: null, index: -1, isComplete: true };
    }
  }
};