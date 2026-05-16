import {
  normalizeScrollBehavior,
  normalizeSnapType,
  buildScrollStyles,
  scrollToCSS,
} from './scroll';

describe('normalizeScrollBehavior', () => {
  it('returns valid behavior values unchanged', () => {
    expect(normalizeScrollBehavior('smooth')).toBe('smooth');
    expect(normalizeScrollBehavior('instant')).toBe('instant');
    expect(normalizeScrollBehavior('auto')).toBe('auto');
  });

  it('falls back to auto for invalid values', () => {
    expect(normalizeScrollBehavior('fast')).toBe('auto');
    expect(normalizeScrollBehavior(42)).toBe('auto');
    expect(normalizeScrollBehavior(null)).toBe('auto');
  });
});

describe('normalizeSnapType', () => {
  it('returns none for none type', () => {
    expect(normalizeSnapType('none')).toBe('none');
  });

  it('combines axis with default proximity strictness', () => {
    expect(normalizeSnapType('x')).toBe('x proximity');
    expect(normalizeSnapType('y')).toBe('y proximity');
    expect(normalizeSnapType('both')).toBe('both proximity');
  });

  it('combines axis with explicit strictness', () => {
    expect(normalizeSnapType('x', 'mandatory')).toBe('x mandatory');
    expect(normalizeSnapType('inline', 'mandatory')).toBe('inline mandatory');
  });
});

describe('buildScrollStyles', () => {
  it('builds behavior style', () => {
    const result = buildScrollStyles({ behavior: 'smooth' });
    expect(result['scroll-behavior']).toBe('smooth');
  });

  it('builds snap type with strictness', () => {
    const result = buildScrollStyles({
      snapType: 'y',
      snapStrictness: 'mandatory',
    });
    expect(result['scroll-snap-type']).toBe('y mandatory');
  });

  it('builds snap align', () => {
    const result = buildScrollStyles({ snapAlign: 'start' });
    expect(result['scroll-snap-align']).toBe('start');
  });

  it('builds overscroll behavior', () => {
    const result = buildScrollStyles({ overscroll: 'contain' });
    expect(result['overscroll-behavior']).toBe('contain');
  });

  it('builds directional overscroll', () => {
    const result = buildScrollStyles({ overscrollX: 'none', overscrollY: 'auto' });
    expect(result['overscroll-behavior-x']).toBe('none');
    expect(result['overscroll-behavior-y']).toBe('auto');
  });

  it('returns empty object for empty config', () => {
    expect(buildScrollStyles({})).toEqual({});
  });

  it('handles snap stop', () => {
    const result = buildScrollStyles({ snapStop: 'always' });
    expect(result['scroll-snap-stop']).toBe('always');
  });
});

describe('scrollToCSS', () => {
  it('produces valid CSS string', () => {
    const css = scrollToCSS({ behavior: 'smooth', snapType: 'y', snapStrictness: 'mandatory' });
    expect(css).toContain('scroll-behavior: smooth;');
    expect(css).toContain('scroll-snap-type: y mandatory;');
  });

  it('returns empty string for empty config', () => {
    expect(scrollToCSS({})).toBe('');
  });
});
