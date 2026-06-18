import {
  Smartphone,
  Camera,
  Zap,
  TabletSmartphone,
  Lightbulb,
  Crosshair,
  Shield,
  type LucideIcon,
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  Smartphone,
  Camera,
  Zap,
  TabletSmartphone,
  Lightbulb,
  Crosshair,
  Shield,
};

interface ProductIconProps {
  name: string;
  className?: string;
  size?: number;
}

export function ProductIcon({ name, className, size = 24 }: ProductIconProps) {
  const Icon = iconMap[name];
  if (!Icon) return <Smartphone className={className} size={size} />;
  return <Icon className={className} size={size} />;
}
