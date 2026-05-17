import {
  normalizeAppearance,
  normalizeCaretColor,
  normalizeAccentColor,
  buildAppearanceStyles,
  appearanceToCSS,
} from './appearance';

describe('normalizeAppearance', () => {
  it('returns "auto" when no value provided', () => {
    expect(normalizeAppearance(undefined)).toBe('auto');
  });

  it('returns valid appearance values unchanged', () => {
    expect(normalizeAppearance('none')).toBe('none');
    expect(normalizeAppearance('auto')).toBe('auto');
    expect(normalizeAppearance('menulist-button')).toBe('menulist-button');
    expect(normalizeAppearance('textfield')).toBe('textfield');
  });

  it('throws on invalid appearance value', () => {
    expect(() => normalizeAppearance('invalid' as any)).toThrow(
      'Invalid appearance value: "invalid"'
    );
  });
});

describe('normalizeCaretColor', () => {
  it('returns "auto" when no value provided', () => {
    expect(normalizeCaretColor(undefined)).toBe('auto');
  });

  it('returns trimmed color string', () => {
    expect(normalizeCaretColor('  #ff0000  ')).toBe('#ff0000');
    expect(normalizeCaretColor('transparent')).toBe('transparent');
    expect(normalizeCaretColor('blue')).toBe('blue');
  });
});

describe('normalizeAccentColor', () => {
  it('returns "auto" when no value provided', () => {
    expect(normalizeAccentColor(undefined)).toBe('auto');
  });

  it('returns trimmed color string', () => {
    expect(normalizeAccentColor('  rebeccapurple  ')).toBe('rebeccapurple');
    expect(normalizeAccentColor('auto')).toBe('auto');
  });
});

describe('buildAppearanceStyles', () => {
  it('returns empty object for empty config', () => {
    expect(buildAppearanceStyles({})).toEqual({});
  });

  it('includes webkit prefix for appearance', () => {
    const styles = buildAppearanceStyles({ appearance: 'none' });
    expect(styles['appearance']).toBe('none');
    expect(styles['-webkit-appearance']).toBe('none');
  });

  it('builds caret-color style', () => {
    const styles = buildAppearanceStyles({ caretColor: '#333' });
    expect(styles['caret-color']).toBe('#333');
  });

  it('builds accent-color style', () => {
    const styles = buildAppearanceStyles({ accentColor: 'teal' });
    expect(styles['accent-color']).toBe('teal');
  });

  it('builds all styles together', () => {
    const styles = buildAppearanceStyles({
      appearance: 'none',
      caretColor: 'blue',
      accentColor: 'green',
    });
    expect(Object.keys(styles)).toHaveLength(4);
  });
});

describe('appearanceToCSS', () => {
  it('returns empty string for empty config', () => {
    expect(appearanceToCSS('.el', {})).toBe('');
  });

  it('generates valid CSS block', () => {
    const css = appearanceToCSS('.input', { appearance: 'none', caretColor: 'red' });
    expect(css).toContain('.input {');
    expect(css).toContain('appearance: none;');
    expect(css).toContain('-webkit-appearance: none;');
    expect(css).toContain('caret-color: red;');
  });
});
