import React, { useState } from 'react';
import { ArrowLeft, Play, Shuffle, CheckSquare, Target, Zap, SkipForward, Sword, Shield } from 'lucide-react';
import { getCurrentThemeData } from '../utils/themes';

interface GameSetupProps {
  onBack: () => void;
  onStartGame: (selectedTables: number[], mode: 'practice' | 'endless', skipEnabled: boolean) => void;
}

const GameSetup: React.FC<GameSetupProps> = ({ onBack, onStartGame }) => {
  const [selectedTables, setSelectedTables] = useState<number[]>([]);
  const [gameMode, setGameMode] = useState<'practice' | 'endless'>('practice');
  const [skipEnabled, setSkipEnabled] = useState(true);
  const theme = getCurrentThemeData();
  
  const availableTables = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  const toggleTable = (table: number) => {
    setSelectedTables(prev => 
      prev.includes(table) 
        ? prev.filter(t => t !== table)
        : [...prev, table]
    );
  };

  const selectAll = () => {
    setSelectedTables(availableTables);
  };

  const selectRandom = () => {
    const shuffled = [...availableTables].sort(() => Math.random() - 0.5);
    const randomCount = Math.floor(Math.random() * 3) + 3; // 3-5 tables
    setSelectedTables(shuffled.slice(0, randomCount));
  };

  const clearSelection = () => {
    setSelectedTables([]);
  };

  const handleStart = () => {
    if (selectedTables.length > 0) {
      onStartGame(selectedTables, gameMode, skipEnabled);
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.colors.background} p-4 relative overflow-hidden`}>
      {/* Animated background elements - More subtle */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-16 h-16 bg-amber-300/10 rounded-full animate-float"></div>
        <div className="absolute bottom-40 left-10 w-20 h-20 bg-purple-300/10 rounded-full animate-float animation-delay-400"></div>
      </div>

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex items-center mb-8 opacity-0 animate-fade-in">
          <button
            onClick={onBack}
            className="mr-4 p-3 glass-rpg rounded-xl shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
          >
            <ArrowLeft className="w-6 h-6 text-amber-700" />
          </button>
          <div>
            <h1 className="text-4xl font-bold title-rpg">Quest Configuration</h1>
            <p className="subtitle-rpg text-lg">Prepare for your mathematical adventure</p>
          </div>
        </div>

        {/* Mode Selection */}
        <div className="rpg-card p-6 mb-6 opacity-0 animate-fade-in-up animation-delay-100">
          <h2 className="text-xl font-bold title-rpg mb-4 flex items-center">
            <Sword className="w-6 h-6 mr-2 text-amber-600" />
            Choose Your Path
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => setGameMode('practice')}
              className={`
                p-6 rounded-xl border-3 transition-all duration-300 text-left transform hover:scale-105
                ${gameMode === 'practice'
                  ? 'border-blue-400 bg-gradient-to-br from-blue-50 to-indigo-100 shadow-magical'
                  : 'border-amber-300 bg-gradient-to-br from-amber-50 to-yellow-100 hover:border-amber-400'
                }
              `}
            >
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Target className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-bold text-gray-800">Training Grounds</h3>
              </div>
              <p className="text-sm text-gray-600">
                Master all questions systematically. Perfect for building strong foundations.
              </p>
            </button>

            <button
              onClick={() => setGameMode('endless')}
              className={`
                p-6 rounded-xl border-3 transition-all duration-300 text-left transform hover:scale-105
                ${gameMode === 'endless'
                  ? 'border-purple-400 bg-gradient-to-br from-purple-50 to-violet-100 shadow-magical'
                  : 'border-amber-300 bg-gradient-to-br from-amber-50 to-yellow-100 hover:border-amber-400'
                }
              `}
            >
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Zap className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-bold text-gray-800">Arena Challenge</h3>
              </div>
              <p className="text-sm text-gray-600">
                Face random challenges until 20 victories. Great for quick battles!
              </p>
            </button>
          </div>
        </div>

        {/* Skip Button Toggle */}
        <div className="rpg-card p-6 mb-6 opacity-0 animate-fade-in-up animation-delay-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="w-6 h-6 text-amber-600" />
              <div>
                <h2 className="text-lg font-bold title-rpg">Mercy Rule</h2>
                <p className="text-sm subtitle-rpg">
                  Allow retreat after 3 failed attempts
                </p>
              </div>
            </div>
            <button
              onClick={() => setSkipEnabled(!skipEnabled)}
              className={`
                relative inline-flex h-8 w-14 items-center rounded-full transition-colors duration-300 shadow-md
                ${skipEnabled ? 'bg-gradient-to-r from-emerald-500 to-green-500' : 'bg-gradient-to-r from-gray-400 to-gray-500'}
              `}
            >
              <span
                className={`
                  inline-block h-6 w-6 transform rounded-full bg-white shadow-lg transition-transform duration-300
                  ${skipEnabled ? 'translate-x-8' : 'translate-x-1'}
                `}
              />
            </button>
          </div>
          {skipEnabled && (
            <div className="mt-4 flex items-center space-x-2 text-sm text-emerald-600 opacity-0 animate-fade-in animation-delay-300">
              <SkipForward className="w-4 h-4" />
              <span>Retreat option available after 3 wrong attempts</span>
            </div>
          )}
        </div>

        {/* Quick Select Buttons */}
        <div className="rpg-card p-6 mb-6 opacity-0 animate-fade-in-up animation-delay-300">
          <h2 className="text-lg font-bold title-rpg mb-4">Quick Selection</h2>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={selectAll}
              className="emerald-button px-4 py-2 font-semibold text-white transition-all duration-200 transform hover:scale-105 shadow-md flex items-center space-x-2"
            >
              <CheckSquare className="w-4 h-4" />
              <span>All Tables</span>
            </button>
            <button
              onClick={selectRandom}
              className="magical-button px-4 py-2 font-semibold text-white transition-all duration-200 transform hover:scale-105 shadow-md flex items-center space-x-2"
            >
              <Shuffle className="w-4 h-4" />
              <span>Random Quest</span>
            </button>
            <button
              onClick={clearSelection}
              className="special-button px-4 py-2 font-semibold text-white transition-all duration-200 transform hover:scale-105 shadow-md"
            >
              Clear All
            </button>
          </div>
        </div>

        {/* Table Selection */}
        <div className="rpg-card p-6 mb-6 opacity-0 animate-fade-in-up animation-delay-400">
          <h2 className="text-lg font-bold title-rpg mb-4">
            Choose Your Challenges ({selectedTables.length} selected)
          </h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {availableTables.map((table, index) => (
              <button
                key={table}
                onClick={() => toggleTable(table)}
                className={`
                  aspect-square rounded-xl font-bold text-xl transition-all duration-300 transform hover:scale-110 shadow-md opacity-0 animate-fade-in
                  ${selectedTables.includes(table)
                    ? `bg-gradient-to-br ${theme.colors.accent} text-white shadow-magical border-2 border-yellow-400`
                    : 'number-pad-button'
                  }
                `}
                style={{ animationDelay: `${500 + index * 50}ms` }}
              >
                {table}
              </button>
            ))}
          </div>
        </div>

        {/* Start Button */}
        <div className="text-center opacity-0 animate-fade-in-scale animation-delay-700">
          <button
            onClick={handleStart}
            disabled={selectedTables.length === 0}
            className={`
              inline-flex items-center space-x-3 px-10 py-5 rounded-2xl font-bold text-xl shadow-rpg transform transition-all duration-300
              ${selectedTables.length > 0
                ? 'rpg-button hover:scale-105 hover:shadow-rpg-hover'
                : 'bg-gray-400 text-gray-600 cursor-not-allowed border-2 border-gray-500'
              }
            `}
          >
            <Play className="w-7 h-7" />
            <span>
              Begin {gameMode === 'practice' ? 'Training' : 'Arena'} Quest
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameSetup;