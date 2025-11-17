
import React from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Loader } from "lucide-react";
import { Character, LoadingImagesState } from "@/types/game";

interface CharacterSelectionDialogProps {
  open: boolean;
  loadingImages: LoadingImagesState;
  onSelect: (character: Character) => void;
  onOpenChange: (open: boolean) => void;
  onImageLoad: (character: Character) => void;
}

const CharacterSelectionDialog: React.FC<CharacterSelectionDialogProps> = ({ 
  open, 
  loadingImages, 
  onSelect, 
  onOpenChange,
  onImageLoad
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        hideCloseButton={true}
        className="p-0 border-0 bg-transparent shadow-none max-w-md sm:max-w-2xl w-full sm:rounded-lg mx-auto"
      >
        <div className="bg-[#5f5d70] text-white font-mono p-4 sm:p-6 rounded-lg w-full flex flex-col items-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3 tracking-wider pixelated text-center">
            Choose Character
          </h2>
          
          <p className="text-white text-center text-sm sm:text-base mb-4 sm:mb-6">
            Click on a character to select and proceed to the game.
          </p>
          
          {/* Characters container - always flex-row even on mobile */}
          <div className="w-full flex flex-row justify-center gap-3 sm:gap-6">
            {/* Male Dentist */}
            <div 
              className="character-card flex-1 flex justify-center cursor-pointer"
              onClick={() => onSelect('male')}
            >
              {loadingImages.male && (
                <div className="w-full aspect-[3/4] max-w-[160px] sm:max-w-[240px] bg-[#4d4b5c] rounded-2xl flex items-center justify-center">
                  <Loader className="w-8 h-8 sm:w-12 sm:h-12 text-white animate-spin" />
                </div>
              )}
              <img 
                src="/lovable-uploads/edda9d98-53b1-4c6a-a424-34d22bfb0555.png" 
                alt="Male Dentist" 
                className={`w-full aspect-[3/4] max-w-[160px] sm:max-w-[240px] object-cover rounded-2xl ${loadingImages.male ? 'hidden' : 'block'}`}
                style={{ objectPosition: 'center 20%' }}  
                onLoad={() => onImageLoad('male')}
              />
            </div>
            
            {/* Female Dentist */}
            <div 
              className="character-card flex-1 flex justify-center cursor-pointer"
              onClick={() => onSelect('female')}
            >
              {loadingImages.female && (
                <div className="w-full aspect-[3/4] max-w-[160px] sm:max-w-[240px] bg-[#4d4b5c] rounded-2xl flex items-center justify-center">
                  <Loader className="w-8 h-8 sm:w-12 sm:h-12 text-white animate-spin" />
                </div>
              )}
              <img 
                src="/lovable-uploads/b92736fe-5431-4a84-b0c1-a9bdb175ed82.png" 
                alt="Female Dentist" 
                className={`w-full aspect-[3/4] max-w-[160px] sm:max-w-[240px] object-cover rounded-2xl ${loadingImages.female ? 'hidden' : 'block'}`}
                style={{ objectPosition: 'center 25%' }}
                onLoad={() => onImageLoad('female')}
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CharacterSelectionDialog;
