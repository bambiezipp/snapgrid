import {
  normalizePadding,
  buildPaddingStyles,
  paddingToCSS,
  PaddingConfig,
} from './padding';

describe('normalizePadding', () => {
  it('returns empty object for undefined', () => {
    expect(normalizePadding(undefined)).toEqual({});
  });

  it('wraps a number into { all }', () => {
    expect(normalizePadding(16)).toEqual({ all: 16 });
  });

  it('wraps a string into { all }', () => {
    expect(normalizePadding('1rem')).toEqual({ all: '1rem' });
  });

  it('passes through a PaddingConfig object', () => {
    const cfg: PaddingConfig = { x: '8px', top: '4px' };
    expect(normalizePadding(cfg)).toEqual(cfg);
  });
});

describe('buildPaddingStyles', () => {
  it('uses shorthand when all is set', () => {
    expect(buildPaddingStyles({ all: '1rem' })).toEqual({ padding: '1rem' });
  });

  it('converts number 0 to "0"', () => {
    expect(buildPaddingStyles({ all: 0 })).toEqual({ padding: '0' });
  });

  it('converts positive number to px string', () => {
    expect(buildPaddingStyles({ all: 16 })).toEqual({ padding: '16px' });
  });

  it('applies x and y shorthand correctly', () => {
    const result = buildPaddingStyles({ x: '8px', y: '4px' });
    expect(result['padding-left']).toBe('8px');
    expect(result['padding-right']).toBe('8px');
    expect(result['padding-top']).toBe('4px');
    expect(result['padding-bottom']).toBe('4px');
  });

  it('specific sides override x/y', () => {
    const result = buildPaddingStyles({ y: '4px', top: '12px' });
    expect(result['padding-top']).toBe('12px');
    expect(result['padding-bottom']).toBe('4px');
  });

  it('handles partial config', () => {
    const result = buildPaddingStyles({ left: '2rem' });
    expect(result).toEqual({ 'padding-left': '2rem' });
  });
});

describe('paddingToCSS', () => {
  it('serializes styles to CSS string', () => {
    const css = paddingToCSS({ all: '1rem' });
    expect(css).toBe('padding: 1rem;');
  });

  it('serializes multiple properties', () => {
    const css = paddingToCSS({ top: '4px', bottom: '8px' });
    expect(css).toContain('padding-top: 4px;');
    expect(css).toContain('padding-bottom: 8px;');
  });
});
