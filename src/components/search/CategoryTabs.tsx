import { Smartphone, Monitor, type LucideIcon } from 'lucide-react';
import type { ProductCategory } from '../../types';

const categoryIcons: Record<string, LucideIcon> = {
  phones: Smartphone,
  laptops: Monitor,
};

interface CategoryTabsProps {
  categories: ProductCategory[];
  activeCategory: string;
  onSelect: (id: string) => void;
}

export function CategoryTabs({ categories, activeCategory, onSelect }: CategoryTabsProps) {
  return (
    <div className='flex gap-1 mb-6 print:hidden' role='tablist' aria-label='Product categories'>
      {categories.map(cat => {
        const Icon = categoryIcons[cat.id] || Smartphone;
        return (
          <button
            key={cat.id}
            role='tab'
            aria-selected={activeCategory === cat.id}
            className={
              "flex items-center gap-1.5 px-4 py-2 text-xs font-semibold border cursor-pointer transition-colors " +
              (activeCategory === cat.id
                ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 border-gray-900 dark:border-white"
                : "bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500")
            }
            onClick={() => onSelect(cat.id)}
            type='button'
          >
            <Icon className='w-3.5 h-3.5' />
            {cat.name}
          </button>
        );
      })}
    </div>
  );
}
