/**
 * overflow.ts
 * Utilities for controlling overflow and scroll-snap behavior on grid containers and items.
 */

export type OverflowValue = 'visible' | 'hidden' | 'scroll' | 'auto' | 'clip';
export type ScrollSnapType = 'none' | 'x mandatory' | 'y mandatory' | 'both mandatory' | 'x proximity' | 'y proximity' | 'both proximity';
export type ScrollSnapAlign = 'none' | 'start' | 'end' | 'center';

export interface OverflowConfig {
  overflow?: OverflowValue | { x?: OverflowValue; y?: OverflowValue };
  scrollSnapType?: ScrollSnapType;
  scrollSnapAlign?: ScrollSnapAlign;
  scrollPadding?: string | number;
  scrollMargin?: string | number;
}

export type OverflowStyles = Record<string, string>;

export function normalizeOverflow(
  overflow: OverflowConfig['overflow']
): { overflowX?: string; overflowY?: string; overflow?: string } {
  if (!overflow) return {};
  if (typeof overflow === 'string') {
    return { overflow };
  }
  const result: Record<string, string> = {};
  if (overflow.x) result['overflow-x'] = overflow.x;
  if (overflow.y) result['overflow-y'] = overflow.y;
  return result;
}

export function normalizeScrollValue(value: string | number | undefined): string | undefined {
  if (value === undefined) return undefined;
  if (typeof value === 'number') return `${value}px`;
  return value;
}

export function buildOverflowStyles(config: OverflowConfig): OverflowStyles {
  const styles: OverflowStyles = {};

  const overflowProps = normalizeOverflow(config.overflow);
  Object.assign(styles, overflowProps);

  if (config.scrollSnapType && config.scrollSnapType !== 'none') {
    styles['scroll-snap-type'] = config.scrollSnapType;
  }

  if (config.scrollSnapAlign && config.scrollSnapAlign !== 'none') {
    styles['scroll-snap-align'] = config.scrollSnapAlign;
  }

  const scrollPadding = normalizeScrollValue(config.scrollPadding);
  if (scrollPadding) styles['scroll-padding'] = scrollPadding;

  const scrollMargin = normalizeScrollValue(config.scrollMargin);
  if (scrollMargin) styles['scroll-margin'] = scrollMargin;

  return styles;
}

export function overflowToCSS(selector: string, config: OverflowConfig): string {
  const styles = buildOverflowStyles(config);
  const declarations = Object.entries(styles)
    .map(([prop, val]) => `  ${prop}: ${val};`)
    .join('\n');
  if (!declarations) return '';
  return `${selector} {\n${declarations}\n}`;
}
