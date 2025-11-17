
import React from 'react';

interface StartScreenProps {
  highScore: number;
  onStartGame: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ highScore, onStartGame }) => {
  return (
    <div className="w-full max-w-3xl flex flex-col items-center">
      {/* Dentist Image */}
      <div className="mb-2 md:mb-4">
        <img 
          src="/lovable-uploads/ac24e457-8929-449c-8bcb-c798353b7b58.png"
          alt="Dentist Character"
          className="w-48 md:w-64 h-auto"
        />
      </div>

      {/* Game Title */}
      <div className="font-mono text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-black mb-2 tracking-wider pixelated">
          CLINIC SIMULATOR
        </h1>
      </div>

      {/* Game Controls - with increased spacing */}
      <div className="w-full max-w-md flex flex-col space-y-4 mt-12">
        {/* Only show high score if it's greater than 0 */}
        {highScore > 0 && (
          <p className="text-center text-black font-mono text-xl">Your high score: {highScore}</p>
        )}
        <button 
          className="game-button start-screen-button"
          onClick={onStartGame}
        >
          Start Game
        </button>
        <button className="game-button start-screen-button">
          Share it!
        </button>
      </div>
    </div>
  );
};

export default StartScreen;
