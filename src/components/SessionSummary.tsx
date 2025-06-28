import React, { useEffect, useState } from 'react';
import { Home, RotateCcw, Trophy, Target, Clock, TrendingUp, SkipForward, Zap } from 'lucide-react';
import { GameSession } from '../types';
import { formatTime, calculateAccuracy } from '../utils/gameLogic';
import { getPoints, saveTotalSessions, getTotalSessions, saveBestAccuracy } from '../utils/localStorage';
import { checkForNewBadges } from '../utils/achievements';
import { getCurrentThemeData } from '../utils/themes';
import BadgeNotification from './BadgeNotification';

interface SessionSummaryProps {
  session: GameSession;
  onBackToMenu: () => void;
  onPlayAgain: () => void;
  onViewCollection: () => void;
}

const SessionSummary: React.FC<SessionSummaryProps> = ({ session, onBackToMenu, onPlayAgain, onViewCollection }) => {
  const [newBadges, setNewBadges] = useState<string[]>([]);
  const [currentBadgeIndex, setCurrentBadgeIndex] = useState(0);

  const totalQuestions = session.correctAnswers + session.wrongAttempts;
  const accuracy = calculateAccuracy(session.correctAnswers, totalQuestions);
  const sessionDuration = session.endTime ? (session.endTime - session.startTime) / 1000 : 0;
  const averageTime = sessionDuration > 0 ? sessionDuration / session.correctAnswers : 0;
  const currentPoints = getPoints();
  const theme = getCurrentThemeData();

  useEffect(() => {
    // Update session count and best accuracy
    const newSessionCount = getTotalSessions() + 1;
    saveTotalSessions(newSessionCount);
    saveBestAccuracy(accuracy);

    // Check for new badges
    const unlockedBadges = checkForNewBadges(accuracy);
    setNewBadges(unlockedBadges);
  }, [accuracy]);

  const getPerformanceMessage = () => {
    if (accuracy >= 90) return "Outstanding! 🌟";
    if (accuracy >= 80) return "Great job! 🎉";
    if (accuracy >= 70) return "Good work! 👏";
    if (accuracy >= 60) return "Keep practicing! 💪";
    return "Don't give up! 🚀";
  };

  const getPerformanceColor = () => {
    if (accuracy >= 90) return "from-yellow-400 to-orange-500";
    if (accuracy >= 80) return "from-green-400 to-blue-500";
    if (accuracy >= 70) return "from-blue-400 to-purple-500";
    if (accuracy >= 60) return "from-purple-400 to-pink-500";
    return "from-gray-400 to-gray-600";
  };

  const handleBadgeNotificationClose = () => {
    if (currentBadgeIndex < newBadges.length - 1) {
      setCurrentBadgeIndex(prev => prev + 1);
    } else {
      setNewBadges([]);
      setCurrentBadgeIndex(0);
    }
  };

  const handleViewCollection = () => {
    setNewBadges([]);
    setCurrentBadgeIndex(0);
    onViewCollection();
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.colors.background} p-4`}>
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${getPerformanceColor()} rounded-3xl mb-4 shadow-lg`}>
            <Trophy className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Session Complete!</h1>
          <p className="text-lg text-gray-600">{getPerformanceMessage()}</p>
          
          {/* Mode Badge */}
          <div className="mt-4 inline-flex items-center space-x-2 bg-white/70 backdrop-blur-sm rounded-full px-4 py-2 shadow-md">
            {session.mode === 'practice' ? (
              <Target className="w-4 h-4 text-blue-600" />
            ) : (
              <Zap className="w-4 h-4 text-purple-600" />
            )}
            <span className="text-sm font-medium text-gray-700 capitalize">
              {session.mode} Mode
            </span>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="space-y-4 mb-8">
          {/* Correct Answers */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-green-100 rounded-xl">
                  <Target className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-600">Correct Answers</div>
                  <div className="text-2xl font-bold text-gray-800">{session.correctAnswers}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600">Points Earned</div>
                <div className="text-xl font-semibold text-green-600">+{session.correctAnswers}</div>
              </div>
            </div>
          </div>

          {/* Accuracy & Attempts */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-600">Accuracy</div>
                  <div className="text-2xl font-bold text-gray-800">{accuracy}%</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600">Wrong Attempts</div>
                <div className="text-xl font-semibold text-red-500">{session.wrongAttempts}</div>
              </div>
            </div>
          </div>

          {/* Skipped Questions (if any) */}
          {session.skippedQuestions > 0 && (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-orange-100 rounded-xl">
                  <SkipForward className="w-6 h-6 text-orange-600" />
                </div>
                <div className="flex-1">
                  <div className="text-sm text-gray-600">Questions Skipped</div>
                  <div className="text-2xl font-bold text-gray-800">{session.skippedQuestions}</div>
                </div>
              </div>
            </div>
          )}

          {/* Time Stats */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-purple-100 rounded-xl">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
              <div className="flex-1">
                <div className="text-sm text-gray-600">Average Time per Question</div>
                <div className="text-2xl font-bold text-gray-800">{formatTime(averageTime)}s</div>
              </div>
            </div>
          </div>

          {/* Total Points */}
          <div className={`bg-gradient-to-r ${theme.colors.accent} rounded-2xl p-6 shadow-lg text-white`}>
            <div className="text-center">
              <div className="text-sm opacity-90">Total Points</div>
              <div className="text-3xl font-bold">{currentPoints}</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={onPlayAgain}
            className={`w-full bg-gradient-to-r ${theme.colors.accent} hover:opacity-90 text-white font-semibold py-4 px-6 rounded-2xl shadow-lg transform transition-all duration-200 hover:scale-105 hover:shadow-xl flex items-center justify-center space-x-3`}
          >
            <RotateCcw className="w-6 h-6" />
            <span className="text-lg">Practice Again</span>
          </button>

          <button
            onClick={onBackToMenu}
            className="w-full bg-white/80 backdrop-blur-sm hover:bg-white text-gray-700 font-semibold py-4 px-6 rounded-2xl shadow-lg transform transition-all duration-200 hover:scale-105 hover:shadow-xl flex items-center justify-center space-x-3"
          >
            <Home className="w-6 h-6" />
            <span className="text-lg">Back to Menu</span>
          </button>
        </div>
      </div>

      {/* Badge Notifications */}
      {newBadges.length > 0 && currentBadgeIndex < newBadges.length && (
        <BadgeNotification
          badgeId={newBadges[currentBadgeIndex]}
          onClose={handleBadgeNotificationClose}
          onViewCollection={handleViewCollection}
        />
      )}
    </div>
  );
};

export default SessionSummary;