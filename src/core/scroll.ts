// Scroll behavior and snap utilities

export type ScrollBehavior = 'auto' | 'smooth' | 'instant';
export type ScrollSnapType = 'none' | 'x' | 'y' | 'block' | 'inline' | 'both';
export type ScrollSnapStrictness = 'mandatory' | 'proximity';
export type ScrollSnapAlign = 'none' | 'start' | 'end' | 'center';

export interface ScrollConfig {
  behavior?: ScrollBehavior;
  snapType?: ScrollSnapType;
  snapStrictness?: ScrollSnapStrictness;
  snapAlign?: ScrollSnapAlign;
  snapStop?: 'normal' | 'always';
  overscroll?: 'auto' | 'contain' | 'none';
  overscrollX?: 'auto' | 'contain' | 'none';
  overscrollY?: 'auto' | 'contain' | 'none';
}

export function normalizeScrollBehavior(value: unknown): ScrollBehavior {
  const valid: ScrollBehavior[] = ['auto', 'smooth', 'instant'];
  if (typeof value === 'string' && valid.includes(value as ScrollBehavior)) {
    return value as ScrollBehavior;
  }
  return 'auto';
}

export function normalizeSnapType(
  type: ScrollSnapType,
  strictness: ScrollSnapStrictness = 'proximity'
): string {
  if (type === 'none') return 'none';
  return `${type} ${strictness}`;
}

export function buildScrollStyles(config: ScrollConfig): Record<string, string> {
  const styles: Record<string, string> = {};

  if (config.behavior) {
    styles['scroll-behavior'] = normalizeScrollBehavior(config.behavior);
  }

  if (config.snapType && config.snapType !== 'none') {
    styles['scroll-snap-type'] = normalizeSnapType(
      config.snapType,
      config.snapStrictness ?? 'proximity'
    );
  } else if (config.snapType === 'none') {
    styles['scroll-snap-type'] = 'none';
  }

  if (config.snapAlign) {
    styles['scroll-snap-align'] = config.snapAlign;
  }

  if (config.snapStop) {
    styles['scroll-snap-stop'] = config.snapStop;
  }

  if (config.overscroll) {
    styles['overscroll-behavior'] = config.overscroll;
  }

  if (config.overscrollX) {
    styles['overscroll-behavior-x'] = config.overscrollX;
  }

  if (config.overscrollY) {
    styles['overscroll-behavior-y'] = config.overscrollY;
  }

  return styles;
}

export function scrollToCSS(config: ScrollConfig): string {
  const styles = buildScrollStyles(config);
  return Object.entries(styles)
    .map(([key, value]) => `${key}: ${value};`)
    .join(' ');
}
