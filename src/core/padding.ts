/**
 * padding.ts
 * Utilities for building CSS padding styles on grid containers and items.
 */

export type PaddingValue = string | number;

export interface PaddingConfig {
  all?: PaddingValue;
  x?: PaddingValue;
  y?: PaddingValue;
  top?: PaddingValue;
  right?: PaddingValue;
  bottom?: PaddingValue;
  left?: PaddingValue;
}

function toCSSValue(value: PaddingValue): string {
  if (typeof value === 'number') {
    return value === 0 ? '0' : `${value}px`;
  }
  return value;
}

export function normalizePadding(
  input: PaddingValue | PaddingConfig | undefined
): PaddingConfig {
  if (input === undefined) return {};
  if (typeof input === 'string' || typeof input === 'number') {
    return { all: input };
  }
  return input;
}

export function buildPaddingStyles(
  config: PaddingConfig
): Record<string, string> {
  const styles: Record<string, string> = {};

  if (config.all !== undefined) {
    styles['padding'] = toCSSValue(config.all);
    return styles;
  }

  const top = config.top ?? config.y;
  const bottom = config.bottom ?? config.y;
  const left = config.left ?? config.x;
  const right = config.right ?? config.x;

  if (top !== undefined) styles['padding-top'] = toCSSValue(top);
  if (right !== undefined) styles['padding-right'] = toCSSValue(right);
  if (bottom !== undefined) styles['padding-bottom'] = toCSSValue(bottom);
  if (left !== undefined) styles['padding-left'] = toCSSValue(left);

  return styles;
}

export function paddingToCSS(config: PaddingConfig): string {
  const styles = buildPaddingStyles(config);
  return Object.entries(styles)
    .map(([prop, val]) => `${prop}: ${val};`)
    .join(' ');
}
