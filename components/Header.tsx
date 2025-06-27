
import React from 'react';
import SparklesIcon from './icons/SparklesIcon';
import MenuIcon from './icons/MenuIcon';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  return (
    <header className="relative text-center">
      <div className="lg:hidden absolute left-0 top-1/2 -translate-y-1/2">
        <button
          onClick={onMenuClick}
          className="p-2 rounded-md text-muted-foreground hover:bg-accent"
          aria-label="Open history menu"
        >
          <MenuIcon className="w-7 h-7" />
        </button>
      </div>
      <div className="flex justify-center items-center gap-3">
        <SparklesIcon className="w-8 h-8 text-muted-foreground" />
        <h1 className="text-4xl sm:text-5xl font-bold text-foreground">
          Review Summarizer AI
        </h1>
      </div>
      <p className="mt-3 text-xl text-muted-foreground">
        Get the gist of what the world thinks.
      </p>
    </header>
  );
};

export default Header;
