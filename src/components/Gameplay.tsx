import React, { useState, useEffect } from 'react';
import { ArrowLeft, SkipForward, Target, Zap, CheckCircle, Crown, Flame } from 'lucide-react';
import { Question, GameSession, TableProgress } from '../types';
import { addPoints, saveTotalCorrectAnswers, getTotalCorrectAnswers, getActivePet } from '../utils/localStorage';
import { getCurrentThemeData } from '../utils/themes';
import { getTableProgress, getTableColors, getNextQuestion } from '../utils/gameLogic';
import { pets } from '../data/shopItems';
import ConfettiEffect from './ConfettiEffect';

interface GameplayProps {
  questions: Question[];
  mode: 'practice' | 'endless';
  skipEnabled: boolean;
  selectedTables: number[];
  onBack: () => void;
  onSessionComplete: (session: GameSession) => void;
}

const Gameplay: React.FC<GameplayProps> = ({ 
  questions: initialQuestions, 
  mode, 
  skipEnabled, 
  selectedTables,
  onBack, 
  onSessionComplete 
}) => {
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [endlessCorrectCount, setEndlessCorrectCount] = useState(0);
  const [canEndSession, setCanEndSession] = useState(false);
  const [session, setSession] = useState<GameSession>({
    correctAnswers: 0,
    wrongAttempts: 0,
    startTime: Date.now(),
    mode,
    skippedQuestions: 0
  });
  const [showFeedback, setShowFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [tableProgress, setTableProgress] = useState<TableProgress[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const theme = getCurrentThemeData();
  const activePetId = getActivePet();
  const activePet = activePetId ? pets.find(p => p.id === activePetId) : null;
  const tableColors = getTableColors();

  // Initialize table progress
  useEffect(() => {
    setTableProgress(getTableProgress(questions, selectedTables));
  }, [questions, selectedTables]);

  // Update progress and check for completion
  useEffect(() => {
    const updatedProgress = getTableProgress(questions, selectedTables);
    setTableProgress(updatedProgress);

    if (mode === 'practice') {
      const allCompleted = updatedProgress.every(table => table.completed === table.total);
      if (allCompleted && currentQuestion) {
        const completedSession = {
          ...session,
          endTime: Date.now()
        };
        onSessionComplete(completedSession);
      }
    } else if (mode === 'endless') {
      setCanEndSession(endlessCorrectCount >= 20);
    }
  }, [questions, mode, endlessCorrectCount, session, currentQuestion, onSessionComplete]);

  // Keyboard input handling
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (showFeedback) return;

      if (event.key >= '0' && event.key <= '9') {
        event.preventDefault();
        handleNumberInput(event.key);
      } else if (event.key === 'Backspace') {
        event.preventDefault();
        handleBackspace();
      } else if (event.key === 'Enter') {
        event.preventDefault();
        handleSubmit();
      } else if (event.key === 'Escape') {
        event.preventDefault();
        handleClear();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [userAnswer, showFeedback]);

  const handleNumberInput = (num: string) => {
    if (userAnswer.length < 4) {
      setUserAnswer(prev => prev + num);
    }
  };

  const handleBackspace = () => {
    setUserAnswer(prev => prev.slice(0, -1));
  };

  const handleClear = () => {
    setUserAnswer('');
  };

  const moveToNextQuestion = () => {
    const nextQuestionData = getNextQuestion(questions, mode, currentQuestionIndex);
    
    if (nextQuestionData.question) {
      setCurrentQuestionIndex(nextQuestionData.index);
      setUserAnswer('');
      setAttempts(0);
      setShowFeedback(null);
    } else if (nextQuestionData.isComplete) {
      const completedSession = {
        ...session,
        endTime: Date.now()
      };
      onSessionComplete(completedSession);
    }
  };

  const handleSubmit = () => {
    if (!userAnswer || !currentQuestion) return;

    const answer = parseInt(userAnswer, 10);
    const isCorrect = answer === currentQuestion.answer;

    if (isCorrect) {
      setShowFeedback('correct');
      setShowConfetti(true); // Trigger confetti animation
      
      const updatedQuestions = [...questions];
      updatedQuestions[currentQuestionIndex] = { ...currentQuestion, completed: true };
      setQuestions(updatedQuestions);

      setSession(prev => ({
        ...prev,
        correctAnswers: prev.correctAnswers + 1
      }));

      if (mode === 'endless') {
        setEndlessCorrectCount(prev => prev + 1);
      }
      
      addPoints(1);
      const newTotal = getTotalCorrectAnswers() + 1;
      saveTotalCorrectAnswers(newTotal);

      setTimeout(() => {
        setShowConfetti(false);
        moveToNextQuestion();
      }, 2000);
    } else {
      setShowFeedback('incorrect');
      setAttempts(prev => prev + 1);
      setSession(prev => ({
        ...prev,
        wrongAttempts: prev.wrongAttempts + 1
      }));

      setTimeout(() => {
        setShowFeedback(null);
        setUserAnswer('');
      }, 1000);
    }
  };

  const handleSkip = () => {
    if (!currentQuestion) return;

    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestionIndex] = { ...currentQuestion, skipped: true };
    setQuestions(updatedQuestions);

    setSession(prev => ({
      ...prev,
      skippedQuestions: prev.skippedQuestions + 1
    }));

    setUserAnswer('');
    setAttempts(0);
    setShowFeedback(null);
    
    moveToNextQuestion();
  };

  const handleEndSession = () => {
    const completedSession = {
      ...session,
      endTime: Date.now()
    };
    onSessionComplete(completedSession);
  };

  const getProgress = () => {
    if (mode === 'practice') {
      const totalQuestions = questions.length;
      const completedQuestions = questions.filter(q => q.completed || q.skipped).length;
      return (completedQuestions / totalQuestions) * 100;
    } else {
      return Math.min((endlessCorrectCount / 20) * 100, 100);
    }
  };

  const numberPadButtons = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['Clear', '0', '⌫']
  ];

  if (!currentQuestion) {
    return (
      <div className={`min-h-screen bg-gradient-to-br ${theme.colors.background} flex items-center justify-center p-4`}>
        <div className="text-center opacity-0 animate-fade-in-scale">
          <div className="text-8xl mb-6 animate-bounce-gentle">🏆</div>
          <h2 className="text-4xl font-bold title-rpg mb-2">Quest Complete!</h2>
          <p className="subtitle-rpg text-lg">Victory is yours, brave adventurer!</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.colors.background} p-4 relative overflow-hidden`}>
      {/* Confetti Effect */}
      <ConfettiEffect 
        trigger={showConfetti} 
        onComplete={() => setShowConfetti(false)} 
      />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-16 h-16 bg-yellow-300/10 rounded-full animate-float"></div>
        <div className="absolute top-32 right-20 w-12 h-12 bg-purple-300/10 rounded-full animate-float animation-delay-400"></div>
        <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-blue-300/10 rounded-full animate-float animation-delay-600"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 opacity-0 animate-fade-in">
          <button
            onClick={onBack}
            className="p-3 glass-rpg rounded-xl shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
          >
            <ArrowLeft className="w-6 h-6 text-amber-700" />
          </button>
          
          <div className="text-center flex-1 mx-4">
            <div className="flex items-center justify-center space-x-3 mb-2">
              {mode === 'practice' ? (
                <>
                  <Target className="w-5 h-5 text-blue-600" />
                  <span className="font-bold title-rpg text-blue-700 text-lg">Training Grounds</span>
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5 text-purple-600" />
                  <span className="font-bold title-rpg text-purple-700 text-lg">Arena Challenge</span>
                </>
              )}
            </div>
            
            {mode === 'practice' ? (
              <div className="subtitle-rpg mb-2 text-sm">
                {questions.filter(q => q.completed || q.skipped).length} of {questions.length} challenges
              </div>
            ) : (
              <div className="subtitle-rpg mb-2 text-sm">
                {endlessCorrectCount} / 20 victories achieved
              </div>
            )}
            
            <div className="progress-bar-rpg w-40 mx-auto">
              <div 
                className="progress-fill-rpg transition-all duration-500"
                style={{ width: `${getProgress()}%` }}
              />
            </div>
          </div>

          {/* Active Pet */}
          {activePet && (
            <div className="text-3xl animate-bounce-gentle">
              {activePet.emoji}
            </div>
          )}
          {!activePet && <div className="w-12" />}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Table Progress Sidebar */}
          <div className="lg:col-span-1 opacity-0 animate-fade-in-up animation-delay-100">
            <div className="rpg-card p-4">
              <h3 className="text-lg font-bold title-rpg mb-3 flex items-center">
                <Crown className="w-4 h-4 mr-2 text-amber-600" />
                Quest Progress
              </h3>
              <div className="space-y-2">
                {tableProgress.map((table, index) => (
                  <div key={table.tableId} className="relative opacity-0 animate-fade-in" style={{ animationDelay: `${200 + index * 100}ms` }}>
                    <div className={`
                      table-progress-card
                      ${currentQuestion.tableId === table.tableId ? 'active' : ''}
                      ${table.completed === table.total ? 'completed' : ''}
                    `}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-amber-900 text-sm">Table of {table.tableId}</span>
                        <span className="text-xs subtitle-rpg">
                          {table.completed}/{table.total}
                        </span>
                      </div>
                      <div className="progress-bar-rpg h-2">
                        <div 
                          className="progress-fill-rpg transition-all duration-500"
                          style={{ width: `${(table.completed / table.total) * 100}%` }}
                        />
                      </div>
                      {table.completed === table.total && (
                        <div className="absolute top-1 right-1">
                          <CheckCircle className="w-4 h-4 text-emerald-600 animate-bounce-gentle" />
                        </div>
                      )}
                      {currentQuestion.tableId === table.tableId && (
                        <div className="absolute -top-1 -right-1">
                          <Flame className="w-4 h-4 text-orange-500 animate-bounce" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Question Area */}
          <div className="lg:col-span-3">
            {/* Current Question */}
            <div className={`
              rpg-card p-6 mb-4 text-center transform transition-all duration-500 opacity-0 animate-fade-in-scale animation-delay-200
              ${showFeedback === 'correct' ? 'animate-success shadow-golden' : ''}
              ${showFeedback === 'incorrect' ? 'animate-error' : ''}
            `}>
              <div className={`
                inline-block px-3 py-1 rounded-xl mb-4 bg-gradient-to-r ${tableColors[currentQuestion.tableId]}
                border-2 border-amber-400 shadow-md
              `}>
                <span className="font-bold text-amber-900 text-sm">
                  Table of {currentQuestion.tableId}
                </span>
              </div>
              
              <div className="text-5xl font-bold title-rpg mb-4 text-shadow-rpg">
                {currentQuestion.multiplicand} × {currentQuestion.multiplier}
              </div>
              <div className="text-2xl subtitle-rpg mb-4">=</div>
              <div className="relative">
                <input
                  type="text"
                  value={userAnswer}
                  readOnly
                  placeholder="?"
                  className="input-rpg text-3xl"
                />
                {showFeedback === 'correct' && !showConfetti && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-6xl animate-bounce">✨</div>
                  </div>
                )}
                {showFeedback === 'incorrect' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-4xl animate-wiggle">❌</div>
                  </div>
                )}
              </div>
              {attempts > 0 && showFeedback !== 'correct' && (
                <div className="mt-3 subtitle-rpg text-sm">
                  Attempt {attempts + 1} of 3
                </div>
              )}
            </div>

            {/* Keyboard Hint */}
            <div className="text-center mb-3 subtitle-rpg text-sm opacity-0 animate-fade-in animation-delay-300">
              Use your keyboard or mystical number pad below • Press Enter to cast your answer
            </div>

            {/* Number Pad */}
            <div className="rpg-card p-4 opacity-0 animate-fade-in-up animation-delay-400">
              <div className="grid grid-cols-3 gap-2 mb-3 max-w-xs mx-auto">
                {numberPadButtons.flat().map((button, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      if (button === 'Clear') handleClear();
                      else if (button === '⌫') handleBackspace();
                      else if (button !== 'Clear' && button !== '⌫') handleNumberInput(button);
                    }}
                    className={`
                      ${button === 'Clear' || button === '⌫' ? 'special-button' : 'number-pad-button'}
                      h-12 text-lg font-bold opacity-0 animate-fade-in
                    `}
                    style={{ animationDelay: `${500 + index * 30}ms` }}
                  >
                    {button}
                  </button>
                ))}
              </div>
              
              {/* Action Buttons */}
              <div className="grid grid-cols-1 gap-2 max-w-sm mx-auto">
                <button
                  onClick={handleSubmit}
                  disabled={!userAnswer || showFeedback !== null}
                  className={`
                    w-full py-3 rounded-xl font-bold text-base transition-all duration-200 transform hover:scale-105 shadow-md opacity-0 animate-fade-in-up animation-delay-600
                    ${userAnswer && showFeedback === null
                      ? 'rpg-button'
                      : 'bg-gray-400 text-gray-600 cursor-not-allowed border-2 border-gray-500'
                    }
                  `}
                >
                  Cast Answer Spell
                </button>

                {/* Skip Button */}
                {skipEnabled && attempts >= 3 && showFeedback !== 'correct' && (
                  <button
                    onClick={handleSkip}
                    className="w-full py-2 rounded-xl font-semibold text-sm ruby-button transition-all duration-200 transform hover:scale-105 shadow-md flex items-center justify-center space-x-2 opacity-0 animate-fade-in animation-delay-700"
                  >
                    <SkipForward className="w-4 h-4" />
                    <span>Strategic Retreat</span>
                  </button>
                )}

                {/* End Session Button (Endless Mode) */}
                {mode === 'endless' && canEndSession && (
                  <button
                    onClick={handleEndSession}
                    className="w-full py-2 rounded-xl font-semibold text-sm emerald-button flex items-center justify-center space-x-2 opacity-0 animate-fade-in animation-delay-700"
                  >
                    <Crown className="w-4 h-4" />
                    <span>Claim Victory ({endlessCorrectCount}/20)</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gameplay;