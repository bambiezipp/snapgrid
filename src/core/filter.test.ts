import { describe, it, expect } from 'vitest';
import {
  normalizeFilterValue,
  buildFilterString,
  buildFilterStyles,
  filterToCSS,
} from './filter';

describe('normalizeFilterValue', () => {
  it('converts blur with number to px', () => {
    expect(normalizeFilterValue('blur', 4)).toBe('blur(4px)');
  });

  it('converts blur with string as-is', () => {
    expect(normalizeFilterValue('blur', '0.5rem')).toBe('blur(0.5rem)');
  });

  it('converts brightness', () => {
    expect(normalizeFilterValue('brightness', 1.5)).toBe('brightness(1.5)');
  });

  it('converts contrast with fraction to percent', () => {
    expect(normalizeFilterValue('contrast', 0.8)).toBe('contrast(80%)');
  });

  it('converts hueRotate with number to deg', () => {
    expect(normalizeFilterValue('hueRotate', 90)).toBe('hue-rotate(90deg)');
  });

  it('converts dropShadow', () => {
    expect(normalizeFilterValue('dropShadow', '2px 2px 4px black')).toBe('drop-shadow(2px 2px 4px black)');
  });

  it('returns empty string for unknown key', () => {
    expect(normalizeFilterValue('unknown', 1)).toBe('');
  });
});

describe('buildFilterString', () => {
  it('builds a combined filter string', () => {
    const result = buildFilterString({ blur: 4, brightness: 1.2 });
    expect(result).toBe('blur(4px) brightness(1.2)');
  });

  it('returns empty string when no filters', () => {
    expect(buildFilterString({})).toBe('');
  });

  it('respects order of keys', () => {
    const result = buildFilterString({ grayscale: 1, blur: 2 });
    expect(result).toContain('blur(2px)');
    expect(result).toContain('grayscale(100%)');
  });
});

describe('buildFilterStyles', () => {
  it('sets filter property', () => {
    const styles = buildFilterStyles({ blur: 6 });
    expect(styles['filter']).toBe('blur(6px)');
  });

  it('sets backdrop-filter from backdrop config', () => {
    const styles = buildFilterStyles({ backdrop: { blur: 8, brightness: 0.9 } });
    expect(styles['backdrop-filter']).toContain('blur(8px)');
    expect(styles['backdrop-filter']).toContain('brightness(0.9)');
  });

  it('omits filter if no main filters provided', () => {
    const styles = buildFilterStyles({ backdrop: { blur: 4 } });
    expect(styles['filter']).toBeUndefined();
  });

  it('handles both filter and backdrop-filter', () => {
    const styles = buildFilterStyles({ blur: 2, backdrop: { grayscale: 0.5 } });
    expect(styles['filter']).toBeDefined();
    expect(styles['backdrop-filter']).toBeDefined();
  });
});

describe('filterToCSS', () => {
  it('serializes styles to CSS string', () => {
    const css = filterToCSS({ filter: 'blur(4px)', 'backdrop-filter': 'blur(8px)' });
    expect(css).toContain('filter: blur(4px);');
    expect(css).toContain('backdrop-filter: blur(8px);');
  });

  it('returns empty string for empty styles', () => {
    expect(filterToCSS({})).toBe('');
  });
});
