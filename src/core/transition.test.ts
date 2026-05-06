import { describe, it, expect } from 'vitest';
import {
  toTimeValue,
  normalizeTransitionLayer,
  normalizeTransition,
  buildTransitionStyles,
  transitionToCSS,
} from './transition';

describe('toTimeValue', () => {
  it('converts number to ms string', () => {
    expect(toTimeValue(300)).toBe('300ms');
  });

  it('returns string as-is', () => {
    expect(toTimeValue('0.3s')).toBe('0.3s');
  });

  it('returns fallback when undefined', () => {
    expect(toTimeValue(undefined, '100ms')).toBe('100ms');
  });
});

describe('normalizeTransitionLayer', () => {
  it('uses defaults for empty layer', () => {
    expect(normalizeTransitionLayer({})).toBe('all 200ms ease 0s');
  });

  it('uses provided values', () => {
    expect(normalizeTransitionLayer({ property: 'opacity', duration: 400, easing: 'ease-in-out', delay: 50 }))
      .toBe('opacity 400ms ease-in-out 50ms');
  });

  it('joins multiple properties', () => {
    expect(normalizeTransitionLayer({ property: ['opacity', 'transform'], duration: '0.2s' }))
      .toBe('opacity, transform 0.2s ease 0s');
  });
});

describe('normalizeTransition', () => {
  it('returns none for false', () => {
    expect(normalizeTransition(false)).toEqual(['none']);
  });

  it('returns none for "none"', () => {
    expect(normalizeTransition('none')).toEqual(['none']);
  });

  it('handles single layer object', () => {
    const result = normalizeTransition({ property: 'color', duration: 200 });
    expect(result).toEqual(['color 200ms ease 0s']);
  });

  it('handles array of layers', () => {
    const result = normalizeTransition([
      { property: 'opacity', duration: 150 },
      { property: 'transform', duration: 300, easing: 'ease-out' },
    ]);
    expect(result).toHaveLength(2);
    expect(result[0]).toBe('opacity 150ms ease 0s');
    expect(result[1]).toBe('transform 300ms ease-out 0s');
  });
});

describe('buildTransitionStyles', () => {
  it('returns transition property', () => {
    const styles = buildTransitionStyles({ property: 'opacity', duration: 200 });
    expect(styles).toHaveProperty('transition', 'opacity 200ms ease 0s');
  });

  it('joins multiple layers with comma', () => {
    const styles = buildTransitionStyles([
      { property: 'opacity' },
      { property: 'transform' },
    ]);
    expect(styles.transition).toContain(',');
  });
});

describe('transitionToCSS', () => {
  it('returns valid CSS string', () => {
    const css = transitionToCSS({ property: 'all', duration: 300 });
    expect(css).toBe('transition: all 300ms ease 0s;');
  });
});
