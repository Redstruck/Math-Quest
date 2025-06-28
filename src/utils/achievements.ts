import { badges } from '../data/shopItems';
import { getUserProgress, getOwnedBadges, saveOwnedBadges } from './localStorage';

export const checkForNewBadges = (sessionAccuracy?: number): string[] => {
  const progress = getUserProgress();
  const ownedBadges = getOwnedBadges();
  const newBadges: string[] = [];

  badges.forEach(badge => {
    if (badge.requirement && !ownedBadges.includes(badge.id)) {
      let shouldUnlock = false;

      switch (badge.requirement.type) {
        case 'correctAnswers':
          shouldUnlock = progress.totalCorrectAnswers >= badge.requirement.value;
          break;
        case 'sessions':
          shouldUnlock = progress.totalSessions >= badge.requirement.value;
          break;
        case 'accuracy':
          if (sessionAccuracy !== undefined) {
            shouldUnlock = sessionAccuracy >= badge.requirement.value;
          } else {
            shouldUnlock = progress.bestAccuracy >= badge.requirement.value;
          }
          break;
      }

      if (shouldUnlock) {
        newBadges.push(badge.id);
      }
    }
  });

  if (newBadges.length > 0) {
    const updatedOwnedBadges = [...ownedBadges, ...newBadges];
    saveOwnedBadges(updatedOwnedBadges);
  }

  return newBadges;
};

export const getBadgeById = (id: string) => {
  return badges.find(badge => badge.id === id);
};