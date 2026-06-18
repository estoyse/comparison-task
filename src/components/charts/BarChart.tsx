interface BarItem {
  label: string;
  value: number;
  max: number;
  color: string;
}

interface BarChartProps {
  items: BarItem[];
  title: string;
}

export function BarChart({ items, title }: BarChartProps) {
  return (
    <div className="flex-1 min-w-0">
      <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">{title}</h4>
      <div className="space-y-2">
        {items.map(item => {
          const pct = item.max > 0 ? (item.value / item.max) * 100 : 0;
          return (
            <div key={item.label} className="flex items-center gap-2">
              <span className="text-xs text-gray-600 dark:text-gray-400 w-20 shrink-0 truncate">{item.label}</span>
              <div className="flex-1 h-4 bg-gray-100 dark:bg-gray-800">
                <div
                  className="h-full transition-all duration-500"
                  style={{ width: `${Math.min(pct, 100)}%`, background: item.color }}
                />
              </div>
              <span className="text-xs text-gray-700 dark:text-gray-300 font-medium w-14 text-right shrink-0">
                {item.value.toLocaleString()}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
