/**
 * Color utilities for snapgrid containers and items.
 * Handles background, text color, and opacity.
 */

export interface ColorOptions {
  background?: string;
  color?: string;
  opacity?: number;
  backdropBlur?: string | number;
}

export type ColorStyles = Record<string, string>;

/** Clamp opacity to the 0–1 range */
export function normalizeOpacity(opacity: number): number {
  if (opacity < 0 || opacity > 1) {
    throw new Error(`Opacity must be between 0 and 1, got: ${opacity}`);
  }
  return opacity;
}

/** Convert backdrop-blur value to CSS filter string */
export function normalizeBackdropBlur(value: string | number): string {
  const blurValue = typeof value === 'number' ? `${value}px` : value;
  return `blur(${blurValue})`;
}

/** Build CSS styles object from ColorOptions */
export function buildColorStyles(options: ColorOptions): ColorStyles {
  const styles: ColorStyles = {};

  if (options.background !== undefined) {
    styles['background'] = options.background;
  }

  if (options.color !== undefined) {
    styles['color'] = options.color;
  }

  if (options.opacity !== undefined) {
    styles['opacity'] = String(normalizeOpacity(options.opacity));
  }

  if (options.backdropBlur !== undefined) {
    styles['-webkit-backdrop-filter'] = normalizeBackdropBlur(options.backdropBlur);
    styles['backdrop-filter'] = normalizeBackdropBlur(options.backdropBlur);
  }

  return styles;
}

/** Serialize color styles to a CSS declaration string */
export function colorToCSS(styles: ColorStyles): string {
  return Object.entries(styles)
    .map(([prop, value]) => `${prop}: ${value};`)
    .join(' ');
}
