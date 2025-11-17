
import React from 'react';
import { Link } from 'react-router-dom';

const GameHeader: React.FC = () => {
  return (
    <header className="w-full px-4 py-2 md:px-8 md:py-4 flex justify-between items-center">
      <div className="text-white text-3xl md:text-4xl font-bold tracking-wider hidden md:flex">
        <span className="font-sans">Densort</span>
      </div>
      <div className="hidden md:flex space-x-8">
        <Link to="#" className="text-gray-800 pixelated text-lg uppercase tracking-widest hover:underline">About</Link>
        <Link to="#" className="text-gray-800 pixelated text-lg uppercase tracking-widest hover:underline">Check out Densort</Link>
      </div>
      {/* Mobile header - centered button moved down with margin-top */}
      <div className="flex md:hidden w-full justify-center absolute left-0 mt-10">
        <Link to="#" className="text-gray-800 pixelated mobile-densort-link uppercase tracking-widest hover:underline">Check out Densort</Link>
      </div>
    </header>
  );
};

export default GameHeader;
