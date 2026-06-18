import type { Product, Scores } from '../types';
import { SPEC_FIELDS } from '../types';

export function formatValue(key: string, value: unknown): string {
  if (key === 'price') return `$${Number(value).toLocaleString()}`;
  if (key === 'rating') return `${value} / 10`;
  if (key === 'antutu') return `${Number(value).toLocaleString()}`;
  if (key === 'geekbenchSingle' || key === 'geekbenchMulti') return `${value}`;
  if (key === 'pixelDensity') return `${value} ppi`;
  return String(value);
}

export function getDiffKeys(prods: Product[]): Set<string> {
  const diff = new Set<string>();
  for (const field of SPEC_FIELDS) {
    const values = prods.map(p => String(p[field.key]));
    if (new Set(values).size > 1) diff.add(field.key);
  }
  return diff;
}

export function generateProsCons(selected: Product[], scores: Scores[]): string[] {
  if (selected.length < 2) return [];
  const lines: string[] = [];
  const axes = ['screen', 'camera', 'performance', 'battery', 'design', 'value'] as const;

  for (const axis of axes) {
    const vals = scores.map((s, i) => ({ idx: i, val: s[axis] }));
    vals.sort((a, b) => b.val - a.val);
    if (vals[0].val > vals[1].val) {
      const winner = selected[vals[0].idx];
      const axisLabel = axis.charAt(0).toUpperCase() + axis.slice(1);
      lines.push(`${winner.brand} ${winner.name} wins on **${axisLabel}** (${vals[0].val.toFixed(1)} vs ${vals[1].val.toFixed(1)})`);
    }
  }

  return lines.slice(0, 4);
}
