import React, { useEffect, useState } from 'react';
import { X, Trophy } from 'lucide-react';
import { getBadgeById } from '../utils/achievements';

interface BadgeNotificationProps {
  badgeId: string;
  onClose: () => void;
  onViewCollection: () => void;
}

const BadgeNotification: React.FC<BadgeNotificationProps> = ({ badgeId, onClose, onViewCollection }) => {
  const [isVisible, setIsVisible] = useState(false);
  const badge = getBadgeById(badgeId);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!badge) return null;

  return (
    <div className={`
      fixed top-4 right-4 z-50 bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border-2 border-yellow-300
      transform transition-all duration-300 max-w-sm
      ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
    `}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${badge.color} flex items-center justify-center text-2xl`}>
            {badge.icon}
          </div>
          <div>
            <h3 className="font-bold text-gray-800">Badge Unlocked!</h3>
            <p className="text-sm text-gray-600">{badge.name}</p>
          </div>
        </div>
        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(onClose, 300);
          }}
          className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X className="w-4 h-4 text-gray-500" />
        </button>
      </div>
      
      <p className="text-sm text-gray-600 mb-4">{badge.description}</p>
      
      <button
        onClick={onViewCollection}
        className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-semibold py-2 px-4 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2"
      >
        <Trophy className="w-4 h-4" />
        <span>View Collection</span>
      </button>
    </div>
  );
};

export default BadgeNotification;