import {
  toTypographyValue,
  normalizeFontWeight,
  buildTypographyStyles,
  typographyToCSS,
} from './typography';

describe('toTypographyValue', () => {
  it('converts number to px string', () => {
    expect(toTypographyValue(16)).toBe('16px');
    expect(toTypographyValue(0)).toBe('0px');
  });

  it('returns string values unchanged', () => {
    expect(toTypographyValue('1.5rem')).toBe('1.5rem');
    expect(toTypographyValue('normal')).toBe('normal');
  });
});

describe('normalizeFontWeight', () => {
  it('handles keyword values', () => {
    expect(normalizeFontWeight('bold')).toBe('bold');
    expect(normalizeFontWeight('normal')).toBe('normal');
    expect(normalizeFontWeight('lighter')).toBe('lighter');
  });

  it('handles numeric values', () => {
    expect(normalizeFontWeight(400)).toBe('400');
    expect(normalizeFontWeight(700)).toBe('700');
  });

  it('throws on out-of-range numeric weight', () => {
    expect(() => normalizeFontWeight(0)).toThrow();
    expect(() => normalizeFontWeight(1001)).toThrow();
  });

  it('returns empty string for undefined', () => {
    expect(normalizeFontWeight(undefined)).toBe('');
  });
});

describe('buildTypographyStyles', () => {
  it('returns empty object for empty options', () => {
    expect(buildTypographyStyles({})).toEqual({});
  });

  it('builds font-size and line-height', () => {
    const styles = buildTypographyStyles({ fontSize: 16, lineHeight: '1.5' });
    expect(styles['font-size']).toBe('16px');
    expect(styles['line-height']).toBe('1.5');
  });

  it('builds text-align and font-weight', () => {
    const styles = buildTypographyStyles({ textAlign: 'center', fontWeight: 'bold' });
    expect(styles['text-align']).toBe('center');
    expect(styles['font-weight']).toBe('bold');
  });

  it('adds truncation styles when truncate is true', () => {
    const styles = buildTypographyStyles({ truncate: true });
    expect(styles['overflow']).toBe('hidden');
    expect(styles['text-overflow']).toBe('ellipsis');
    expect(styles['white-space']).toBe('nowrap');
  });

  it('builds letter-spacing and text-transform', () => {
    const styles = buildTypographyStyles({ letterSpacing: '0.05em', textTransform: 'uppercase' });
    expect(styles['letter-spacing']).toBe('0.05em');
    expect(styles['text-transform']).toBe('uppercase');
  });
});

describe('typographyToCSS', () => {
  it('serializes styles to CSS string', () => {
    const css = typographyToCSS({ 'font-size': '16px', 'text-align': 'center' });
    expect(css).toBe('font-size: 16px; text-align: center;');
  });

  it('returns empty string for empty styles', () => {
    expect(typographyToCSS({})).toBe('');
  });
});
