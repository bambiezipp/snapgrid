import { describe, it, expect } from 'vitest';
import {
  normalizeDisplay,
  normalizeFloat,
  normalizeClear,
  buildDisplayStyles,
  displayToCSS,
} from './display';

describe('normalizeDisplay', () => {
  it('returns known display values', () => {
    expect(normalizeDisplay('flex')).toBe('flex');
    expect(normalizeDisplay('grid')).toBe('grid');
    expect(normalizeDisplay('none')).toBe('none');
    expect(normalizeDisplay('inline-flex')).toBe('inline-flex');
  });

  it('trims and lowercases input', () => {
    expect(normalizeDisplay('  BLOCK  ')).toBe('block');
  });

  it('passes through unknown string values', () => {
    expect(normalizeDisplay('run-in')).toBe('run-in');
  });

  it('returns undefined for non-string', () => {
    expect(normalizeDisplay(42)).toBeUndefined();
    expect(normalizeDisplay(null)).toBeUndefined();
  });
});

describe('normalizeFloat', () => {
  it('returns valid float values', () => {
    expect(normalizeFloat('left')).toBe('left');
    expect(normalizeFloat('right')).toBe('right');
    expect(normalizeFloat('none')).toBe('none');
    expect(normalizeFloat('inline-start')).toBe('inline-start');
  });

  it('returns undefined for invalid values', () => {
    expect(normalizeFloat('center')).toBeUndefined();
    expect(normalizeFloat(123)).toBeUndefined();
  });
});

describe('normalizeClear', () => {
  it('returns valid clear values', () => {
    expect(normalizeClear('both')).toBe('both');
    expect(normalizeClear('left')).toBe('left');
    expect(normalizeClear('none')).toBe('none');
  });

  it('returns undefined for invalid values', () => {
    expect(normalizeClear('auto')).toBeUndefined();
  });
});

describe('buildDisplayStyles', () => {
  it('builds display only', () => {
    expect(buildDisplayStyles({ display: 'grid' })).toEqual({ display: 'grid' });
  });

  it('builds full config', () => {
    expect(buildDisplayStyles({
      display: 'block',
      float: 'left',
      clear: 'both',
      verticalAlign: 'middle',
    })).toEqual({
      display: 'block',
      float: 'left',
      clear: 'both',
      'vertical-align': 'middle',
    });
  });

  it('omits invalid float/clear', () => {
    const result = buildDisplayStyles({ display: 'flex', float: 'center' as any });
    expect(result).not.toHaveProperty('float');
  });

  it('returns empty object for empty config', () => {
    expect(buildDisplayStyles({})).toEqual({});
  });
});

describe('displayToCSS', () => {
  it('serializes to CSS string', () => {
    const css = displayToCSS({ display: 'flex', float: 'left' });
    expect(css).toContain('display: flex;');
    expect(css).toContain('float: left;');
  });

  it('returns empty string for empty config', () => {
    expect(displayToCSS({})).toBe('');
  });
});
