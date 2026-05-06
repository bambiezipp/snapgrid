import {
  normalizeOpacity,
  normalizeBackdropBlur,
  buildColorStyles,
  colorToCSS,
} from './color';

describe('normalizeOpacity', () => {
  it('returns valid opacity values unchanged', () => {
    expect(normalizeOpacity(0)).toBe(0);
    expect(normalizeOpacity(1)).toBe(1);
    expect(normalizeOpacity(0.5)).toBe(0.5);
  });

  it('throws for values outside 0–1', () => {
    expect(() => normalizeOpacity(-0.1)).toThrow();
    expect(() => normalizeOpacity(1.1)).toThrow();
  });
});

describe('normalizeBackdropBlur', () => {
  it('wraps numeric values in blur() with px', () => {
    expect(normalizeBackdropBlur(8)).toBe('blur(8px)');
  });

  it('wraps string values in blur()', () => {
    expect(normalizeBackdropBlur('4px')).toBe('blur(4px)');
    expect(normalizeBackdropBlur('0.5rem')).toBe('blur(0.5rem)');
  });
});

describe('buildColorStyles', () => {
  it('returns empty object for empty options', () => {
    expect(buildColorStyles({})).toEqual({});
  });

  it('sets background and color', () => {
    const styles = buildColorStyles({ background: '#fff', color: '#000' });
    expect(styles['background']).toBe('#fff');
    expect(styles['color']).toBe('#000');
  });

  it('sets opacity', () => {
    const styles = buildColorStyles({ opacity: 0.75 });
    expect(styles['opacity']).toBe('0.75');
  });

  it('throws for invalid opacity', () => {
    expect(() => buildColorStyles({ opacity: 2 })).toThrow();
  });

  it('sets both backdrop-filter and -webkit-backdrop-filter', () => {
    const styles = buildColorStyles({ backdropBlur: 10 });
    expect(styles['backdrop-filter']).toBe('blur(10px)');
    expect(styles['-webkit-backdrop-filter']).toBe('blur(10px)');
  });

  it('handles all options together', () => {
    const styles = buildColorStyles({
      background: 'rgba(0,0,0,0.5)',
      color: 'white',
      opacity: 0.9,
      backdropBlur: '6px',
    });
    expect(Object.keys(styles)).toHaveLength(5);
  });
});

describe('colorToCSS', () => {
  it('serializes styles to a CSS string', () => {
    const css = colorToCSS({ background: '#fff', color: '#000' });
    expect(css).toBe('background: #fff; color: #000;');
  });

  it('returns empty string for empty styles', () => {
    expect(colorToCSS({})).toBe('');
  });
});
