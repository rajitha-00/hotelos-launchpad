import { AppCategory, IAppItem } from '../interfaces';

export interface ICategoryFilterItem {
  id: AppCategory;
  label: string;
  count: number;
}

export const getCategoryFilters = (apps: IAppItem[]): ICategoryFilterItem[] => {
  const categories: { id: AppCategory; label: string }[] = [
    { id: 'ALL', label: 'All Applications' },
    { id: 'OPERATIONS', label: 'PMS & Desk' },
    { id: 'DINING', label: 'F&B & POS' },
    { id: 'ADMIN', label: 'Platform Control' },
    { id: 'PUBLIC', label: 'Public & Showcase' },
    { id: 'DEVELOPER', label: 'Developer & API' },
    { id: 'INTEGRATION', label: 'Integrations' },
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
