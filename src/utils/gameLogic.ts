import { Question, TableProgress } from '../types';

export const generateQuestionsForMode = (
  tables: number[], 
  mode: 'practice' | 'endless'
): Question[] => {
  const questions: Question[] = [];
  
  if (mode === 'practice') {
    // Practice mode: Generate all questions for selected tables (once each)
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
    
    // Shuffle questions for practice mode to avoid predictable order
    return questions.sort(() => Math.random() - 0.5);
  } else {
    // Endless mode: Generate a much larger pool to prevent repetition
    // Create 50 rounds of questions to ensure variety
    for (let round = 0; round < 50; round++) {
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
    
    // Thoroughly shuffle the large pool
    return questions.sort(() => Math.random() - 0.5);
  }
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
  currentIndex: number,
  lastQuestionId?: string
): { question: Question | null; index: number; isComplete: boolean } => {
  
  console.log(`🔍 Finding next question - Mode: ${mode}, Current Index: ${currentIndex}, Last Question: ${lastQuestionId}`);
  console.log(`📊 Questions status:`, questions.map(q => `${q.multiplicand}×${q.multiplier}: ${q.completed ? 'DONE' : q.skipped ? 'SKIP' : 'PENDING'}`));
  
  if (mode === 'practice') {
    // Practice mode: Find the next incomplete question in sequential order
    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      if (!question.completed && !question.skipped) {
        console.log(`✅ Found next practice question at index ${i}: ${question.multiplicand} × ${question.multiplier}`);
        return { question, index: i, isComplete: false };
      }
    }
    
    // All questions completed
    console.log('🏁 All practice questions completed');
    return { question: null, index: -1, isComplete: true };
    
  } else {
    // Endless mode: Find next question that isn't the same as the last one
    const availableQuestions = questions.filter(q => !q.completed && !q.skipped);
    
    console.log(`📈 Available endless questions: ${availableQuestions.length}`);
    
    if (availableQuestions.length === 0) {
      console.log('🔄 No available questions, resetting all questions for endless mode');
      // Reset all questions for endless mode
      const resetQuestions = questions.map(q => ({ ...q, completed: false, skipped: false }));
      const shuffled = resetQuestions.sort(() => Math.random() - 0.5);
      return { question: shuffled[0], index: 0, isComplete: false };
    }
    
    // Filter out the last question to prevent immediate repetition
    let filteredQuestions = availableQuestions;
    if (lastQuestionId) {
      filteredQuestions = availableQuestions.filter(q => q.id !== lastQuestionId);
      console.log(`🚫 Filtering out last question ${lastQuestionId}, remaining: ${filteredQuestions.length}`);
      
      // If filtering removes all questions, use the full available pool
      if (filteredQuestions.length === 0) {
        console.log('⚠️ No questions left after filtering, using full pool');
        filteredQuestions = availableQuestions;
      }
    }
    
    // Shuffle and pick the first question
    const shuffled = filteredQuestions.sort(() => Math.random() - 0.5);
    const nextQuestion = shuffled[0];
    
    // Find the index of this question in the original array
    const originalIndex = questions.findIndex(q => q.id === nextQuestion.id);
    
    console.log(`✅ Found next endless question: ${nextQuestion.multiplicand} × ${nextQuestion.multiplier} at index ${originalIndex}`);
    return { question: nextQuestion, index: originalIndex, isComplete: false };
  }
};

// New utility function to prevent consecutive identical questions
export const getRandomQuestionExcluding = (
  questions: Question[],
  excludeQuestionId?: string
): Question | null => {
  const availableQuestions = questions.filter(q => 
    !q.completed && 
    !q.skipped && 
    q.id !== excludeQuestionId
  );
  
  if (availableQuestions.length === 0) {
    return null;
  }
  
  const randomIndex = Math.floor(Math.random() * availableQuestions.length);
  return availableQuestions[randomIndex];
};

// Enhanced question pool management for endless mode
export const refreshQuestionPool = (
  questions: Question[],
  tables: number[]
): Question[] => {
  console.log('🔄 Refreshing question pool for endless mode');
  
  // Reset completion status and generate fresh questions
  const freshQuestions: Question[] = [];
  
  // Generate multiple rounds to ensure variety
  for (let round = 0; round < 25; round++) {
    tables.forEach(table => {
      for (let i = 1; i <= 12; i++) {
        freshQuestions.push({
          multiplicand: table,
          multiplier: i,
          answer: table * i,
          tableId: table,
          id: `${table}-${i}-fresh-${round}-${Date.now()}`,
          completed: false,
          skipped: false
        });
      }
    });
  }
  
  // Thoroughly shuffle the new pool
  return freshQuestions.sort(() => Math.random() - 0.5);
};