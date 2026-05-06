import { resolveColSpan, resolveRowSpan, buildSpanStyles } from './span';

describe('resolveColSpan', () => {
  it('returns "1 / -1" for "full"', () => {
    expect(resolveColSpan('full')).toBe('1 / -1');
  });

  it('returns span notation for positive integer', () => {
    expect(resolveColSpan(3)).toBe('span 3');
    expect(resolveColSpan(1)).toBe('span 1');
  });

  it('throws for zero colSpan', () => {
    expect(() => resolveColSpan(0)).toThrow(RangeError);
  });

  it('throws for negative colSpan', () => {
    expect(() => resolveColSpan(-2)).toThrow(RangeError);
  });

  it('throws for non-integer colSpan', () => {
    expect(() => resolveColSpan(1.5 as any)).toThrow(RangeError);
  });
});

describe('resolveRowSpan', () => {
  it('returns span notation for positive integer', () => {
    expect(resolveRowSpan(2)).toBe('span 2');
  });

  it('throws for zero rowSpan', () => {
    expect(() => resolveRowSpan(0)).toThrow(RangeError);
  });

  it('throws for negative rowSpan', () => {
    expect(() => resolveRowSpan(-1)).toThrow(RangeError);
  });

  it('throws for non-integer rowSpan', () => {
    expect(() => resolveRowSpan(2.5 as any)).toThrow(RangeError);
  });
});

describe('buildSpanStyles', () => {
  it('returns empty object with no options', () => {
    expect(buildSpanStyles({})).toEqual({});
  });

  it('sets grid-column for colSpan only', () => {
    expect(buildSpanStyles({ colSpan: 2 })).toEqual({
      'grid-column': 'span 2',
    });
  });

  it('sets grid-column to 1 / -1 for full colSpan', () => {
    expect(buildSpanStyles({ colSpan: 'full' })).toEqual({
      'grid-column': '1 / -1',
    });
  });

  it('sets grid-column with colStart and colSpan', () => {
    expect(buildSpanStyles({ colSpan: 3, colStart: 2 })).toEqual({
      'grid-column': '2 / span 3',
    });
  });

  it('sets grid-column-start when only colStart provided', () => {
    expect(buildSpanStyles({ colStart: 3 })).toEqual({
      'grid-column-start': '3',
    });
  });

  it('sets grid-row for rowSpan only', () => {
    expect(buildSpanStyles({ rowSpan: 2 })).toEqual({
      'grid-row': 'span 2',
    });
  });

  it('sets grid-row with rowStart and rowSpan', () => {
    expect(buildSpanStyles({ rowSpan: 2, rowStart: 1 })).toEqual({
      'grid-row': '1 / span 2',
    });
  });

  it('sets grid-row-start when only rowStart provided', () => {
    expect(buildSpanStyles({ rowStart: 2 })).toEqual({
      'grid-row-start': '2',
    });
  });

  it('handles colSpan and rowSpan together', () => {
    const result = buildSpanStyles({ colSpan: 4, rowSpan: 2 });
    expect(result['grid-column']).toBe('span 4');
    expect(result['grid-row']).toBe('span 2');
  });
});
