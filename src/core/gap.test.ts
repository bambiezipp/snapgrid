import { normalizeGap, buildGapStyles, gapToCSS } from './gap';

describe('normalizeGap', () => {
  it('converts a number to a px string', () => {
    expect(normalizeGap(16)).toBe('16px');
    expect(normalizeGap(0)).toBe('0px');
  });

  it('passes through string values unchanged', () => {
    expect(normalizeGap('1rem')).toBe('1rem');
    expect(normalizeGap('2%')).toBe('2%');
    expect(normalizeGap('var(--gap)')).toBe('var(--gap)');
  });
});

describe('buildGapStyles', () => {
  it('uses shorthand gap when only gap is provided', () => {
    expect(buildGapStyles({ gap: 8 })).toEqual({ gap: '8px' });
  });

  it('uses individual properties when columnGap and rowGap are provided', () => {
    expect(buildGapStyles({ columnGap: '1rem', rowGap: '0.5rem' })).toEqual({
      'column-gap': '1rem',
      'row-gap': '0.5rem',
    });
  });

  it('fills missing individual value from gap fallback', () => {
    const result = buildGapStyles({ gap: 16, columnGap: '2rem' });
    expect(result['column-gap']).toBe('2rem');
    expect(result['row-gap']).toBe('16px');
  });

  it('ignores gap shorthand when both columnGap and rowGap are set', () => {
    const result = buildGapStyles({ gap: 8, columnGap: '1rem', rowGap: '2rem' });
    expect(result['column-gap']).toBe('1rem');
    expect(result['row-gap']).toBe('2rem');
    expect(result['gap']).toBeUndefined();
  });

  it('returns empty object for empty config', () => {
    expect(buildGapStyles({})).toEqual({});
  });
});

describe('gapToCSS', () => {
  it('serializes gap shorthand correctly', () => {
    expect(gapToCSS({ gap: 12 })).toBe('gap: 12px;');
  });

  it('serializes individual gap properties', () => {
    const css = gapToCSS({ columnGap: '1rem', rowGap: '0.5rem' });
    expect(css).toContain('column-gap: 1rem;');
    expect(css).toContain('row-gap: 0.5rem;');
  });

  it('returns empty string for empty config', () => {
    expect(gapToCSS({})).toBe('');
  });
});
