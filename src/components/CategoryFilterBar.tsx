import React from 'react';
import { AppCategory } from '../interfaces';
import { ICategoryFilterItem } from '../functions';

interface CategoryFilterBarProps {
  categories: ICategoryFilterItem[];
  selectedCategory: AppCategory;
  onSelectCategory: (category: AppCategory) => void;
}

export const CategoryFilterBar: React.FC<CategoryFilterBarProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
      {categories.map((cat) => {
        const isSelected = selectedCategory === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all select-none ${
              isSelected
                ? 'bg-black text-white shadow-xs'
                : 'bg-white text-slate-800 hover:bg-slate-50 border border-slate-300/90 hover:border-slate-400'
            }`}
          >
            {cat.label}
          </button>
        );
      })}
    </div>
  );
};
