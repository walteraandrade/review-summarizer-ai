import React from 'react';
import SearchIcon from './icons/SearchIcon';

interface SearchInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
  isLoading: boolean;
}

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange, onSearch, isLoading }) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        placeholder="e.g., 'The Dark Knight', 'Abbey Road', 'Game of Thrones', 'Bob Dylan'"
        disabled={isLoading}
        className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:ring-2 focus:ring-ring focus:outline-none transition-all duration-200 text-lg text-foreground placeholder-muted-foreground disabled:opacity-50"
      />
      <button
        onClick={onSearch}
        disabled={isLoading}
        className="flex items-center justify-center px-5 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary-hover active:bg-accent disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg text-lg"
      >
        <SearchIcon className="w-5 h-5" />
        <span className="ml-2 hidden sm:inline">{isLoading ? 'Analyzing...' : 'Analyze'}</span>
      </button>
    </div>
  );
};

export default SearchInput;