import type { Product } from '../../types';
import { ProductIcon } from '../common/ProductIcon';

const CHART_COLORS = ["#ef4444", "#3b82f6", "#a855f7"];

interface ProductCardsProps {
  selected: Product[];
}

export function ProductCards({ selected }: ProductCardsProps) {
  return (
    <div className='flex flex-col sm:flex-row items-stretch gap-4 mb-8'>
      {selected.map((p, i) => (
        <div
          key={p.id}
          className='flex-1 flex flex-col items-center gap-1 border border-gray-200 dark:border-gray-800 py-6 px-4 animate-scale-in relative overflow-hidden'
          style={{
            borderTop: `3px solid ${CHART_COLORS[i]}`,
            animationDelay: `${i * 80}ms`,
          }}
        >
          <div
            className='absolute inset-0 opacity-[0.04] dark:opacity-[0.06]'
            style={{
              background: `linear-gradient(135deg, ${CHART_COLORS[i]}, transparent)`,
            }}
          />
          <ProductIcon
            name={p.icon}
            size={36}
            className='text-gray-700 dark:text-gray-300 relative'
          />
          <span className='text-sm font-semibold text-gray-900 dark:text-white text-center leading-tight relative'>
            {p.name}
          </span>
          <span className='text-xs text-gray-500 dark:text-gray-400 relative'>
            {p.brand}
          </span>
          <span className='text-lg font-bold text-gray-900 dark:text-white mt-1 relative'>
            ${p.price.toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
}
