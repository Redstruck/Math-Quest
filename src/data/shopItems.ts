import { Theme, Badge, Pet } from '../types';

export const themes: Theme[] = [
  {
    id: 'pastel',
    name: 'Mystic Meadows',
    price: 0,
    colors: {
      primary: 'from-emerald-100 via-teal-50 to-cyan-100',
      secondary: 'from-cyan-100 via-blue-50 to-indigo-100',
      accent: 'from-emerald-500 to-teal-600',
      background: 'from-emerald-100 via-teal-50 to-cyan-100'
    },
    preview: 'M'
  },
  {
    id: 'ocean',
    name: 'Sapphire Depths',
    price: 50,
    colors: {
      primary: 'from-blue-200 via-cyan-100 to-teal-100',
      secondary: 'from-teal-100 via-blue-100 to-cyan-100',
      accent: 'from-blue-500 to-teal-600',
      background: 'from-blue-200 via-cyan-100 to-teal-100'
    },
    preview: 'S'
  },
  {
    id: 'sunset',
    name: 'Dragon\'s Flame',
    price: 75,
    colors: {
      primary: 'from-orange-200 via-red-100 to-pink-100',
      secondary: 'from-red-100 via-orange-100 to-yellow-100',
      accent: 'from-orange-500 to-red-600',
      background: 'from-orange-200 via-red-100 to-pink-100'
    },
    preview: 'D'
  },
  {
    id: 'forest',
    name: 'Elven Sanctuary',
    price: 60,
    colors: {
      primary: 'from-green-200 via-emerald-100 to-lime-100',
      secondary: 'from-lime-100 via-green-100 to-emerald-100',
      accent: 'from-green-500 to-emerald-600',
      background: 'from-green-200 via-emerald-100 to-lime-100'
    },
    preview: 'E'
  },
  {
    id: 'galaxy',
    name: 'Void Realm',
    price: 100,
    colors: {
      primary: 'from-purple-900 via-indigo-900 to-blue-900',
      secondary: 'from-indigo-900 via-purple-800 to-pink-900',
      accent: 'from-purple-400 to-pink-500',
      background: 'from-purple-900 via-indigo-900 to-blue-900'
    },
    preview: 'V'
  },
  {
    id: 'rainbow',
    name: 'Prismatic Realm',
    price: 150,
    colors: {
      primary: 'from-red-200 via-yellow-200 via-green-200 via-blue-200 to-purple-200',
      secondary: 'from-purple-200 via-pink-200 via-red-200 via-orange-200 to-yellow-200',
      accent: 'from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500',
      background: 'from-red-200 via-yellow-200 via-green-200 via-blue-200 to-purple-200'
    },
    preview: 'P'
  },
  {
    id: 'golden',
    name: 'Golden Kingdom',
    price: 200,
    colors: {
      primary: 'from-yellow-100 via-amber-100 to-orange-100',
      secondary: 'from-orange-100 via-yellow-100 to-amber-100',
      accent: 'from-yellow-500 to-amber-600',
      background: 'from-yellow-100 via-amber-100 to-orange-100'
    },
    preview: 'G'
  },
  {
    id: 'shadow',
    name: 'Shadow Realm',
    price: 180,
    colors: {
      primary: 'from-gray-800 via-slate-700 to-zinc-800',
      secondary: 'from-zinc-800 via-gray-700 to-slate-800',
      accent: 'from-red-600 to-orange-600',
      background: 'from-gray-800 via-slate-700 to-zinc-800'
    },
    preview: 'S'
  }
];

