import { describe, it, expect } from 'vitest';
import {
  normalizeOverflow,
  normalizeScrollValue,
  buildOverflowStyles,
  overflowToCSS,
} from './overflow';

describe('normalizeOverflow', () => {
  it('returns empty object when undefined', () => {
    expect(normalizeOverflow(undefined)).toEqual({});
  });

  it('returns shorthand overflow for string value', () => {
    expect(normalizeOverflow('hidden')).toEqual({ overflow: 'hidden' });
  });

  it('returns axis-specific overflow for object value', () => {
    expect(normalizeOverflow({ x: 'auto', y: 'hidden' })).toEqual({
      'overflow-x': 'auto',
      'overflow-y': 'hidden',
    });
  });

  it('handles partial axis object', () => {
    expect(normalizeOverflow({ x: 'scroll' })).toEqual({ 'overflow-x': 'scroll' });
  });
});

describe('normalizeScrollValue', () => {
  it('returns undefined for undefined input', () => {
    expect(normalizeScrollValue(undefined)).toBeUndefined();
  });

  it('converts number to px string', () => {
    expect(normalizeScrollValue(16)).toBe('16px');
  });

  it('returns string as-is', () => {
    expect(normalizeScrollValue('1rem')).toBe('1rem');
  });
});

describe('buildOverflowStyles', () => {
  it('returns empty object for empty config', () => {
    expect(buildOverflowStyles({})).toEqual({});
  });

  it('builds scroll-snap-type', () => {
    const styles = buildOverflowStyles({ scrollSnapType: 'x mandatory' });
    expect(styles['scroll-snap-type']).toBe('x mandatory');
  });

  it('omits scroll-snap-type when none', () => {
    const styles = buildOverflowStyles({ scrollSnapType: 'none' });
    expect(styles['scroll-snap-type']).toBeUndefined();
  });

  it('builds full overflow config', () => {
    const styles = buildOverflowStyles({
      overflow: { x: 'auto', y: 'hidden' },
      scrollSnapType: 'x mandatory',
      scrollSnapAlign: 'start',
      scrollPadding: 8,
    });
    expect(styles['overflow-x']).toBe('auto');
    expect(styles['overflow-y']).toBe('hidden');
    expect(styles['scroll-snap-type']).toBe('x mandatory');
    expect(styles['scroll-snap-align']).toBe('start');
    expect(styles['scroll-padding']).toBe('8px');
  });
});

describe('overflowToCSS', () => {
  it('returns empty string for empty config', () => {
    expect(overflowToCSS('.grid', {})).toBe('');
  });

  it('generates valid CSS block', () => {
    const css = overflowToCSS('.grid', { overflow: 'hidden', scrollSnapType: 'y mandatory' });
    expect(css).toContain('.grid {');
    expect(css).toContain('overflow: hidden;');
    expect(css).toContain('scroll-snap-type: y mandatory;');
  });
});
