import { ArrowRight } from 'lucide-react';

interface CompareButtonProps {
  selectedCount: number;
  onClick: () => void;
}

export function CompareButton({ selectedCount, onClick }: CompareButtonProps) {
  const enabled = selectedCount >= 2;
  return (
    <button
      className={
        "mt-6 w-full py-3.5 text-sm font-semibold border cursor-pointer transition-colors flex items-center justify-center gap-2 " +
        (enabled
          ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 border-gray-900 dark:border-white hover:bg-gray-800 dark:hover:bg-gray-100"
          : "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 border-gray-200 dark:border-gray-700 cursor-not-allowed")
      }
      disabled={!enabled}
      onClick={onClick}
      type='button'
      aria-label={`Compare ${selectedCount} items`}
    >
      Compare ({selectedCount} {selectedCount === 1 ? "item" : "items"})
      {enabled && <ArrowRight className='w-3.5 h-3.5' />}
    </button>
  );
}
