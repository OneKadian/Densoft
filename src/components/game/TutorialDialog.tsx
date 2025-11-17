
import React from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface TutorialDialogProps {
  open: boolean;
  onComplete: () => void;
  onOpenChange: (open: boolean) => void;
}

const TutorialDialog: React.FC<TutorialDialogProps> = ({ open, onComplete, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        hideCloseButton={true}
        className="p-0 border-0 bg-transparent shadow-none max-w-md md:max-w-lg w-full sm:rounded-lg mx-auto"
      >
        <div className="bg-[#5f5d70] text-white font-mono p-6 rounded-lg w-full flex flex-col items-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-5 tracking-wider pixelated text-center">
            Tutorial
          </h2>
          
          <div className="text-sm md:text-base space-y-4 text-center mb-6 font-sans font-semibold">
            <p>
              Survive a day at your dental clinic without losing your mind — or your margin.
            </p>
            
            <div className="space-y-2">
              <p>🧠 Juggle stress.</p>
              <p>💰 Make smart money moves.</p>
              <p>😬 Deal with flaky patients, front-desk chaos, and surprise emergencies.</p>
            </div>
            
            <p>
              Every decision affects your clinic — and your sanity.
              <br />Ready to drill in?
            </p>
          </div>
          
          <button 
            className="game-button start-screen-button w-full max-w-xs" 
            onClick={onComplete}
          >
            I'm ready!
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TutorialDialog;
