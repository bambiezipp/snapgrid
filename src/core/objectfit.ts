/**
 * objectfit.ts
 * Utilities for CSS object-fit and object-position properties.
 */

export type ObjectFitKeyword =
  | 'fill'
  | 'contain'
  | 'cover'
  | 'none'
  | 'scale-down';

export type ObjectPositionValue =
  | string
  | { x: string | number; y: string | number };

export interface ObjectFitConfig {
  fit?: ObjectFitKeyword;
  position?: ObjectPositionValue;
}

const VALID_FIT_KEYWORDS: Set<string> = new Set([
  'fill',
  'contain',
  'cover',
  'none',
  'scale-down',
]);

export function normalizeObjectFit(
  fit: unknown
): ObjectFitKeyword | undefined {
  if (typeof fit === 'string' && VALID_FIT_KEYWORDS.has(fit)) {
    return fit as ObjectFitKeyword;
  }
  return undefined;
}

export function normalizeObjectPosition(
  position: ObjectPositionValue | undefined
): string | undefined {
  if (position === undefined) return undefined;

  if (typeof position === 'string') {
    return position.trim() || undefined;
  }

  if (typeof position === 'object' && position !== null) {
    const x =
      typeof position.x === 'number' ? `${position.x}px` : position.x;
    const y =
      typeof position.y === 'number' ? `${position.y}px` : position.y;
    return `${x} ${y}`;
  }

  return undefined;
}

export function buildObjectFitStyles(
  config: ObjectFitConfig
): Record<string, string> {
  const styles: Record<string, string> = {};

  const fit = normalizeObjectFit(config.fit);
  if (fit) {
    styles['object-fit'] = fit;
  }

  const position = normalizeObjectPosition(config.position);
  if (position) {
    styles['object-position'] = position;
  }

  return styles;
}

export function objectFitToCSS(config: ObjectFitConfig): string {
  const styles = buildObjectFitStyles(config);
  return Object.entries(styles)
    .map(([prop, value]) => `${prop}: ${value};`)
    .join(' ');
}
