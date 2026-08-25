import React, { useRef, useEffect } from 'react';
import { Search, X, Command } from 'lucide-react';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  onSearchChange,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
        <Search className="w-4 h-4" />
      </div>
      <input
        ref={inputRef}
        type="text"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search applications..."
        className="w-full pl-10 pr-20 py-2.5 bg-slate-100/80 hover:bg-slate-100 focus:bg-white border border-slate-200/90 rounded-2xl text-sm font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-2xs"
      />
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center gap-1.5">
        {searchQuery ? (
          <button
            onClick={() => onSearchChange('')}
            className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        ) : (
          <div className="hidden sm:flex items-center gap-1 px-2 py-0.5 rounded-lg bg-white/80 border border-slate-200 text-[10px] font-bold text-slate-400 shadow-2xs">
            <Command className="w-2.5 h-2.5" />
            <span>K</span>
          </div>
        )}
      </div>
    </div>
  );
};
