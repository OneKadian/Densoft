
import React from 'react';
import { Loader } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Character, GameState } from "@/types/game";

interface GameInterfaceProps {
  selectedCharacter: Character;
  gameState: GameState;
  onImageLoad: () => void;
}

const GameInterface: React.FC<GameInterfaceProps> = ({ 
  selectedCharacter, 
  gameState,
  onImageLoad
}) => {
  const { stress, revenue, imageLoading } = gameState;

  // Get the character image source
  const getCharacterImageSrc = () => {
    if (selectedCharacter === 'male') {
      return "/lovable-uploads/edda9d98-53b1-4c6a-a424-34d22bfb0555.png";
    } else {
      return "/lovable-uploads/b92736fe-5431-4a84-b0c1-a9bdb175ed82.png";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
      <div className="bg-[#5f5d70] text-white rounded-lg max-w-md sm:max-w-xl w-full mx-auto p-4 sm:p-6">
        {/* Status Bars */}
        <div className="grid grid-cols-2 gap-4 mb-4 sm:mb-6">
          {/* Stress Meter */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm sm:text-base font-mono">Stress</span>
              <span className="text-sm sm:text-base font-mono">{stress}%</span>
            </div>
            <Progress 
              value={stress} 
              className="h-2 sm:h-4 bg-gray-700" 
              indicatorClassName="bg-red-500"
            />
          </div>
          
          {/* Revenue Meter */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm sm:text-base font-mono">Revenue</span>
              <span className="text-sm sm:text-base font-mono">{revenue}%</span>
            </div>
            <Progress 
              value={revenue} 
              className="h-2 sm:h-4 bg-gray-700" 
              indicatorClassName="bg-green-500"
            />
          </div>
        </div>
        
        {/* Character Image */}
        <div className="flex justify-center mb-4 sm:mb-6">
          {imageLoading && (
            <div className="w-full max-w-[160px] sm:max-w-[240px] aspect-square bg-[#4d4b5c] rounded-xl flex items-center justify-center">
              <Loader className="w-6 h-6 sm:w-10 sm:h-10 text-white animate-spin" />
            </div>
          )}
          <img 
            src={getCharacterImageSrc()} 
            alt={`${selectedCharacter} Dentist`}
            className={`w-full max-w-[160px] sm:max-w-[240px] aspect-square object-cover rounded-xl ${imageLoading ? 'hidden' : 'block'}`}
            style={{ objectPosition: selectedCharacter === 'male' ? 'center 5%' : 'center 25%' }}
            onLoad={onImageLoad}
          />
        </div>
        
        {/* Message Text */}
        <div className="mb-3 sm:mb-6 text-center">
          <p className="font-mono text-base sm:text-xl md:text-2xl">
            You walk into the clinic and your front desk manager calls in sick. The waiting room's already full of walk-ins.
          </p>
        </div>
        
        {/* Game Options - Updated with the new button styling */}
        <div className="space-y-2 sm:space-y-4">
          <button className="game-button w-full rounded-lg text-sm md:text-lg px-3 py-2 md:px-4 md:py-3">
            Try to multitask — manage reception + treat patients
          </button>
          <button className="game-button w-full rounded-lg text-sm md:text-lg px-3 py-2 md:px-4 md:py-3">
            Quickly call your assistant from another branch
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameInterface;
