import { describe, it, expect } from 'vitest';
import {
  normalizeVisibility,
  buildVisibilityStyles,
  buildDisplayStyles,
} from './visibility';

describe('normalizeVisibility', () => {
  it('returns the value unchanged', () => {
    expect(normalizeVisibility('visible')).toBe('visible');
    expect(normalizeVisibility('hidden')).toBe('hidden');
    expect(normalizeVisibility('collapse')).toBe('collapse');
  });
});

describe('buildVisibilityStyles', () => {
  it('handles a plain visibility string', () => {
    const result = buildVisibilityStyles('hidden');
    expect(result).toBe('visibility: hidden;');
  });

  it('handles responsive object with breakpoints', () => {
    const breakpoints = { md: '768px' };
    const result = buildVisibilityStyles({ md: 'hidden' }, breakpoints);
    expect(result).toContain('@media');
    expect(result).toContain('768px');
    expect(result).toContain('visibility: hidden');
  });

  it('handles base (no matching breakpoint) key', () => {
    const result = buildVisibilityStyles({ base: 'visible' }, {});
    expect(result).toBe('visibility: visible;');
  });
});

describe('buildDisplayStyles', () => {
  it('returns display grid when true', () => {
    expect(buildDisplayStyles(true)).toBe('display: grid;');
  });

  it('returns display none when false', () => {
    expect(buildDisplayStyles(false)).toBe('display: none;');
  });

  it('handles responsive object', () => {
    const breakpoints = { sm: '640px', lg: '1024px' };
    const result = buildDisplayStyles({ sm: false, lg: true }, breakpoints);
    expect(result).toContain('640px');
    expect(result).toContain('display: none');
    expect(result).toContain('1024px');
    expect(result).toContain('display: grid');
  });

  it('handles undefined breakpoint key gracefully', () => {
    const result = buildDisplayStyles({ base: true }, {});
    expect(result).toBe('display: grid;');
  });
});
