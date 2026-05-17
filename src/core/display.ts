// display.ts — Normalize and build CSS display & box model styles

export type DisplayValue =
  | 'block'
  | 'inline'
  | 'inline-block'
  | 'flex'
  | 'inline-flex'
  | 'grid'
  | 'inline-grid'
  | 'contents'
  | 'none'
  | 'table'
  | 'table-cell'
  | 'table-row'
  | 'list-item'
  | (string & {});

export type FloatValue = 'left' | 'right' | 'none' | 'inline-start' | 'inline-end';
export type ClearValue = 'left' | 'right' | 'both' | 'none' | 'inline-start' | 'inline-end';

export interface DisplayConfig {
  display?: DisplayValue;
  float?: FloatValue;
  clear?: ClearValue;
  verticalAlign?: string;
}

const VALID_DISPLAY: ReadonlySet<string> = new Set([
  'block', 'inline', 'inline-block', 'flex', 'inline-flex',
  'grid', 'inline-grid', 'contents', 'none', 'table',
  'table-cell', 'table-row', 'list-item',
]);

const VALID_FLOAT: ReadonlySet<string> = new Set([
  'left', 'right', 'none', 'inline-start', 'inline-end',
]);

const VALID_CLEAR: ReadonlySet<string> = new Set([
  'left', 'right', 'both', 'none', 'inline-start', 'inline-end',
]);

export function normalizeDisplay(value: unknown): DisplayValue | undefined {
  if (typeof value !== 'string') return undefined;
  const v = value.trim().toLowerCase();
  return VALID_DISPLAY.has(v) ? (v as DisplayValue) : (value as DisplayValue);
}

export function normalizeFloat(value: unknown): FloatValue | undefined {
  if (typeof value !== 'string') return undefined;
  const v = value.trim().toLowerCase();
  return VALID_FLOAT.has(v) ? (v as FloatValue) : undefined;
}

export function normalizeClear(value: unknown): ClearValue | undefined {
  if (typeof value !== 'string') return undefined;
  const v = value.trim().toLowerCase();
  return VALID_CLEAR.has(v) ? (v as ClearValue) : undefined;
}

export function buildDisplayStyles(config: DisplayConfig): Record<string, string> {
  const styles: Record<string, string> = {};

  const display = normalizeDisplay(config.display);
  if (display) styles['display'] = display;

  const float = normalizeFloat(config.float);
  if (float) styles['float'] = float;

  const clear = normalizeClear(config.clear);
  if (clear) styles['clear'] = clear;

  if (typeof config.verticalAlign === 'string' && config.verticalAlign.trim()) {
    styles['vertical-align'] = config.verticalAlign.trim();
  }

  return styles;
}

export function displayToCSS(config: DisplayConfig): string {
  return Object.entries(buildDisplayStyles(config))
    .map(([k, v]) => `${k}: ${v};`)
    .join(' ');
}
