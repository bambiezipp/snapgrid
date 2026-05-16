import {
  normalizeContentValue,
  normalizeQuotes,
  buildContentStyles,
  contentToCSS,
} from './content';

describe('normalizeContentValue', () => {
  it('returns keyword values as-is', () => {
    expect(normalizeContentValue('none')).toBe('none');
    expect(normalizeContentValue('normal')).toBe('normal');
    expect(normalizeContentValue('open-quote')).toBe('open-quote');
    expect(normalizeContentValue('close-quote')).toBe('close-quote');
  });

  it('wraps plain strings in double quotes', () => {
    expect(normalizeContentValue('hello')).toBe('"hello"');
    expect(normalizeContentValue('→')).toBe('"→"');
  });

  it('leaves already-quoted strings untouched', () => {
    expect(normalizeContentValue('"already"')).toBe('"already"');
    expect(normalizeContentValue("'single'")).toBe("'single'");
  });

  it('leaves CSS function values untouched', () => {
    expect(normalizeContentValue('url(icon.svg)')).toBe('url(icon.svg)');
    expect(normalizeContentValue('counter(section)')).toBe('counter(section)');
    expect(normalizeContentValue('attr(data-label)')).toBe('attr(data-label)');
  });
});

describe('normalizeQuotes', () => {
  it('returns undefined for undefined input', () => {
    expect(normalizeQuotes(undefined)).toBeUndefined();
  });

  it('returns string quotes as-is', () => {
    expect(normalizeQuotes('none')).toBe('none');
  });

  it('formats a 2-element tuple', () => {
    expect(normalizeQuotes(['«', '»'])).toBe('"«" "»"');
  });

  it('formats a 4-element tuple', () => {
    expect(normalizeQuotes(['"', '"', "'", "'"])).toBe('""" """ "\'" "\'"');
  });
});

describe('buildContentStyles', () => {
  it('returns empty object for empty config', () => {
    expect(buildContentStyles({})).toEqual({});
  });

  it('includes content when set', () => {
    expect(buildContentStyles({ content: 'none' })).toEqual({ content: 'none' });
    expect(buildContentStyles({ content: 'hello' })).toEqual({ content: '"hello"' });
  });

  it('includes quotes when set', () => {
    const result = buildContentStyles({ quotes: ['«', '»'] });
    expect(result['quotes']).toBe('"«" "»"');
  });

  it('includes counter-reset and counter-increment', () => {
    const result = buildContentStyles({
      counterReset: 'section 0',
      counterIncrement: 'section',
    });
    expect(result['counter-reset']).toBe('section 0');
    expect(result['counter-increment']).toBe('section');
  });

  it('builds full config correctly', () => {
    const result = buildContentStyles({
      content: 'open-quote',
      quotes: ['"', '"'],
      counterReset: 'item',
    });
    expect(result).toEqual({
      content: 'open-quote',
      quotes: '""" """',
      'counter-reset': 'item',
    });
  });
});

describe('contentToCSS', () => {
  it('serializes styles to CSS string', () => {
    const css = contentToCSS({ content: 'none' });
    expect(css).toBe('content: none;');
  });

  it('joins multiple declarations', () => {
    const css = contentToCSS({ content: 'open-quote', counterReset: 'section' });
    expect(css).toContain('content: open-quote;');
    expect(css).toContain('counter-reset: section;');
  });
});
