import {
  normalizeWhiteSpace,
  normalizeWordBreak,
  normalizeTextOverflow,
  buildWhitespaceStyles,
  whitespaceToCSS,
} from './whitespace';

describe('normalizeWhiteSpace', () => {
  it('returns valid white-space values', () => {
    expect(normalizeWhiteSpace('nowrap')).toBe('nowrap');
    expect(normalizeWhiteSpace('pre-wrap')).toBe('pre-wrap');
    expect(normalizeWhiteSpace('break-spaces')).toBe('break-spaces');
  });

  it('returns undefined for invalid values', () => {
    expect(normalizeWhiteSpace('invalid')).toBeUndefined();
    expect(normalizeWhiteSpace(42)).toBeUndefined();
    expect(normalizeWhiteSpace(null)).toBeUndefined();
  });
});

describe('normalizeWordBreak', () => {
  it('returns valid word-break values', () => {
    expect(normalizeWordBreak('break-all')).toBe('break-all');
    expect(normalizeWordBreak('keep-all')).toBe('keep-all');
    expect(normalizeWordBreak('normal')).toBe('normal');
  });

  it('returns undefined for invalid values', () => {
    expect(normalizeWordBreak('wrap')).toBeUndefined();
    expect(normalizeWordBreak(undefined)).toBeUndefined();
  });
});

describe('normalizeTextOverflow', () => {
  it('returns ellipsis and clip', () => {
    expect(normalizeTextOverflow('ellipsis')).toBe('ellipsis');
    expect(normalizeTextOverflow('clip')).toBe('clip');
  });

  it('accepts custom string values', () => {
    expect(normalizeTextOverflow('"..."')).toBe('"..."');
  });

  it('returns undefined for non-strings or empty', () => {
    expect(normalizeTextOverflow('')).toBeUndefined();
    expect(normalizeTextOverflow(null)).toBeUndefined();
  });
});

describe('buildWhitespaceStyles', () => {
  it('builds styles from individual properties', () => {
    const result = buildWhitespaceStyles({ whiteSpace: 'nowrap', wordBreak: 'break-all' });
    expect(result['white-space']).toBe('nowrap');
    expect(result['word-break']).toBe('break-all');
  });

  it('adds overflow:hidden when textOverflow is set', () => {
    const result = buildWhitespaceStyles({ textOverflow: 'ellipsis' });
    expect(result['text-overflow']).toBe('ellipsis');
    expect(result['overflow']).toBe('hidden');
  });

  it('truncate shorthand overrides individual props', () => {
    const result = buildWhitespaceStyles({ truncate: true, whiteSpace: 'pre' });
    expect(result['white-space']).toBe('nowrap');
    expect(result['text-overflow']).toBe('ellipsis');
    expect(result['overflow']).toBe('hidden');
  });

  it('returns empty object for empty config', () => {
    expect(buildWhitespaceStyles({})).toEqual({});
  });
});

describe('whitespaceToCSS', () => {
  it('serializes styles to CSS string', () => {
    const css = whitespaceToCSS({ truncate: true });
    expect(css).toContain('white-space: nowrap;');
    expect(css).toContain('text-overflow: ellipsis;');
    expect(css).toContain('overflow: hidden;');
  });

  it('returns empty string for empty config', () => {
    expect(whitespaceToCSS({})).toBe('');
  });
});
