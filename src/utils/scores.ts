import type { Product, Scores } from '../types';

function clamp(val: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, val));
}

function normalize(value: number, min: number, max: number): number {
  if (max === min) return 5;
  return clamp(((value - min) / (max - min)) * 10, 0, 10);
}

function extractFirstNumber(s: string): number {
  const m = s.match(/[\d.]+/);
  return m ? parseFloat(m[0]) : 0;
}

export function computeScores(p: Product, all: Product[]): Scores {
  const nums = all.map(x => x);

  const antutuVals = nums.map(x => x.antutu);
  const pixelDensityVals = nums.map(x => x.pixelDensity);
  const brightnessVals = nums.map(x => extractFirstNumber(x.brightness));
  const batteryVals = nums.map(x => extractFirstNumber(x.battery));
  const weightVals = nums.map(x => extractFirstNumber(x.weight));
  const priceVals = nums.map(x => x.price);
  const ratingVals = nums.map(x => x.rating);
  const ramVals = nums.map(x => extractFirstNumber(x.ram));
  const storageVals = nums.map(x => extractFirstNumber(x.storage));
  const refreshVals = nums.map(x => extractFirstNumber(x.refreshRate));
  const chargingVals = nums.map(x => extractFirstNumber(x.chargingSpeed));
  const geekbenchVals = nums.map(x => x.geekbenchMulti);

  const screen = normalize(
    (normalize(p.pixelDensity, Math.min(...pixelDensityVals), Math.max(...pixelDensityVals)) * 0.3 +
      normalize(extractFirstNumber(p.brightness), Math.min(...brightnessVals), Math.max(...brightnessVals)) * 0.25 +
      normalize(extractFirstNumber(p.refreshRate), Math.min(...refreshVals), Math.max(...refreshVals)) * 0.25 +
      normalize(p.rating, Math.min(...ratingVals), Math.max(...ratingVals)) * 0.2),
    0, 10
  );

  const camera = normalize(
    (normalize(p.rating, Math.min(...ratingVals), Math.max(...ratingVals)) * 0.4 +
      normalize(p.price, Math.min(...priceVals), Math.max(...priceVals)) * 0.1 +
      (p.telephoto !== '—' ? 2 : 0) +
      (p.ultraWide !== '—' ? 1 : 0)),
    0, 10
  );

  const performance = normalize(
    (normalize(p.antutu, Math.min(...antutuVals), Math.max(...antutuVals)) * 0.35 +
      normalize(p.geekbenchMulti, Math.min(...geekbenchVals), Math.max(...geekbenchVals)) * 0.3 +
      normalize(extractFirstNumber(p.ram), Math.min(...ramVals), Math.max(...ramVals)) * 0.2 +
      normalize(extractFirstNumber(p.storage), Math.min(...storageVals), Math.max(...storageVals)) * 0.15),
    0, 10
  );

  const battery = normalize(
    (normalize(extractFirstNumber(p.battery), Math.min(...batteryVals), Math.max(...batteryVals)) * 0.5 +
      normalize(extractFirstNumber(p.chargingSpeed), Math.min(...chargingVals), Math.max(...chargingVals)) * 0.3 +
      (p.wirelessCharging !== '—' ? 1 : 0)),
    0, 10
  );

  const design = normalize(
    (normalize(Math.max(...weightVals) - extractFirstNumber(p.weight), 0, Math.max(...weightVals) - Math.min(...weightVals)) * 0.25 +
      (p.ipRating === 'IP69' ? 10 : p.ipRating === 'IP68' ? 8 : 5) * 0.4 +
      (p.materials.toLowerCase().includes('titanium') ? 10 : p.materials.toLowerCase().includes('aluminum') ? 7 : 5) * 0.35),
    0, 10
  );

  const value = normalize(
    ((10 - normalize(p.price, Math.min(...priceVals), Math.max(...priceVals))) * 0.5 +
      normalize(p.rating, Math.min(...ratingVals), Math.max(...ratingVals)) * 0.3 +
      normalize(extractFirstNumber(p.battery), Math.min(...batteryVals), Math.max(...batteryVals)) * 0.1 +
      normalize(p.antutu, Math.min(...antutuVals), Math.max(...antutuVals)) * 0.1),
    0, 10
  );

  return {
    screen: Math.round(screen * 10) / 10,
    camera: Math.round(camera * 10) / 10,
    performance: Math.round(performance * 10) / 10,
    battery: Math.round(battery * 10) / 10,
    design: Math.round(design * 10) / 10,
    value: Math.round(value * 10) / 10,
  };
}

export function getBestIds(prods: Product[], key: string): Set<string> | null {
  const BETTER_HIGHER = new Set([
    'rating', 'pixelDensity', 'refreshRate', 'brightness',
    'antutu', 'geekbenchSingle', 'geekbenchMulti',
    'ram', 'storage', 'battery',
    'chargingSpeed', 'wirelessCharging',
  ]);
  const BETTER_LOWER = new Set(['price', 'weight', 'thickness']);

  function parseNumeric(val: unknown): number | null {
    if (typeof val === 'number') return val;
    if (typeof val === 'string') {
      const m = val.match(/^[\d,]+/);
      if (m) return parseFloat(m[0].replace(/,/g, ''));
    }
    return null;
  }

  const vals = prods.map(p => ({ id: p.id, num: parseNumeric(p[key as keyof typeof p]) }));
  const nums = vals.filter(v => v.num !== null).map(v => v.num as number);
  if (nums.length < 2) return null;
  if (new Set(nums).size === 1) return null;

  const best = BETTER_HIGHER.has(key)
    ? Math.max(...nums)
    : BETTER_LOWER.has(key)
      ? Math.min(...nums)
      : null;

  if (best === null) return null;
  return new Set(vals.filter(v => v.num === best).map(v => v.id));
}
