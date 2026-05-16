/**
 * resize.ts — Utilities for CSS resize and user-resizable element control
 */

export type ResizeValue = 'none' | 'both' | 'horizontal' | 'vertical' | 'block' | 'inline';

export interface ResizeConfig {
  resize?: ResizeValue;
  minWidth?: string | number;
  minHeight?: string | number;
  maxWidth?: string | number;
  maxHeight?: string | number;
}

const VALID_RESIZE_VALUES: ResizeValue[] = [
  'none', 'both', 'horizontal', 'vertical', 'block', 'inline',
];

export function normalizeResize(value: unknown): ResizeValue {
  if (typeof value === 'string' && VALID_RESIZE_VALUES.includes(value as ResizeValue)) {
    return value as ResizeValue;
  }
  return 'none';
}

export function toDimensionValue(value: string | number | undefined): string | undefined {
  if (value === undefined) return undefined;
  if (typeof value === 'number') return `${value}px`;
  return value;
}

export function buildResizeStyles(config: ResizeConfig): Record<string, string> {
  const styles: Record<string, string> = {};

  if (config.resize !== undefined) {
    styles['resize'] = normalizeResize(config.resize);
    // resize requires overflow to not be visible
    styles['overflow'] = 'auto';
  }

  const minW = toDimensionValue(config.minWidth);
  const minH = toDimensionValue(config.minHeight);
  const maxW = toDimensionValue(config.maxWidth);
  const maxH = toDimensionValue(config.maxHeight);

  if (minW !== undefined) styles['min-width'] = minW;
  if (minH !== undefined) styles['min-height'] = minH;
  if (maxW !== undefined) styles['max-width'] = maxW;
  if (maxH !== undefined) styles['max-height'] = maxH;

  return styles;
}

export function resizeToCSS(config: ResizeConfig): string {
  const styles = buildResizeStyles(config);
  return Object.entries(styles)
    .map(([k, v]) => `${k}: ${v};`)
    .join(' ');
}
