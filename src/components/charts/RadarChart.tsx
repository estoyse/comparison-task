import { HEX_LABELS } from '../../types';

interface RadarSeries {
  label: string;
  color: string;
  scores: number[];
}

interface RadarChartProps {
  series: RadarSeries[];
  size?: number;
  fillOpacity?: number;
}

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function polygonPoints(cx: number, cy: number, r: number, count: number): string {
  const pts: string[] = [];
  for (let i = 0; i < count; i++) {
    const angle = (360 / count) * i;
    const { x, y } = polarToCartesian(cx, cy, r, angle);
    pts.push(`${x},${y}`);
  }
  return pts.join(' ');
}

export function RadarChart({ series, size = 260, fillOpacity = 0.12 }: RadarChartProps) {
  const cx = size / 2;
  const cy = size / 2;
  const maxR = size * 0.38;
  const levels = [0.2, 0.4, 0.6, 0.8, 1.0];
  const sides = HEX_LABELS.length;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="shrink-0">
      {levels.map(level => (
        <polygon
          key={level}
          points={polygonPoints(cx, cy, maxR * level, sides)}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth={1}
        />
      ))}

      {Array.from({ length: sides }).map((_, i) => {
        const angle = (360 / sides) * i;
        const { x, y } = polarToCartesian(cx, cy, maxR, angle);
        return (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={x}
            y2={y}
            stroke="#e5e7eb"
            strokeWidth={1}
          />
        );
      })}

      {series.map(item => {
        const pts: string[] = [];
        for (let i = 0; i < sides; i++) {
          const angle = (360 / sides) * i;
          const dist = (Math.min(Math.max(item.scores[i] || 0, 0), 10) / 10) * maxR;
          const { x, y } = polarToCartesian(cx, cy, dist, angle);
          pts.push(`${x},${y}`);
        }
        return (
          <polygon
            key={item.label}
            points={pts.join(' ')}
            fill={item.color}
            fillOpacity={fillOpacity}
            stroke={item.color}
            strokeWidth={2}
          />
        );
      })}

      {HEX_LABELS.map((label, i) => {
        const angle = (360 / sides) * i;
        const labelR = maxR + 22;
        const { x, y } = polarToCartesian(cx, cy, labelR, angle);
        return (
          <text
            key={label}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-gray-500 text-[10px] font-medium"
          >
            {label}
          </text>
        );
      })}
    </svg>
  );
}
