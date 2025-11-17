
import React, { useState } from 'react';
import { Character, GameState, LoadingImagesState } from '@/types/game';
import GameHeader from '@/components/game/GameHeader';
import StartScreen from '@/components/game/StartScreen';
import TutorialDialog from '@/components/game/TutorialDialog';
import CharacterSelectionDialog from '@/components/game/CharacterSelectionDialog';
import GameInterface from '@/components/game/GameInterface';

const Game = () => {
  // For demonstration purposes, let's set a highScore state
  const [highScore] = useState<number>(0);
  
  // Game state
  const [showTutorial, setShowTutorial] = useState<boolean>(false);
  const [showCharacterSelection, setShowCharacterSelection] = useState<boolean>(false);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [loadingImages, setLoadingImages] = useState<LoadingImagesState>({
    male: true,
    female: true
  });
  
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [gameState, setGameState] = useState<GameState>({
    stress: 0,
    revenue: 0,
    imageLoading: true
  });

  const handleStartGame = () => {
    setShowTutorial(true);
  };

  const handleTutorialComplete = () => {
    setShowTutorial(false);
    // Reset loading state whenever character selection modal is about to open
    setLoadingImages({
      male: true,
      female: true
    });
    setShowCharacterSelection(true);
  };

  const handleCharacterSelect = (character: Character) => {
    setSelectedCharacter(character);
    setShowCharacterSelection(false);
    setGameState(prev => ({
      ...prev,
      imageLoading: true
    }));
    setGameStarted(true);
    console.log(`Selected character: ${character}`);
  };

  // Handle modal open/close to reset loading state
  const handleCharacterSelectionChange = (open: boolean) => {
    // Only allow explicit button actions to close the modal, ignore outside clicks
    if (!open && showCharacterSelection) {
      return;
    }

    setShowCharacterSelection(open);
    // Reset loading state when modal is closed
    if (!open) {
      setLoadingImages({
        male: true,
        female: true
      });
    }
  };

  const handleImageLoad = (character: Character) => {
    setLoadingImages(prev => ({
      ...prev,
      [character]: false
    }));
  };

  const handleGameImageLoad = () => {
    setGameState(prev => ({
      ...prev,
      imageLoading: false
    }));
  };

  const handleTutorialOpenChange = (open: boolean) => {
    // Only allow explicit button actions to close the modal, ignore outside clicks
    if (!open && showTutorial) {
      return;
    }
    setShowTutorial(open);
  };

  return (
    <div className="w-full min-h-screen flex flex-col" style={{ backgroundColor: '#a3c6fa' }}>
      {/* Header */}
      <GameHeader />

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        {!gameStarted ? <StartScreen highScore={highScore} onStartGame={handleStartGame} /> : null}
      </main>

      {/* Dialogs and Game Interface */}
      <TutorialDialog 
        open={showTutorial} 
        onComplete={handleTutorialComplete} 
        onOpenChange={handleTutorialOpenChange} 
      />

      <CharacterSelectionDialog 
        open={showCharacterSelection} 
        loadingImages={loadingImages}
        onSelect={handleCharacterSelect}
        onOpenChange={handleCharacterSelectionChange}
        onImageLoad={handleImageLoad}
      />

      {gameStarted && selectedCharacter && (
        <GameInterface 
          selectedCharacter={selectedCharacter} 
          gameState={gameState}
          onImageLoad={handleGameImageLoad}
        />
      )}
    </div>
  );
};

export default Game;
