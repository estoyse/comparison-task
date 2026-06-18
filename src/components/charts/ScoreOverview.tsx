import type { Product, Scores } from '../../types';
import { HEX_LABELS } from '../../types';
import { RadarChart } from './RadarChart';

const CHART_COLORS = ["#ef4444", "#3b82f6", "#a855f7"];
const CHART_BG = ["bg-red-500", "bg-blue-500", "bg-purple-500"];

interface ScoreOverviewProps {
  selected: Product[];
  dynamicScores: Scores[];
}

export function ScoreOverview({ selected, dynamicScores }: ScoreOverviewProps) {
  return (
    <div className='border border-gray-200 dark:border-gray-800 p-6 mb-8 animate-fade-in'>
      <h3 className='text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4'>
        Score Overview
      </h3>
      <div className='flex flex-col items-center gap-5'>
        <RadarChart
          series={selected.map((p, i) => ({
            label: p.name,
            color: CHART_COLORS[i],
            scores: HEX_LABELS.map(label =>
              dynamicScores[i][label.toLowerCase() as keyof Scores]
            ),
          }))}
          size={260}
          fillOpacity={0.25}
        />
        <div className='flex gap-6 flex-wrap justify-center'>
          {selected.map((p, i) => (
            <div key={p.id} className='flex items-center gap-1.5'>
              <span className={`w-3 h-3 ${CHART_BG[i]}`} />
              <span className='text-xs text-gray-600 dark:text-gray-400 font-medium'>
                {p.brand} {p.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