export const badges: Badge[] = [
  {
    id: 'first-steps',
    name: 'Apprentice Scholar',
    description: 'Answer your first question correctly',
    requirement: { type: 'correctAnswers', value: 1 },
    icon: '📜',
    color: 'from-green-400 to-emerald-500',
    unlocked: false
  },
  {
    id: 'novice',
    name: 'Novice Arithmancer',
    description: 'Answer 10 questions correctly',
    requirement: { type: 'correctAnswers', value: 10 },
    icon: '🧙‍♂️',
    color: 'from-blue-400 to-indigo-500',
    unlocked: false
  },
  {
    id: 'apprentice',
    name: 'Guild Apprentice',
    description: 'Answer 50 questions correctly',
    requirement: { type: 'correctAnswers', value: 50 },
    icon: '⚔️',
    color: 'from-purple-400 to-violet-500',
    unlocked: false
  },
  {
    id: 'scholar',
    name: 'Master Scholar',
    description: 'Answer 100 questions correctly',
    requirement: { type: 'correctAnswers', value: 100 },
    icon: '🎓',
    color: 'from-yellow-400 to-amber-500',
    unlocked: false
  },
  {
    id: 'master',
    name: 'Grandmaster',
    description: 'Answer 500 questions correctly',
    requirement: { type: 'correctAnswers', value: 500 },
    icon: '👑',
    color: 'from-yellow-500 to-orange-500',
    unlocked: false
  },
  {
    id: 'perfectionist',
    name: 'Flawless Victory',
    description: 'Achieve 100% accuracy in a session',
    requirement: { type: 'accuracy', value: 100 },
    icon: '💎',
    color: 'from-cyan-400 to-blue-500',
    unlocked: false
  },
  {
    id: 'dedicated',
    name: 'Devoted Practitioner',
    description: 'Complete 10 practice sessions',
    requirement: { type: 'sessions', value: 10 },
    icon: '🔥',
    color: 'from-red-400 to-rose-500',
    unlocked: false
  },
  {
    id: 'champion',
    name: 'Arena Champion',
    description: 'Achieve 95% accuracy with 50+ questions',
    requirement: { type: 'accuracy', value: 95 },
    icon: '🏆',
    color: 'from-yellow-400 to-yellow-600',
    unlocked: false
  },
  {
    id: 'speed-demon',
    name: 'Lightning Reflexes',
    price: 25,
    description: 'For the swift of mind',
    icon: '⚡',
    color: 'from-yellow-300 to-orange-400',
    unlocked: false
  },
  {
    id: 'night-owl',
    name: 'Midnight Scholar',
    price: 30,
    description: 'For nocturnal learners',
    icon: '🦉',
    color: 'from-indigo-400 to-purple-500',
    unlocked: false
  },
  {
    id: 'star-student',
    name: 'Celestial Prodigy',
    price: 40,
    description: 'Shine among the stars',
    icon: '⭐',
    color: 'from-yellow-400 to-yellow-500',
    unlocked: false
  },
  {
    id: 'dragon-slayer',
    name: 'Dragon Slayer',
    price: 100,
    description: 'Conqueror of the most fearsome challenges',
    icon: '🐉',
    color: 'from-red-500 to-orange-600',
    unlocked: false
  },
  {
    id: 'arcane-master',
    name: 'Arcane Master',
    price: 80,
    description: 'Master of mystical mathematics',
    icon: '🔮',
    color: 'from-purple-500 to-indigo-600',
    unlocked: false
  }
];

export const pets: Pet[] = [
  {
    id: 'cat',
    name: 'Whiskers the Wise',
    price: 80,
    emoji: '🐱',
    description: 'A mystical feline companion with ancient knowledge'
  },
  {
    id: 'dog',
    name: 'Loyal Guardian',
    price: 85,
    emoji: '🐶',
    description: 'A faithful hound that never leaves your side'
  },
  {
    id: 'rabbit',
    name: 'Swift Hopscotch',
    price: 70,
    emoji: '🐰',
    description: 'Quick as lightning with multiplication magic'
  },
  {
    id: 'panda',
    name: 'Zen Master Bamboo',
    price: 120,
    emoji: '🐼',
    description: 'A wise panda who teaches patience and focus'
  },
  {
    id: 'fox',
    name: 'Clever Trickster',
    price: 95,
    emoji: '🦊',
    description: 'A cunning fox with a talent for number puzzles'
  },
  {
    id: 'owl',
    name: 'Professor Hoot',
    price: 110,
    emoji: '🦉',
    description: 'A scholarly owl keeper of ancient wisdom'
  },
  {
    id: 'penguin',
    name: 'Arctic Waddles',
    price: 90,
    emoji: '🐧',
    description: 'A cool penguin who slides through problems'
  },
  {
    id: 'turtle',
    name: 'Ancient Steady',
    price: 75,
    emoji: '🐢',
    description: 'Slow and steady wins the mathematical race'
  },
  {
    id: 'unicorn',
    name: 'Mystic Sparkle',
    price: 200,
    emoji: '🦄',
    description: 'A legendary unicorn that brings magical luck'
  },
  {
    id: 'dragon',
    name: 'Ember the Mighty',
    price: 300,
    emoji: '🐉',
    description: 'A powerful dragon ally for the greatest challenges'
  },
  {
    id: 'phoenix',
    name: 'Flame Reborn',
    price: 250,
    emoji: '🔥',
    description: 'A phoenix that rises from mathematical ashes'
  }
];