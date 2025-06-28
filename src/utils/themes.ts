import { themes } from '../data/shopItems';
import { getCurrentTheme } from './localStorage';

export const getThemeById = (id: string) => {
  return themes.find(theme => theme.id === id) || themes[0];
};

export const getCurrentThemeData = () => {
  const currentThemeId = getCurrentTheme();
  return getThemeById(currentThemeId);
};

export const applyThemeToDocument = (themeId: string) => {
  const theme = getThemeById(themeId);
  if (theme) {
    document.documentElement.style.setProperty('--theme-primary', theme.colors.primary);
    document.documentElement.style.setProperty('--theme-secondary', theme.colors.secondary);
    document.documentElement.style.setProperty('--theme-accent', theme.colors.accent);
    document.documentElement.style.setProperty('--theme-background', theme.colors.background);
  }
};