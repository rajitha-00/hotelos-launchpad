import { AppCategory, IAppItem } from '../interfaces';

export interface ICategoryFilterItem {
  id: AppCategory;
  label: string;
  count: number;
}

export const getCategoryFilters = (apps: IAppItem[]): ICategoryFilterItem[] => {
  const categories: { id: AppCategory; label: string }[] = [
    { id: 'ALL', label: 'All Apps' },
    { id: 'OPERATIONS', label: 'Operations' },
    { id: 'DINING', label: 'F&B' },
    { id: 'ADMIN', label: 'Management' },
    { id: 'PUBLIC', label: 'Public Web' },
  ];

  return categories.map((cat) => {
    const count =
      cat.id === 'ALL'
        ? apps.length
        : apps.filter((app) => app.category === cat.id).length;
    return {
      id: cat.id,
      label: cat.label,
      count,
    };
  });
};
