export interface Scores {
  screen: number;
  camera: number;
  performance: number;
  battery: number;
  design: number;
  value: number;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  icon: string;
  price: number;
  rating: number;

  weight: string;
  thickness: string;
  dimensions: string;
  ipRating: string;
  materials: string;

  screenSize: string;
  displayType: string;
  resolution: string;
  pixelDensity: number;
  refreshRate: string;
  brightness: string;
  hdr: string;

  chipset: string;
  cpu: string;
  gpu: string;
  ram: string;
  storage: string;
  antutu: number;
  geekbenchSingle: number;
  geekbenchMulti: number;

  mainCamera: string;
  ultraWide: string;
  telephoto: string;
  frontCamera: string;
  video: string;
  stabilization: string;

  battery: string;
  chargingSpeed: string;
  wirelessCharging: string;

  os: string;
  wifi: string;
  bluetooth: string;
  sim: string;
  usb: string;
}

export interface SpecField {
  key: keyof Product;
  label: string;
  category: string;
}

export const SPEC_FIELDS: SpecField[] = [
  { key: 'price', label: 'Price', category: 'Overview' },
  { key: 'rating', label: 'Overall Rating', category: 'Overview' },
  { key: 'weight', label: 'Weight', category: 'Design' },
  { key: 'thickness', label: 'Thickness', category: 'Design' },
  { key: 'dimensions', label: 'Dimensions', category: 'Design' },
  { key: 'ipRating', label: 'IP Rating', category: 'Design' },
  { key: 'materials', label: 'Materials', category: 'Design' },
  { key: 'screenSize', label: 'Screen Size', category: 'Display' },
  { key: 'displayType', label: 'Display Type', category: 'Display' },
  { key: 'resolution', label: 'Resolution', category: 'Display' },
  { key: 'pixelDensity', label: 'Pixel Density', category: 'Display' },
  { key: 'refreshRate', label: 'Refresh Rate', category: 'Display' },
  { key: 'brightness', label: 'Brightness', category: 'Display' },
  { key: 'hdr', label: 'HDR', category: 'Display' },
  { key: 'chipset', label: 'Chipset', category: 'Performance' },
  { key: 'cpu', label: 'CPU', category: 'Performance' },
  { key: 'gpu', label: 'GPU', category: 'Performance' },
  { key: 'ram', label: 'RAM', category: 'Performance' },
  { key: 'storage', label: 'Storage', category: 'Performance' },
  { key: 'antutu', label: 'AnTuTu Score', category: 'Performance' },
  { key: 'geekbenchSingle', label: 'Geekbench Single', category: 'Performance' },
  { key: 'geekbenchMulti', label: 'Geekbench Multi', category: 'Performance' },
  { key: 'mainCamera', label: 'Main Camera', category: 'Camera' },
  { key: 'ultraWide', label: 'Ultra-Wide', category: 'Camera' },
  { key: 'telephoto', label: 'Telephoto', category: 'Camera' },
  { key: 'frontCamera', label: 'Front Camera', category: 'Camera' },
  { key: 'video', label: 'Video Recording', category: 'Camera' },
  { key: 'stabilization', label: 'Stabilization', category: 'Camera' },
  { key: 'battery', label: 'Capacity', category: 'Battery' },
  { key: 'chargingSpeed', label: 'Charging Speed', category: 'Battery' },
  { key: 'wirelessCharging', label: 'Wireless Charging', category: 'Battery' },
  { key: 'os', label: 'OS', category: 'Connectivity' },
  { key: 'wifi', label: 'Wi-Fi', category: 'Connectivity' },
  { key: 'bluetooth', label: 'Bluetooth', category: 'Connectivity' },
  { key: 'sim', label: 'SIM', category: 'Connectivity' },
  { key: 'usb', label: 'USB', category: 'Connectivity' },
];

export const CATEGORIES = ['Overview', 'Design', 'Display', 'Performance', 'Camera', 'Battery', 'Connectivity'];
export const HEX_LABELS = ['Screen', 'Camera', 'Performance', 'Battery', 'Design', 'Value'] as const;

export interface ProductCategory {
  id: string;
  name: string;
  icon: string;
  products: Product[];
}
