import { describe, it, expect } from 'vitest';
import {
  normalizePosition,
  toOffsetValue,
  buildPositionStyles,
  positionToCSS,
} from './position';

describe('normalizePosition', () => {
  it('returns valid position keywords', () => {
    expect(normalizePosition('relative')).toBe('relative');
    expect(normalizePosition('absolute')).toBe('absolute');
    expect(normalizePosition('fixed')).toBe('fixed');
    expect(normalizePosition('sticky')).toBe('sticky');
    expect(normalizePosition('static')).toBe('static');
  });

  it('returns undefined for invalid values', () => {
    expect(normalizePosition('center')).toBeUndefined();
    expect(normalizePosition(42)).toBeUndefined();
    expect(normalizePosition(null)).toBeUndefined();
  });
});

describe('toOffsetValue', () => {
  it('converts numbers to px strings', () => {
    expect(toOffsetValue(16)).toBe('16px');
    expect(toOffsetValue(-8)).toBe('-8px');
  });

  it('returns "0" for zero', () => {
    expect(toOffsetValue(0)).toBe('0');
  });

  it('passes string values through', () => {
    expect(toOffsetValue('50%')).toBe('50%');
    expect(toOffsetValue('auto')).toBe('auto');
  });
});

describe('buildPositionStyles', () => {
  it('builds position style', () => {
    const result = buildPositionStyles({ position: 'absolute' });
    expect(result['position']).toBe('absolute');
  });

  it('builds offset styles individually', () => {
    const result = buildPositionStyles({ top: 0, left: 16, right: '10%' });
    expect(result['top']).toBe('0');
    expect(result['left']).toBe('16px');
    expect(result['right']).toBe('10%');
    expect(result['bottom']).toBeUndefined();
  });

  it('uses inset shorthand when provided', () => {
    const result = buildPositionStyles({ inset: 0 });
    expect(result['inset']).toBe('0');
    expect(result['top']).toBeUndefined();
  });

  it('includes z-index', () => {
    const result = buildPositionStyles({ zIndex: 10 });
    expect(result['z-index']).toBe('10');
  });

  it('handles z-index auto', () => {
    const result = buildPositionStyles({ zIndex: 'auto' });
    expect(result['z-index']).toBe('auto');
  });
});

describe('positionToCSS', () => {
  it('generates a CSS rule block', () => {
    const css = positionToCSS({ position: 'sticky', top: 0, zIndex: 100 }, '.header');
    expect(css).toContain('.header {');
    expect(css).toContain('position: sticky;');
    expect(css).toContain('top: 0;');
    expect(css).toContain('z-index: 100;');
  });

  it('returns empty string for empty config', () => {
    const css = positionToCSS({}, '.empty');
    expect(css).toBe('');
  });
});
