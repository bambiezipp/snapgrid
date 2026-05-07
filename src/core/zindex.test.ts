import { describe, it, expect } from 'vitest';
import {
  normalizeZIndex,
  buildZIndexStyles,
  zIndexToCSS,
} from './zindex';

describe('normalizeZIndex', () => {
  it('converts integer to string', () => {
    expect(normalizeZIndex(10)).toBe('10');
    expect(normalizeZIndex(0)).toBe('0');
    expect(normalizeZIndex(-1)).toBe('-1');
  });

  it('accepts keyword values', () => {
    expect(normalizeZIndex('auto')).toBe('auto');
    expect(normalizeZIndex('inherit')).toBe('inherit');
    expect(normalizeZIndex('initial')).toBe('initial');
    expect(normalizeZIndex('unset')).toBe('unset');
  });

  it('throws for non-integer numbers', () => {
    expect(() => normalizeZIndex(1.5)).toThrow(RangeError);
  });

  it('throws for invalid string values', () => {
    expect(() => normalizeZIndex('high' as never)).toThrow(TypeError);
  });
});

describe('buildZIndexStyles', () => {
  it('returns empty object for empty config', () => {
    expect(buildZIndexStyles({})).toEqual({});
  });

  it('sets z-index from number', () => {
    expect(buildZIndexStyles({ zIndex: 50 })).toEqual({ 'z-index': '50' });
  });

  it('sets z-index from keyword', () => {
    expect(buildZIndexStyles({ zIndex: 'auto' })).toEqual({ 'z-index': 'auto' });
  });

  it('sets isolation when isolate is true', () => {
    const styles = buildZIndexStyles({ isolate: true });
    expect(styles['isolation']).toBe('isolate');
  });

  it('sets isolation when stackingContext is true', () => {
    const styles = buildZIndexStyles({ stackingContext: true });
    expect(styles['isolation']).toBe('isolate');
    expect(styles['transform']).toBe('translateZ(0)');
  });

  it('does not add transform when isolate is true', () => {
    const styles = buildZIndexStyles({ isolate: true, stackingContext: true });
    expect(styles['transform']).toBeUndefined();
  });

  it('combines z-index and isolation', () => {
    const styles = buildZIndexStyles({ zIndex: 10, isolate: true });
    expect(styles['z-index']).toBe('10');
    expect(styles['isolation']).toBe('isolate');
  });
});

describe('zIndexToCSS', () => {
  it('serializes styles to CSS string', () => {
    const css = zIndexToCSS({ 'z-index': '10', isolation: 'isolate' });
    expect(css).toContain('z-index: 10;');
    expect(css).toContain('isolation: isolate;');
  });

  it('returns empty string for empty styles', () => {
    expect(zIndexToCSS({})).toBe('');
  });
});
