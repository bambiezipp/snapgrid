import {
  normalizeListItemConfig,
  normalizeListPosition,
  normalizeListImage,
  buildListItemStyles,
  listItemToCSS,
} from './listitem';

describe('normalizeListItemConfig', () => {
  it('wraps a string type into a config object', () => {
    expect(normalizeListItemConfig('disc')).toEqual({ type: 'disc' });
  });

  it('returns an object config unchanged', () => {
    const config = { type: 'circle', position: 'inside' as const };
    expect(normalizeListItemConfig(config)).toEqual(config);
  });
});

describe('normalizeListPosition', () => {
  it('returns valid positions', () => {
    expect(normalizeListPosition('inside')).toBe('inside');
    expect(normalizeListPosition('outside')).toBe('outside');
  });

  it('is case-insensitive', () => {
    expect(normalizeListPosition('INSIDE')).toBe('inside');
  });

  it('returns undefined for invalid or missing values', () => {
    expect(normalizeListPosition(undefined)).toBeUndefined();
    expect(normalizeListPosition('center')).toBeUndefined();
  });
});

describe('normalizeListImage', () => {
  it('returns undefined for undefined input', () => {
    expect(normalizeListImage(undefined)).toBeUndefined();
  });

  it('returns "none" for null input', () => {
    expect(normalizeListImage(null)).toBe('none');
  });

  it('returns "none" for the string "none"', () => {
    expect(normalizeListImage('none')).toBe('none');
  });

  it('wraps a plain path in url()', () => {
    expect(normalizeListImage('/img/bullet.svg')).toBe('url("/img/bullet.svg")');
  });

  it('leaves an already-wrapped url() value unchanged', () => {
    expect(normalizeListImage('url(/img/bullet.svg)')).toBe('url(/img/bullet.svg)');
  });
});

describe('buildListItemStyles', () => {
  it('builds styles from a string shorthand', () => {
    expect(buildListItemStyles('decimal')).toEqual({ 'list-style-type': 'decimal' });
  });

  it('builds full styles from a config object', () => {
    expect(
      buildListItemStyles({ type: 'square', position: 'inside', image: null })
    ).toEqual({
      'list-style-type': 'square',
      'list-style-position': 'inside',
      'list-style-image': 'none',
    });
  });

  it('omits undefined fields', () => {
    const result = buildListItemStyles({ type: 'none' });
    expect(result).not.toHaveProperty('list-style-position');
    expect(result).not.toHaveProperty('list-style-image');
  });

  it('handles image url wrapping', () => {
    const result = buildListItemStyles({ image: '/icons/star.png' });
    expect(result['list-style-image']).toBe('url("/icons/star.png")');
  });
});

describe('listItemToCSS', () => {
  it('serialises styles to a CSS string', () => {
    const css = listItemToCSS({ type: 'disc', position: 'outside' });
    expect(css).toContain('list-style-type: disc;');
    expect(css).toContain('list-style-position: outside;');
  });

  it('returns an empty string for an empty config', () => {
    expect(listItemToCSS({})).toBe('');
  });
});
