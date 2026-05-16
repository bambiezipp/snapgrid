import {
  normalizeObjectFit,
  normalizeObjectPosition,
  buildObjectFitStyles,
  objectFitToCSS,
} from './objectfit';

describe('normalizeObjectFit', () => {
  it('returns valid fit keywords unchanged', () => {
    expect(normalizeObjectFit('fill')).toBe('fill');
    expect(normalizeObjectFit('contain')).toBe('contain');
    expect(normalizeObjectFit('cover')).toBe('cover');
    expect(normalizeObjectFit('none')).toBe('none');
    expect(normalizeObjectFit('scale-down')).toBe('scale-down');
  });

  it('returns undefined for invalid values', () => {
    expect(normalizeObjectFit('stretch')).toBeUndefined();
    expect(normalizeObjectFit(42)).toBeUndefined();
    expect(normalizeObjectFit(null)).toBeUndefined();
    expect(normalizeObjectFit(undefined)).toBeUndefined();
  });
});

describe('normalizeObjectPosition', () => {
  it('returns string positions as-is', () => {
    expect(normalizeObjectPosition('center')).toBe('center');
    expect(normalizeObjectPosition('top right')).toBe('top right');
    expect(normalizeObjectPosition('50% 25%')).toBe('50% 25%');
  });

  it('converts numeric x/y object to px string', () => {
    expect(normalizeObjectPosition({ x: 10, y: 20 })).toBe('10px 20px');
  });

  it('handles string x/y object', () => {
    expect(normalizeObjectPosition({ x: '50%', y: '50%' })).toBe('50% 50%');
  });

  it('returns undefined for undefined input', () => {
    expect(normalizeObjectPosition(undefined)).toBeUndefined();
  });

  it('returns undefined for empty string', () => {
    expect(normalizeObjectPosition('')).toBeUndefined();
  });
});

describe('buildObjectFitStyles', () => {
  it('builds styles for fit only', () => {
    expect(buildObjectFitStyles({ fit: 'cover' })).toEqual({
      'object-fit': 'cover',
    });
  });

  it('builds styles for position only', () => {
    expect(buildObjectFitStyles({ position: 'center top' })).toEqual({
      'object-position': 'center top',
    });
  });

  it('builds combined styles', () => {
    expect(buildObjectFitStyles({ fit: 'contain', position: { x: 0, y: 0 } })).toEqual({
      'object-fit': 'contain',
      'object-position': '0px 0px',
    });
  });

  it('ignores invalid fit values', () => {
    expect(buildObjectFitStyles({ fit: 'invalid' as any })).toEqual({});
  });

  it('returns empty object for empty config', () => {
    expect(buildObjectFitStyles({})).toEqual({});
  });
});

describe('objectFitToCSS', () => {
  it('serializes to CSS string', () => {
    const result = objectFitToCSS({ fit: 'cover', position: 'center' });
    expect(result).toContain('object-fit: cover;');
    expect(result).toContain('object-position: center;');
  });

  it('returns empty string for empty config', () => {
    expect(objectFitToCSS({})).toBe('');
  });
});
