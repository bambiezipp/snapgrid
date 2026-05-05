/**
 * Gap utilities for snapgrid.
 * Handles column and row gap resolution with responsive support.
 */

export type GapValue = string | number;

export interface GapConfig {
  columnGap?: GapValue;
  rowGap?: GapValue;
  gap?: GapValue;
}

/**
 * Normalizes a gap value to a CSS string.
 * Numbers are treated as pixels; strings are passed through.
 */
export function normalizeGap(value: GapValue): string {
  if (typeof value === 'number') {
    return `${value}px`;
  }
  return value;
}

/**
 * Builds CSS gap properties from a GapConfig.
 * The shorthand `gap` takes precedence over individual columnGap/rowGap
 * only when both columnGap and rowGap are absent.
 */
export function buildGapStyles(config: GapConfig): Record<string, string> {
  const styles: Record<string, string> = {};

  if (config.gap !== undefined && config.columnGap === undefined && config.rowGap === undefined) {
    styles['gap'] = normalizeGap(config.gap);
    return styles;
  }

  if (config.columnGap !== undefined) {
    styles['column-gap'] = normalizeGap(config.columnGap);
  }

  if (config.rowGap !== undefined) {
    styles['row-gap'] = normalizeGap(config.rowGap);
  }

  // Fallback: if gap is set but one of the individual values is missing
  if (config.gap !== undefined) {
    if (config.columnGap === undefined) {
      styles['column-gap'] = normalizeGap(config.gap);
    }
    if (config.rowGap === undefined) {
      styles['row-gap'] = normalizeGap(config.gap);
    }
  }

  return styles;
}

/**
 * Serializes gap styles to a CSS declaration block string.
 */
export function gapToCSS(config: GapConfig): string {
  const styles = buildGapStyles(config);
  return Object.entries(styles)
    .map(([prop, val]) => `${prop}: ${val};`)
    .join(' ');
}
