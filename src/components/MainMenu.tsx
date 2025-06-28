import React, { useEffect } from 'react';
import { Play, ShoppingBag, Star, Sword, Shield } from 'lucide-react';
import { getPoints, getActivePet } from '../utils/localStorage';
import { getCurrentThemeData, applyThemeToDocument } from '../utils/themes';
import { pets } from '../data/shopItems';

interface MainMenuProps {
  onStartPractice: () => void;
  onOpenShop: () => void;
  onOpenCollection: () => void;
}

const MainMenu: React.FC<MainMenuProps> = ({ onStartPractice, onOpenShop, onOpenCollection }) => {
  const points = getPoints();
  const theme = getCurrentThemeData();
  const activePetId = getActivePet();
  const activePet = activePetId ? pets.find(p => p.id === activePetId) : null;

  useEffect(() => {
    applyThemeToDocument(theme.id);
  }, [theme.id]);

  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.colors.background} flex items-center justify-center p-4 relative overflow-hidden`}>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-300/20 rounded-full animate-float animation-delay-200"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-purple-300/20 rounded-full animate-float animation-delay-400"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-blue-300/20 rounded-full animate-float animation-delay-600"></div>
        <div className="absolute bottom-32 right-1/3 w-12 h-12 bg-green-300/20 rounded-full animate-float"></div>
      </div>

      <div className="max-w-md w-full relative z-10">
        {/* Header */}
        <div className="text-center mb-12 animate-scale-in">
          <div className="relative mb-8">
            <div className={`inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br ${theme.colors.accent} rounded-3xl shadow-rpg animate-pulse-magical`}>
              <Sword className="w-12 h-12 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-golden animate-bounce-gentle">
              <Shield className="w-4 h-4 text-white" />
            </div>
          </div>
          
          <h1 className="text-5xl font-bold title-rpg mb-3 animate-slide-in">
            Math Quest
          </h1>
          <p className="subtitle-rpg text-lg mb-6 animate-slide-in animation-delay-200">
            Master the Ancient Art of Numbers
          </p>
          
          {/* Points Display */}
          <div className="inline-flex items-center rpg-card px-6 py-3 shadow-golden animate-slide-in animation-delay-400">
            <Star className="w-6 h-6 text-yellow-500 mr-3 animate-bounce-gentle" />
            <span className="font-bold text-amber-900 text-lg">{points}</span>
            <span className="text-amber-700 ml-2">Gold Coins</span>
          </div>

          {/* Active Pet */}
          {activePet && (
            <div className="mt-6 animate-slide-in animation-delay-600">
              <div className="text-5xl animate-bounce-gentle mb-2">{activePet.emoji}</div>
              <p className="subtitle-rpg text-sm">
                {activePet.name} stands ready to assist!
              </p>
            </div>
          )}
        </div>

        {/* Menu Buttons */}
        <div className="space-y-4">
          <button
            onClick={onStartPractice}
            className="w-full rpg-button py-5 px-6 text-lg flex items-center justify-center space-x-3 animate-slide-in animation-delay-200"
          >
            <Play className="w-6 h-6" />
            <span className="font-bold">Begin Your Quest</span>
          </button>

          <button
            onClick={onOpenShop}
            className="w-full magical-button py-5 px-6 text-lg flex items-center justify-center space-x-3 animate-slide-in animation-delay-400"
          >
            <ShoppingBag className="w-6 h-6" />
            <span className="font-bold">Mystical Bazaar</span>
          </button>

          <button
            onClick={onOpenCollection}
            className="w-full emerald-button border-2 rounded-xl py-5 px-6 text-lg font-semibold text-white transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-3 animate-slide-in animation-delay-600"
          >
            <Star className="w-6 h-6" />
            <span className="font-bold">Trophy Hall</span>
          </button>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 animate-slide-in animation-delay-800">
          <p className="subtitle-rpg text-amber-600">
            "Knowledge is the greatest treasure" ⚔️
          </p>
        </div>
      </div>
    </div>
  );
};

export default MainMenu;