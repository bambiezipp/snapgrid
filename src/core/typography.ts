/**
 * Typography utilities for snapgrid containers and items.
 * Handles font-size, line-height, text-align, font-weight, and letter-spacing.
 */

export interface TypographyOptions {
  fontSize?: string | number;
  lineHeight?: string | number;
  textAlign?: 'left' | 'center' | 'right' | 'justify' | 'start' | 'end';
  fontWeight?: 'normal' | 'bold' | 'lighter' | 'bolder' | number;
  letterSpacing?: string | number;
  textTransform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
  truncate?: boolean;
}

export type TypographyStyles = Record<string, string>;

/** Convert a numeric value to a px string, or return as-is if already a string */
export function toTypographyValue(value: string | number): string {
  if (typeof value === 'number') {
    return `${value}px`;
  }
  return value;
}

/** Normalize font-weight to a valid CSS value */
export function normalizeFontWeight(weight: TypographyOptions['fontWeight']): string {
  if (weight === undefined) return '';
  if (typeof weight === 'number') {
    if (weight < 1 || weight > 1000) throw new Error(`Invalid font-weight: ${weight}`);
    return String(weight);
  }
  return weight;
}

/** Build CSS styles object from TypographyOptions */
export function buildTypographyStyles(options: TypographyOptions): TypographyStyles {
  const styles: TypographyStyles = {};

  if (options.fontSize !== undefined) {
    styles['font-size'] = toTypographyValue(options.fontSize);
  }

  if (options.lineHeight !== undefined) {
    styles['line-height'] = toTypographyValue(options.lineHeight);
  }

  if (options.textAlign !== undefined) {
    styles['text-align'] = options.textAlign;
  }

  if (options.fontWeight !== undefined) {
    styles['font-weight'] = normalizeFontWeight(options.fontWeight);
  }

  if (options.letterSpacing !== undefined) {
    styles['letter-spacing'] = toTypographyValue(options.letterSpacing);
  }

  if (options.textTransform !== undefined) {
    styles['text-transform'] = options.textTransform;
  }

  if (options.truncate) {
    styles['overflow'] = 'hidden';
    styles['text-overflow'] = 'ellipsis';
    styles['white-space'] = 'nowrap';
  }

  return styles;
}

/** Serialize typography styles to a CSS string */
export function typographyToCSS(styles: TypographyStyles): string {
  return Object.entries(styles)
    .map(([prop, value]) => `${prop}: ${value};`)
    .join(' ');
}
