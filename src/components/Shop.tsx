import React, { useState } from 'react';
import { ArrowLeft, Star, ShoppingBag, Check, Lock } from 'lucide-react';
import { themes, badges, pets } from '../data/shopItems';
import { 
  getPoints, 
  spendPoints, 
  getOwnedThemes, 
  saveOwnedThemes, 
  getOwnedBadges, 
  saveOwnedBadges,
  getOwnedPets,
  saveOwnedPets,
  getCurrentTheme,
  saveCurrentTheme,
  getActivePet,
  saveActivePet
} from '../utils/localStorage';
import { getCurrentThemeData } from '../utils/themes';

interface ShopProps {
  onBack: () => void;
}

const Shop: React.FC<ShopProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'themes' | 'badges' | 'pets'>('themes');
  const [purchaseAnimation, setPurchaseAnimation] = useState<string | null>(null);
  
  const points = getPoints();
  const ownedThemes = getOwnedThemes();
  const ownedBadges = getOwnedBadges();
  const ownedPets = getOwnedPets();
  const currentTheme = getCurrentTheme();
  const activePet = getActivePet();
  const theme = getCurrentThemeData();

  const handlePurchaseTheme = (themeId: string, price: number) => {
    if (spendPoints(price)) {
      const newOwnedThemes = [...ownedThemes, themeId];
      saveOwnedThemes(newOwnedThemes);
      setPurchaseAnimation(themeId);
      setTimeout(() => setPurchaseAnimation(null), 1000);
    }
  };

  const handlePurchaseBadge = (badgeId: string, price: number) => {
    if (spendPoints(price)) {
      const newOwnedBadges = [...ownedBadges, badgeId];
      saveOwnedBadges(newOwnedBadges);
      setPurchaseAnimation(badgeId);
      setTimeout(() => setPurchaseAnimation(null), 1000);
    }
  };

  const handlePurchasePet = (petId: string, price: number) => {
    if (spendPoints(price)) {
      const newOwnedPets = [...ownedPets, petId];
      saveOwnedPets(newOwnedPets);
      setPurchaseAnimation(petId);
      setTimeout(() => setPurchaseAnimation(null), 1000);
    }
  };

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

  const renderThemes = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {themes.map(themeItem => {
        const isOwned = ownedThemes.includes(themeItem.id);
        const isActive = currentTheme === themeItem.id;
        const canAfford = points >= themeItem.price;
        const isPurchasing = purchaseAnimation === themeItem.id;

        return (
          <div
            key={themeItem.id}
            className={`
              bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg transition-all duration-300 transform hover:scale-105
              ${isPurchasing ? 'animate-pulse bg-green-100' : ''}
              ${isActive ? 'ring-4 ring-blue-400' : ''}
            `}
          >
            <div className="text-center mb-4">
              <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${themeItem.colors.primary} flex items-center justify-center text-2xl mb-3`}>
                {themeItem.preview}
              </div>
              <h3 className="font-bold text-gray-800">{themeItem.name}</h3>
              {themeItem.price > 0 && (
                <div className="flex items-center justify-center mt-2">
                  <Star className="w-4 h-4 text-yellow-500 mr-1" />
                  <span className="text-sm text-gray-600">{themeItem.price} points</span>
                </div>
              )}
            </div>

            {isOwned ? (
              <button
                onClick={() => handleSelectTheme(themeItem.id)}
                className={`
                  w-full py-3 rounded-xl font-semibold transition-all duration-200
                  ${isActive 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                  }
                `}
              >
                {isActive ? (
                  <div className="flex items-center justify-center">
                    <Check className="w-4 h-4 mr-2" />
                    Active
                  </div>
                ) : (
                  'Select'
                )}
              </button>
            ) : (
              <button
                onClick={() => handlePurchaseTheme(themeItem.id, themeItem.price)}
                disabled={!canAfford || isPurchasing}
                className={`
                  w-full py-3 rounded-xl font-semibold transition-all duration-200
                  ${canAfford && !isPurchasing
                    ? `bg-gradient-to-r ${theme.colors.accent} hover:opacity-90 text-white`
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }
                `}
              >
                {isPurchasing ? 'Purchased!' : themeItem.price === 0 ? 'Free' : 'Purchase'}
              </button>
            )}
          </div>
        );
      })}
    </div>
  );

  const renderBadges = () => (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {badges.map(badge => {
        const isOwned = ownedBadges.includes(badge.id);
        const canAfford = badge.price ? points >= badge.price : true;
        const isPurchasing = purchaseAnimation === badge.id;
        const isAchievement = !!badge.requirement;

        return (
          <div
            key={badge.id}
            className={`
              bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg transition-all duration-300 transform hover:scale-105
              ${isPurchasing ? 'animate-pulse bg-green-100' : ''}
              ${isOwned ? 'ring-2 ring-green-400' : ''}
            `}
          >
            <div className="text-center">
              <div className={`
                w-12 h-12 mx-auto rounded-xl bg-gradient-to-r ${badge.color} flex items-center justify-center text-2xl mb-2
                ${!isOwned && isAchievement ? 'grayscale opacity-50' : ''}
              `}>
                {isOwned || !isAchievement ? badge.icon : <Lock className="w-6 h-6 text-gray-400" />}
              </div>
              <h3 className="font-bold text-sm text-gray-800 mb-1">{badge.name}</h3>
              <p className="text-xs text-gray-600 mb-3">{badge.description}</p>

              {isAchievement ? (
                <div className="text-xs text-blue-600 font-medium">
                  {isOwned ? 'Unlocked!' : 'Achievement'}
                </div>
              ) : (
                <>
                  {badge.price && (
                    <div className="flex items-center justify-center mb-2">
                      <Star className="w-3 h-3 text-yellow-500 mr-1" />
                      <span className="text-xs text-gray-600">{badge.price}</span>
                    </div>
                  )}
                  {!isOwned && (
                    <button
                      onClick={() => badge.price && handlePurchaseBadge(badge.id, badge.price)}
                      disabled={!canAfford || isPurchasing}
                      className={`
                        w-full py-2 rounded-lg text-xs font-semibold transition-all duration-200
                        ${canAfford && !isPurchasing
                          ? `bg-gradient-to-r ${theme.colors.accent} hover:opacity-90 text-white`
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }
                      `}
                    >
                      {isPurchasing ? 'Purchased!' : 'Purchase'}
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderPets = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {pets.map(pet => {
        const isOwned = ownedPets.includes(pet.id);
        const isActive = activePet === pet.id;
        const canAfford = points >= pet.price;
        const isPurchasing = purchaseAnimation === pet.id;

        return (
          <div
            key={pet.id}
            className={`
              bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg transition-all duration-300 transform hover:scale-105
              ${isPurchasing ? 'animate-pulse bg-green-100' : ''}
              ${isActive ? 'ring-4 ring-green-400' : ''}
            `}
          >
            <div className="text-center mb-4">
              <div className="text-6xl mb-3">{pet.emoji}</div>
              <h3 className="font-bold text-gray-800">{pet.name}</h3>
              <p className="text-sm text-gray-600 mb-3">{pet.description}</p>
              <div className="flex items-center justify-center">
                <Star className="w-4 h-4 text-yellow-500 mr-1" />
                <span className="text-sm text-gray-600">{pet.price} points</span>
              </div>
            </div>

            {isOwned ? (
              <button
                onClick={() => handleSelectPet(pet.id)}
                className={`
                  w-full py-3 rounded-xl font-semibold transition-all duration-200
                  ${isActive 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                  }
                `}
              >
                {isActive ? (
                  <div className="flex items-center justify-center">
                    <Check className="w-4 h-4 mr-2" />
                    Active
                  </div>
                ) : (
                  'Select'
                )}
              </button>
            ) : (
              <button
                onClick={() => handlePurchasePet(pet.id, pet.price)}
                disabled={!canAfford || isPurchasing}
                className={`
                  w-full py-3 rounded-xl font-semibold transition-all duration-200
                  ${canAfford && !isPurchasing
                    ? `bg-gradient-to-r ${theme.colors.accent} hover:opacity-90 text-white`
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }
                `}
              >
                {isPurchasing ? 'Purchased!' : 'Purchase'}
              </button>
            )}
          </div>
        );
      })}
    </div>
  );

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
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Shop</h1>
            <div className="flex items-center justify-center bg-white/70 backdrop-blur-sm rounded-full px-4 py-2 shadow-md">
              <Star className="w-5 h-5 text-yellow-500 mr-2" />
              <span className="font-semibold text-gray-700">{points} points</span>
            </div>
          </div>
          <div className="w-12" />
        </div>

        {/* Tabs */}
        <div className="flex bg-white/70 backdrop-blur-sm rounded-2xl p-2 shadow-lg mb-6">
          {[
            { id: 'themes', label: 'Themes', icon: '🎨' },
            { id: 'badges', label: 'Badges', icon: '🏆' },
            { id: 'pets', label: 'Pets', icon: '🐾' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`
                flex-1 flex items-center justify-center space-x-2 py-3 rounded-xl font-semibold transition-all duration-200
                ${activeTab === tab.id
                  ? `bg-gradient-to-r ${theme.colors.accent} text-white shadow-md`
                  : 'text-gray-600 hover:bg-white/50'
                }
              `}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
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

export default Shop;