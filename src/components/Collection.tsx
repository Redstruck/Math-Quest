import React, { useState } from 'react';
import { ArrowLeft, Star, Trophy, Heart } from 'lucide-react';
import { themes, badges, pets } from '../data/shopItems';
import { 
  getOwnedThemes, 
  getOwnedBadges, 
  getOwnedPets,
  getCurrentTheme,
  saveCurrentTheme,
  getActivePet,
  saveActivePet
} from '../utils/localStorage';
import { getCurrentThemeData } from '../utils/themes';

interface CollectionProps {
  onBack: () => void;
}

const Collection: React.FC<CollectionProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'themes' | 'badges' | 'pets'>('themes');
  
  const ownedThemes = getOwnedThemes();
  const ownedBadges = getOwnedBadges();
  const ownedPets = getOwnedPets();
  const currentTheme = getCurrentTheme();
  const activePet = getActivePet();
  const theme = getCurrentThemeData();

  const handleSelectTheme = (themeId: string) => {
    saveCurrentTheme(themeId);
    window.location.reload(); // Reload to apply theme
  };

  const handleSelectPet = (petId: string) => {
    if (activePet === petId) {
      saveActivePet(''); // Deselect if already active
    } else {
      saveActivePet(petId);
    }
  };

  const renderThemes = () => {
    const ownedThemeItems = themes.filter(t => ownedThemes.includes(t.id));
    
    if (ownedThemeItems.length === 0) {
      return (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🎨</div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">No Themes Yet</h3>
          <p className="text-gray-600">Visit the shop to purchase beautiful themes!</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {ownedThemeItems.map(themeItem => {
          const isActive = currentTheme === themeItem.id;

          return (
            <div
              key={themeItem.id}
              className={`
                bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg transition-all duration-300 transform hover:scale-105
                ${isActive ? 'ring-4 ring-blue-400' : ''}
              `}
            >
              <div className="text-center mb-4">
                <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${themeItem.colors.primary} flex items-center justify-center text-2xl mb-3`}>
                  {themeItem.preview}
                </div>
                <h3 className="font-bold text-gray-800">{themeItem.name}</h3>
              </div>

              <button
                onClick={() => handleSelectTheme(themeItem.id)}
                className={`
                  w-full py-3 rounded-xl font-semibold transition-all duration-200
                  ${isActive 
                    ? 'bg-blue-500 text-white' 
                    : `bg-gradient-to-r ${theme.colors.accent} hover:opacity-90 text-white`
                  }
                `}
              >
                {isActive ? 'Active' : 'Select'}
              </button>
            </div>
          );
        })}
      </div>
    );
  };

  const renderBadges = () => {
    const ownedBadgeItems = badges.filter(b => ownedBadges.includes(b.id));
    
    if (ownedBadgeItems.length === 0) {
      return (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🏆</div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">No Badges Yet</h3>
          <p className="text-gray-600">Complete achievements or visit the shop to earn badges!</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {ownedBadgeItems.map(badge => (
          <div
            key={badge.id}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            <div className="text-center">
              <div className={`w-12 h-12 mx-auto rounded-xl bg-gradient-to-r ${badge.color} flex items-center justify-center text-2xl mb-2`}>
                {badge.icon}
              </div>
              <h3 className="font-bold text-sm text-gray-800 mb-1">{badge.name}</h3>
              <p className="text-xs text-gray-600">{badge.description}</p>
              {badge.requirement && (
                <div className="mt-2 text-xs text-green-600 font-medium">
                  Achievement Unlocked!
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderPets = () => {
    const ownedPetItems = pets.filter(p => ownedPets.includes(p.id));
    
    if (ownedPetItems.length === 0) {
      return (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🐾</div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">No Pets Yet</h3>
          <p className="text-gray-600">Visit the shop to adopt adorable companions!</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {ownedPetItems.map(pet => {
          const isActive = activePet === pet.id;

          return (
            <div
              key={pet.id}
              className={`
                bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg transition-all duration-300 transform hover:scale-105
                ${isActive ? 'ring-4 ring-green-400' : ''}
              `}
            >
              <div className="text-center mb-4">
                <div className="text-6xl mb-3">{pet.emoji}</div>
                <h3 className="font-bold text-gray-800">{pet.name}</h3>
                <p className="text-sm text-gray-600">{pet.description}</p>
              </div>

              <button
                onClick={() => handleSelectPet(pet.id)}
                className={`
                  w-full py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center
                  ${isActive 
                    ? 'bg-green-500 text-white' 
                    : `bg-gradient-to-r ${theme.colors.accent} hover:opacity-90 text-white`
                  }
                `}
              >
                {isActive ? (
                  <>
                    <Heart className="w-4 h-4 mr-2" />
                    Active Companion
                  </>
                ) : (
                  'Select as Companion'
                )}
              </button>
            </div>
          );
        })}
      </div>
    );
  };

  const getTabStats = () => {
    return {
      themes: ownedThemes.length,
      badges: ownedBadges.length,
      pets: ownedPets.length
    };
  };

  const stats = getTabStats();

  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.colors.background} p-4`}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="p-3 bg-white/70 backdrop-blur-sm rounded-xl shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">My Collection</h1>
            <p className="text-gray-600">Your unlocked themes, badges, and pets</p>
          </div>
          <div className="w-12" />
        </div>

        {/* Tabs */}
        <div className="flex bg-white/70 backdrop-blur-sm rounded-2xl p-2 shadow-lg mb-6">
          {[
            { id: 'themes', label: 'Themes', icon: '🎨', count: stats.themes },
            { id: 'badges', label: 'Badges', icon: '🏆', count: stats.badges },
            { id: 'pets', label: 'Pets', icon: '🐾', count: stats.pets }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`
                flex-1 flex flex-col items-center justify-center py-3 rounded-xl font-semibold transition-all duration-200
                ${activeTab === tab.id
                  ? `bg-gradient-to-r ${theme.colors.accent} text-white shadow-md`
                  : 'text-gray-600 hover:bg-white/50'
                }
              `}
            >
              <div className="flex items-center space-x-2">
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </div>
              <span className="text-xs mt-1 opacity-75">{tab.count} owned</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="mb-8">
          {activeTab === 'themes' && renderThemes()}
          {activeTab === 'badges' && renderBadges()}
          {activeTab === 'pets' && renderPets()}
        </div>
      </div>
    </div>
  );
};

export default Collection;