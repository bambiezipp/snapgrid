import {
  normalizeMargin,
  buildMarginStyles,
  marginToCSS,
  MarginConfig,
} from './margin';

describe('normalizeMargin', () => {
  it('returns empty object for undefined', () => {
    expect(normalizeMargin(undefined)).toEqual({});
  });

  it('wraps a number into { all }', () => {
    expect(normalizeMargin(24)).toEqual({ all: 24 });
  });

  it('wraps a string into { all }', () => {
    expect(normalizeMargin('2rem')).toEqual({ all: '2rem' });
  });

  it('wraps "auto" into { all }', () => {
    expect(normalizeMargin('auto')).toEqual({ all: 'auto' });
  });

  it('passes through a MarginConfig object', () => {
    const cfg: MarginConfig = { x: 'auto', y: '0' };
    expect(normalizeMargin(cfg)).toEqual(cfg);
  });
});

describe('buildMarginStyles', () => {
  it('uses shorthand when all is set', () => {
    expect(buildMarginStyles({ all: '2rem' })).toEqual({ margin: '2rem' });
  });

  it('converts number 0 to "0"', () => {
    expect(buildMarginStyles({ all: 0 })).toEqual({ margin: '0' });
  });

  it('converts positive number to px string', () => {
    expect(buildMarginStyles({ all: 32 })).toEqual({ margin: '32px' });
  });

  it('handles auto value', () => {
    expect(buildMarginStyles({ x: 'auto' })).toEqual({
      'margin-left': 'auto',
      'margin-right': 'auto',
    });
  });

  it('applies x and y shorthand correctly', () => {
    const result = buildMarginStyles({ x: '16px', y: '8px' });
    expect(result['margin-left']).toBe('16px');
    expect(result['margin-right']).toBe('16px');
    expect(result['margin-top']).toBe('8px');
    expect(result['margin-bottom']).toBe('8px');
  });

  it('specific sides override x/y', () => {
    const result = buildMarginStyles({ x: '16px', left: '0' });
    expect(result['margin-left']).toBe('0');
    expect(result['margin-right']).toBe('16px');
  });

  it('handles partial config', () => {
    const result = buildMarginStyles({ top: '1rem' });
    expect(result).toEqual({ 'margin-top': '1rem' });
  });
});

describe('marginToCSS', () => {
  it('serializes shorthand margin', () => {
    expect(marginToCSS({ all: 'auto' })).toBe('margin: auto;');
  });

  it('serializes multiple properties', () => {
    const css = marginToCSS({ top: '4px', bottom: '8px' });
    expect(css).toContain('margin-top: 4px;');
    expect(css).toContain('margin-bottom: 8px;');
  });
});
