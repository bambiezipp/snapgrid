import { normalizeOutline, buildOutlineStyles, outlineToCSS } from './outline';

describe('normalizeOutline', () => {
  it('returns none style for "none" string', () => {
    expect(normalizeOutline('none')).toEqual({ style: 'none' });
  });

  it('treats a color string as shorthand', () => {
    expect(normalizeOutline('#ff0000')).toEqual({
      width: '2px',
      style: 'solid',
      color: '#ff0000',
    });
  });

  it('passes through an OutlineConfig object unchanged', () => {
    const config = { width: '3px', style: 'dashed' as const, color: 'blue', offset: '2px' };
    expect(normalizeOutline(config)).toEqual(config);
  });
});

describe('buildOutlineStyles', () => {
  it('returns outline: none when style is none', () => {
    expect(buildOutlineStyles({ style: 'none' })).toEqual({ outline: 'none' });
  });

  it('builds full outline shorthand', () => {
    const result = buildOutlineStyles({ width: '2px', style: 'solid', color: 'blue' });
    expect(result).toEqual({ outline: '2px solid blue' });
  });

  it('includes outlineOffset when offset is provided', () => {
    const result = buildOutlineStyles({ width: 2, style: 'dotted', offset: 4 });
    expect(result['outlineOffset']).toBe('4px');
    expect(result['outline']).toBe('2px dotted');
  });

  it('handles numeric width', () => {
    const result = buildOutlineStyles({ width: 3, style: 'solid', color: 'red' });
    expect(result['outline']).toBe('3px solid red');
  });

  it('handles partial config with only color', () => {
    const result = buildOutlineStyles({ color: 'green' });
    expect(result['outline']).toBe('green');
  });

  it('returns empty object for empty config', () => {
    expect(buildOutlineStyles({})).toEqual({});
  });
});

describe('outlineToCSS', () => {
  it('handles none shorthand', () => {
    expect(outlineToCSS('none')).toEqual({ outline: 'none' });
  });

  it('handles color string shorthand', () => {
    const result = outlineToCSS('currentColor');
    expect(result['outline']).toBe('2px solid currentColor');
  });

  it('handles full config object', () => {
    const result = outlineToCSS({ width: '1px', style: 'dashed', color: '#333', offset: '3px' });
    expect(result['outline']).toBe('1px dashed #333');
    expect(result['outlineOffset']).toBe('3px');
  });
});
