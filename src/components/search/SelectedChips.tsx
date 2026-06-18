import type { Product } from '../../types';
import { ProductIcon } from '../common/ProductIcon';

interface SelectedChipsProps {
  products: Product[];
  onRemove: (id: string) => void;
}

export function SelectedChips({ products, onRemove }: SelectedChipsProps) {
  if (products.length === 0) return null;

  return (
    <div className='mt-4 flex flex-wrap gap-2 animate-fade-in' aria-label='Selected items'>
      {products.map(p => (
        <span
          key={p.id}
          className='inline-flex items-center gap-1.5 px-3 py-1.5 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm'
        >
          <ProductIcon name={p.icon} size={16} className='text-gray-600 dark:text-gray-400' />
          <span className='text-gray-800 dark:text-gray-200 font-medium'>{p.name}</span>
          <button
            className='text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 text-base leading-none ml-0.5 cursor-pointer'
            onClick={() => onRemove(p.id)}
            type='button'
            aria-label={`Remove ${p.name}`}
          >
            &times;
          </button>
        </span>
      ))}
    </div>
  );
}
