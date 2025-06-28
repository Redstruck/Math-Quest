const POINTS_KEY = 'math_practice_points';
const TOTAL_CORRECT_KEY = 'math_practice_total_correct';
const TOTAL_SESSIONS_KEY = 'math_practice_total_sessions';
const BEST_ACCURACY_KEY = 'math_practice_best_accuracy';
const CURRENT_THEME_KEY = 'math_practice_current_theme';
const OWNED_THEMES_KEY = 'math_practice_owned_themes';
const OWNED_BADGES_KEY = 'math_practice_owned_badges';
const OWNED_PETS_KEY = 'math_practice_owned_pets';
const ACTIVE_PET_KEY = 'math_practice_active_pet';

export const getPoints = (): number => {
  const points = localStorage.getItem(POINTS_KEY);
  return points ? parseInt(points, 10) : 0;
};

export const savePoints = (points: number): void => {
  localStorage.setItem(POINTS_KEY, points.toString());
};

export const addPoints = (pointsToAdd: number): number => {
  const currentPoints = getPoints();
  const newPoints = currentPoints + pointsToAdd;
  savePoints(newPoints);
  return newPoints;
};

export const spendPoints = (pointsToSpend: number): boolean => {
  const currentPoints = getPoints();
  if (currentPoints >= pointsToSpend) {
    savePoints(currentPoints - pointsToSpend);
    return true;
  }
  return false;
};

export const getTotalCorrectAnswers = (): number => {
  const total = localStorage.getItem(TOTAL_CORRECT_KEY);
  return total ? parseInt(total, 10) : 0;
};

export const saveTotalCorrectAnswers = (total: number): void => {
  localStorage.setItem(TOTAL_CORRECT_KEY, total.toString());
};

export const getTotalSessions = (): number => {
  const total = localStorage.getItem(TOTAL_SESSIONS_KEY);
  return total ? parseInt(total, 10) : 0;
};

export const saveTotalSessions = (total: number): void => {
  localStorage.setItem(TOTAL_SESSIONS_KEY, total.toString());
};

export const getBestAccuracy = (): number => {
  const accuracy = localStorage.getItem(BEST_ACCURACY_KEY);
  return accuracy ? parseInt(accuracy, 10) : 0;
};

export const saveBestAccuracy = (accuracy: number): void => {
  const current = getBestAccuracy();
  if (accuracy > current) {
    localStorage.setItem(BEST_ACCURACY_KEY, accuracy.toString());
  }
};

export const getCurrentTheme = (): string => {
  return localStorage.getItem(CURRENT_THEME_KEY) || 'pastel';
};

export const saveCurrentTheme = (themeId: string): void => {
  localStorage.setItem(CURRENT_THEME_KEY, themeId);
};

export const getOwnedThemes = (): string[] => {
  const themes = localStorage.getItem(OWNED_THEMES_KEY);
  return themes ? JSON.parse(themes) : ['pastel'];
};

export const saveOwnedThemes = (themes: string[]): void => {
  localStorage.setItem(OWNED_THEMES_KEY, JSON.stringify(themes));
};

export const getOwnedBadges = (): string[] => {
  const badges = localStorage.getItem(OWNED_BADGES_KEY);
  return badges ? JSON.parse(badges) : [];
};

export const saveOwnedBadges = (badges: string[]): void => {
  localStorage.setItem(OWNED_BADGES_KEY, JSON.stringify(badges));
};

export const getOwnedPets = (): string[] => {
  const pets = localStorage.getItem(OWNED_PETS_KEY);
  return pets ? JSON.parse(pets) : [];
};

export const saveOwnedPets = (pets: string[]): void => {
  localStorage.setItem(OWNED_PETS_KEY, JSON.stringify(pets));
};

export const getActivePet = (): string | null => {
  return localStorage.getItem(ACTIVE_PET_KEY);
};

export const saveActivePet = (petId: string): void => {
  localStorage.setItem(ACTIVE_PET_KEY, petId);
};

export const getUserProgress = () => ({
  totalCorrectAnswers: getTotalCorrectAnswers(),
  totalSessions: getTotalSessions(),
  bestAccuracy: getBestAccuracy()
});