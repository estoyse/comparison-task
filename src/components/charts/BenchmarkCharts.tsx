import type { Product } from '../../types';
import { BarChart } from './BarChart';

const CHART_COLORS = ["#ef4444", "#3b82f6", "#a855f7"];

interface BenchmarkChartsProps {
  selected: Product[];
}

function barItems(selected: Product[], getValue: (p: Product) => number) {
  return selected.map((p, i) => ({
    label: p.name.split(" ").slice(-1)[0],
    value: getValue(p),
    max: Math.max(...selected.map(getValue)),
    color: CHART_COLORS[i],
  }));
}

export function BenchmarkCharts({ selected }: BenchmarkChartsProps) {
  return (
    <div className='border border-gray-200 dark:border-gray-800 p-6 mb-8 animate-fade-in'>
      <h3 className='text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4'>
        Performance Benchmarks
      </h3>
      <div className='flex flex-col sm:flex-row gap-8'>
        <BarChart title='AnTuTu Score' items={barItems(selected, p => p.antutu)} />
        <BarChart title='Geekbench Multi' items={barItems(selected, p => p.geekbenchMulti)} />
        <BarChart title='Battery (mAh)' items={barItems(selected, p => parseFloat(p.battery) || 0)} />
      </div>
    </div>
  );
}
