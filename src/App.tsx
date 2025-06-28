import React, { useState, useEffect } from 'react';
import { AppView, GameSession } from './types';
import { generateQuestionsForMode } from './utils/gameLogic';
import { applyThemeToDocument, getCurrentThemeData } from './utils/themes';
import MainMenu from './components/MainMenu';
import GameSetup from './components/GameSetup';
import Gameplay from './components/Gameplay';
import SessionSummary from './components/SessionSummary';
import Shop from './components/Shop';
import Collection from './components/Collection';

function App() {
  const [currentView, setCurrentView] = useState<AppView>('menu');
  const [gameQuestions, setGameQuestions] = useState<any[]>([]);
  const [gameMode, setGameMode] = useState<'practice' | 'endless'>('practice');
  const [skipEnabled, setSkipEnabled] = useState(true);
  const [selectedTables, setSelectedTables] = useState<number[]>([]);
  const [lastSession, setLastSession] = useState<GameSession | null>(null);

  useEffect(() => {
    // Apply current theme on app load
    const theme = getCurrentThemeData();
    applyThemeToDocument(theme.id);
  }, []);

  const handleStartPractice = () => {
    setCurrentView('setup');
  };

  const handleOpenShop = () => {
    setCurrentView('shop');
  };

  const handleOpenCollection = () => {
    setCurrentView('collection');
  };

  const handleBackToMenu = () => {
    setCurrentView('menu');
  };

  const handleStartGame = (tables: number[], mode: 'practice' | 'endless', skipEnabled: boolean) => {
    const questions = generateQuestionsForMode(tables, mode);
    setGameQuestions(questions);
    setGameMode(mode);
    setSkipEnabled(skipEnabled);
    setSelectedTables(tables);
    setCurrentView('gameplay');
  };

  const handleSessionComplete = (session: GameSession) => {
    setLastSession(session);
    setCurrentView('summary');
  };

  const handlePlayAgain = () => {
    setCurrentView('setup');
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'menu':
        return (
          <MainMenu
            onStartPractice={handleStartPractice}
            onOpenShop={handleOpenShop}
            onOpenCollection={handleOpenCollection}
          />
        );
      
      case 'setup':
        return (
          <GameSetup
            onBack={handleBackToMenu}
            onStartGame={handleStartGame}
          />
        );
      
      case 'gameplay':
        return (
          <Gameplay
            questions={gameQuestions}
            mode={gameMode}
            skipEnabled={skipEnabled}
            selectedTables={selectedTables}
            onBack={handleBackToMenu}
            onSessionComplete={handleSessionComplete}
          />
        );
      
      case 'summary':
        return lastSession ? (
          <SessionSummary
            session={lastSession}
            onBackToMenu={handleBackToMenu}
            onPlayAgain={handlePlayAgain}
            onViewCollection={handleOpenCollection}
          />
        ) : null;
      
      case 'shop':
        return (
          <Shop
            onBack={handleBackToMenu}
          />
        );
      
      case 'collection':
        return (
          <Collection
            onBack={handleBackToMenu}
          />
        );
      
      default:
        return (
          <MainMenu
            onStartPractice={handleStartPractice}
            onOpenShop={handleOpenShop}
            onOpenCollection={handleOpenCollection}
          />
        );
    }
  };

  return (
    <div className="App">
      {renderCurrentView()}
    </div>
  );
}

export default App;