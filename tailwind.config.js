/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'fantasy': ['Cinzel', 'serif'],
        'medieval': ['MedievalSharp', 'cursive'],
        'rpg': ['Orbitron', 'monospace'],
      },
      colors: {
        rpg: {
          gold: '#FFD700',
          bronze: '#CD7F32',
          silver: '#C0C0C0',
          copper: '#B87333',
          emerald: '#50C878',
          ruby: '#E0115F',
          sapphire: '#0F52BA',
          amethyst: '#9966CC',
          obsidian: '#0B1426',
          parchment: '#F4E4BC',
          leather: '#8B4513',
          stone: '#696969',
          moss: '#8A9A5B',
        }
      },
      borderWidth: {
        '3': '3px',
      },
      boxShadow: {
        'rpg': '0 4px 15px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        'rpg-hover': '0 6px 20px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
        'rpg-pressed': '0 2px 8px rgba(0, 0, 0, 0.4), inset 0 2px 4px rgba(0, 0, 0, 0.2)',
        'magical': '0 0 20px rgba(147, 51, 234, 0.5), 0 0 40px rgba(147, 51, 234, 0.3)',
        'golden': '0 0 20px rgba(255, 215, 0, 0.5), 0 0 40px rgba(255, 215, 0, 0.3)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'shimmer': 'shimmer 2s linear infinite',
        'bounce-gentle': 'bounce-gentle 3s ease-in-out infinite',
        'pulse-magical': 'pulse-magical 3s ease-in-out infinite',
        'fade-in': 'fade-in 0.6s ease-out forwards',
        'fade-in-scale': 'fade-in-scale 0.7s ease-out forwards',
        'fade-in-up': 'fade-in-up 0.5s ease-out forwards',
        'wiggle': 'wiggle 0.5s ease-in-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(147, 51, 234, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(147, 51, 234, 0.8)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'bounce-gentle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-3px)' },
        },
        'pulse-magical': {
          '0%, 100%': { opacity: 1, transform: 'scale(1)' },
          '50%': { opacity: 0.9, transform: 'scale(1.02)' },
        },
        'fade-in': {
          '0%': { 
            opacity: 0,
            transform: 'scale(0.95)'
          },
          '100%': { 
            opacity: 1,
            transform: 'scale(1)'
          },
        },
        'fade-in-scale': {
          '0%': { 
            opacity: 0,
            transform: 'scale(0.9)'
          },
          '100%': { 
            opacity: 1,
            transform: 'scale(1)'
          },
        },
        'fade-in-up': {
          '0%': { 
            opacity: 0,
            transform: 'translateY(10px) scale(0.98)'
          },
          '100%': { 
            opacity: 1,
            transform: 'translateY(0) scale(1)'
          },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(-3deg)' },
          '75%': { transform: 'rotate(3deg)' },
        },
      },
      backgroundImage: {
        'parchment': "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23F4E4BC\" fill-opacity=\"0.1\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"2\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
        'stone': "url('data:image/svg+xml,%3Csvg width=\"40\" height=\"40\" viewBox=\"0 0 40 40\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"%23696969\" fill-opacity=\"0.05\"%3E%3Cpath d=\"M20 20c0 11.046-8.954 20-20 20s-20-8.954-20-20 8.954-20 20-20 20 8.954 20 20z\"/%3E%3C/g%3E%3C/svg%3E')",
        'magical-gradient': 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
        'golden-gradient': 'linear-gradient(45deg, #f7971e 0%, #ffd200 100%)',
      },
    },
  },
  plugins: [],
};