// CSS filter and backdrop-filter utility

export interface FilterConfig {
  blur?: number | string;
  brightness?: number;
  contrast?: number;
  grayscale?: number;
  hueRotate?: number | string;
  invert?: number;
  opacity?: number;
  saturate?: number;
  sepia?: number;
  dropShadow?: string;
  backdrop?: Partial<Omit<FilterConfig, 'backdrop' | 'dropShadow'>>;
}

export type FilterStyles = Record<string, string>;

function toPxOrRaw(value: number | string, unit = 'px'): string {
  return typeof value === 'number' ? `${value}${unit}` : value;
}

function toPercent(value: number): string {
  return value <= 1 && value >= 0 ? `${value * 100}%` : `${value}%`;
}

export function normalizeFilterValue(key: string, value: number | string): string {
  switch (key) {
    case 'blur': return `blur(${toPxOrRaw(value)})`;
    case 'brightness': return `brightness(${value})`;
    case 'contrast': return `contrast(${typeof value === 'number' ? toPercent(value) : value})`;
    case 'grayscale': return `grayscale(${typeof value === 'number' ? toPercent(value) : value})`;
    case 'hueRotate': return `hue-rotate(${toPxOrRaw(value, 'deg')})`;
    case 'invert': return `invert(${typeof value === 'number' ? toPercent(value) : value})`;
    case 'opacity': return `opacity(${typeof value === 'number' ? toPercent(value) : value})`;
    case 'saturate': return `saturate(${typeof value === 'number' ? toPercent(value) : value})`;
    case 'sepia': return `sepia(${typeof value === 'number' ? toPercent(value) : value})`;
    case 'dropShadow': return `drop-shadow(${value})`;
    default: return '';
  }
}

export function buildFilterString(config: Omit<FilterConfig, 'backdrop'>): string {
  const parts: string[] = [];
  const keys: (keyof typeof config)[] = [
    'blur', 'brightness', 'contrast', 'grayscale',
    'hueRotate', 'invert', 'opacity', 'saturate', 'sepia', 'dropShadow'
  ];
  for (const key of keys) {
    const val = config[key];
    if (val !== undefined) {
      const fn = normalizeFilterValue(key, val as number | string);
      if (fn) parts.push(fn);
    }
  }
  return parts.join(' ');
}

export function buildFilterStyles(config: FilterConfig): FilterStyles {
  const styles: FilterStyles = {};
  const { backdrop, ...rest } = config;

  const filterStr = buildFilterString(rest);
  if (filterStr) styles['filter'] = filterStr;

  if (backdrop) {
    const backdropStr = buildFilterString(backdrop as Omit<FilterConfig, 'backdrop'>);
    if (backdropStr) styles['backdrop-filter'] = backdropStr;
  }

  return styles;
}

export function filterToCSS(styles: FilterStyles): string {
  return Object.entries(styles)
    .map(([k, v]) => `${k}: ${v};`)
    .join(' ');
}
