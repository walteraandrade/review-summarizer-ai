"use client";

import React from 'react';
import HistoryIcon from './icons/HistoryIcon';
import TrashIcon from './icons/TrashIcon';
import XIcon from './icons/XIcon';

interface HistoryPanelProps {
  history: string[];
  onHistoryClick: (topic: string) => void;
  onClearHistory: () => void;
  isOpen: boolean;
  onClose: () => void;
}

const HistoryPanel: React.FC<HistoryPanelProps> = ({ history, onHistoryClick, onClearHistory, isOpen, onClose }) => {
  return (
    <>
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-card border-r border-border z-20 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0 lg:flex lg:flex-col`}
      >
        <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b border-border">
                <div className="flex items-center gap-3">
                    <HistoryIcon className="w-6 h-6 text-muted-foreground" />
                    <h2 className="text-xl font-bold text-foreground">Search History</h2>
                </div>
                <button
                    onClick={onClose}
                    className="p-1 rounded-md text-muted-foreground hover:bg-accent lg:hidden"
                    aria-label="Close menu"
                >
                    <XIcon className="w-6 h-6" />
                </button>
            </div>
            <div className="flex-grow overflow-y-auto">
                {history.length > 0 ? (
                <ul className="p-2">
                    {history.map((item, index) => (
                    <li key={index}>
                        <button
                        onClick={() => onHistoryClick(item)}
                        className="w-full text-left p-3 rounded-md text-foreground hover:bg-accent transition-colors duration-200 truncate"
                        >
                        {item}
                        </button>
                    </li>
                    ))}
                </ul>
                ) : (
                <div className="p-4 text-center text-muted-foreground">
                    <p>Your search history will appear here.</p>
                </div>
                )}
            </div>
            {history.length > 0 && (
                <div className="p-4 border-t border-border">
                <button
                    onClick={onClearHistory}
                    className="w-full flex items-center justify-center gap-2 p-3 rounded-md bg-accent text-foreground hover:bg-destructive hover:text-destructive-foreground transition-colors duration-200"
                >
                    <TrashIcon className="w-5 h-5" />
                    <span>Clear History</span>
                </button>
                </div>
            )}
        </div>
      </aside>
      {isOpen && <div onClick={onClose} className="fixed inset-0 bg-black/60 z-10 lg:hidden" />}
    </>
  );
};

export default HistoryPanel;