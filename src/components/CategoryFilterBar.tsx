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
    <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none pt-1">
      {categories.map((cat) => {
        const isSelected = selectedCategory === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              isSelected
                ? 'bg-slate-900 text-white shadow-sm shadow-slate-900/20'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80 hover:text-slate-900'
            }`}
          >
            <span>{cat.label}</span>
            <span
              className={`px-1.5 py-0.2 text-[10px] font-bold rounded-full ${
                isSelected
                  ? 'bg-slate-800 text-slate-200'
                  : 'bg-slate-100 text-slate-500'
              }`}
            >
              {cat.count}
            </span>
          </button>
        );
      })}
    </div>
  );
};
