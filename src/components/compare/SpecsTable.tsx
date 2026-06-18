import type { Product } from '../../types';
import { SPEC_FIELDS, CATEGORIES } from '../../types';
import { formatValue } from '../../utils/comparison';

const CHART_COLORS = ["#ef4444", "#3b82f6", "#a855f7"];

interface SpecsTableProps {
  selected: Product[];
  diffKeys: Set<string>;
  bestMap: Map<string, Set<string> | null>;
}

export function SpecsTable({ selected, diffKeys, bestMap }: SpecsTableProps) {
  return (
    <>
      <div className='flex items-center gap-2 mb-3 print:hidden'>
        <span className='w-3 h-3 bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800' />
        <span className='text-xs text-gray-500 dark:text-gray-400'>Best value</span>
      </div>
      <div className='overflow-x-auto'>
        <table className='w-full text-sm border-collapse' role='table' aria-label='Specification comparison'>
          <thead>
            <tr>
              <th className='p-3 border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider w-[160px]' scope='col'>
                Category
              </th>
              {selected.map((p, i) => (
                <th
                  key={p.id}
                  className='p-3 border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 min-w-[160px]'
                  style={{ borderTop: `3px solid ${CHART_COLORS[i]}` }}
                  scope='col'
                >
                  <span className='text-xs font-semibold text-gray-700 dark:text-gray-300'>
                    {p.name.split(" ").slice(-1)}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {CATEGORIES.flatMap(cat => {
              const fields = SPEC_FIELDS.filter(f => f.category === cat);
              if (fields.length === 0) return [];
              return [
                <tr key={`cat-${cat}`}>
                  <td
                    colSpan={selected.length + 1}
                    className='p-2 px-3 border border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-900 text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider'
                  >
                    {cat}
                  </td>
                </tr>,
                ...fields.map(field => {
                  const isDiff = diffKeys.has(field.key);
                  const best = bestMap.get(field.key);
                  return (
                    <tr key={field.key}>
                      <th
                        className='p-3 border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-xs font-semibold text-gray-600 dark:text-gray-400 whitespace-nowrap text-left'
                        scope='row'
                      >
                        {field.label}
                      </th>
                      {selected.map(p => {
                        const val = formatValue(field.key, p[field.key]);
                        const isBest = best?.has(p.id) ?? false;
                        return (
                          <td
                            key={p.id}
                            className={
                              "p-3 border border-gray-200 dark:border-gray-800 text-center text-sm whitespace-nowrap " +
                              (isBest
                                ? "bg-emerald-50 dark:bg-emerald-950 text-gray-900 dark:text-gray-100 font-semibold"
                                : isDiff
                                ? "text-gray-900 dark:text-gray-200"
                                : "text-gray-500 dark:text-gray-500")
                            }
                          >
                            {val}
                          </td>
                        );
                      })}
                    </tr>
                  );
                }),
              ];
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
