/**
 * margin.ts
 * Utilities for building CSS margin styles on grid containers and items.
 */

export type MarginValue = string | number | 'auto';

export interface MarginConfig {
  all?: MarginValue;
  x?: MarginValue;
  y?: MarginValue;
  top?: MarginValue;
  right?: MarginValue;
  bottom?: MarginValue;
  left?: MarginValue;
}

function toCSSValue(value: MarginValue): string {
  if (value === 'auto') return 'auto';
  if (typeof value === 'number') {
    return value === 0 ? '0' : `${value}px`;
  }
  return value;
}

export function normalizeMargin(
  input: MarginValue | MarginConfig | undefined
): MarginConfig {
  if (input === undefined) return {};
  if (
    typeof input === 'string' ||
    typeof input === 'number'
  ) {
    return { all: input };
  }
  return input;
}

export function buildMarginStyles(
  config: MarginConfig
): Record<string, string> {
  const styles: Record<string, string> = {};

  if (config.all !== undefined) {
    styles['margin'] = toCSSValue(config.all);
    return styles;
  }

  const top = config.top ?? config.y;
  const bottom = config.bottom ?? config.y;
  const left = config.left ?? config.x;
  const right = config.right ?? config.x;

  if (top !== undefined) styles['margin-top'] = toCSSValue(top);
  if (right !== undefined) styles['margin-right'] = toCSSValue(right);
  if (bottom !== undefined) styles['margin-bottom'] = toCSSValue(bottom);
  if (left !== undefined) styles['margin-left'] = toCSSValue(left);

  return styles;
}

export function marginToCSS(config: MarginConfig): string {
  const styles = buildMarginStyles(config);
  return Object.entries(styles)
    .map(([prop, val]) => `${prop}: ${val};`)
    .join(' ');
}
