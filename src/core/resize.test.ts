import { describe, it, expect } from 'vitest';
import {
  normalizeResize,
  toDimensionValue,
  buildResizeStyles,
  resizeToCSS,
} from './resize';

describe('normalizeResize', () => {
  it('returns valid resize values as-is', () => {
    expect(normalizeResize('both')).toBe('both');
    expect(normalizeResize('horizontal')).toBe('horizontal');
    expect(normalizeResize('vertical')).toBe('vertical');
    expect(normalizeResize('block')).toBe('block');
    expect(normalizeResize('inline')).toBe('inline');
    expect(normalizeResize('none')).toBe('none');
  });

  it('returns none for invalid values', () => {
    expect(normalizeResize('invalid')).toBe('none');
    expect(normalizeResize(42)).toBe('none');
    expect(normalizeResize(undefined)).toBe('none');
    expect(normalizeResize(null)).toBe('none');
  });
});

describe('toDimensionValue', () => {
  it('converts numbers to px strings', () => {
    expect(toDimensionValue(200)).toBe('200px');
    expect(toDimensionValue(0)).toBe('0px');
  });

  it('returns strings as-is', () => {
    expect(toDimensionValue('50%')).toBe('50%');
    expect(toDimensionValue('10rem')).toBe('10rem');
  });

  it('returns undefined for undefined', () => {
    expect(toDimensionValue(undefined)).toBeUndefined();
  });
});

describe('buildResizeStyles', () => {
  it('builds resize style with overflow', () => {
    const result = buildResizeStyles({ resize: 'both' });
    expect(result['resize']).toBe('both');
    expect(result['overflow']).toBe('auto');
  });

  it('omits resize and overflow when not provided', () => {
    const result = buildResizeStyles({ minWidth: 100 });
    expect(result['resize']).toBeUndefined();
    expect(result['overflow']).toBeUndefined();
    expect(result['min-width']).toBe('100px');
  });

  it('builds dimension constraints', () => {
    const result = buildResizeStyles({
      resize: 'horizontal',
      minWidth: '200px',
      maxWidth: '80%',
      minHeight: 50,
      maxHeight: '400px',
    });
    expect(result['min-width']).toBe('200px');
    expect(result['max-width']).toBe('80%');
    expect(result['min-height']).toBe('50px');
    expect(result['max-height']).toBe('400px');
  });

  it('returns empty object for empty config', () => {
    expect(buildResizeStyles({})).toEqual({});
  });
});

describe('resizeToCSS', () => {
  it('produces valid CSS string', () => {
    const css = resizeToCSS({ resize: 'vertical', minHeight: 100 });
    expect(css).toContain('resize: vertical;');
    expect(css).toContain('overflow: auto;');
    expect(css).toContain('min-height: 100px;');
  });

  it('returns empty string for empty config', () => {
    expect(resizeToCSS({})).toBe('');
  });
});
