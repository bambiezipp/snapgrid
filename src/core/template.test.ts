import {
  buildTemplateAreas,
  buildTemplateStyles,
  buildAreaPlacement,
  listAreaNames,
  validateAreaMap,
  templateToCSS,
} from './template';

describe('validateAreaMap', () => {
  it('returns false for empty map', () => {
    expect(validateAreaMap([])).toBe(false);
  });

  it('returns true for rectangular map', () => {
    expect(validateAreaMap([['a', 'b'], ['c', 'd']])).toBe(true);
  });

  it('returns false for jagged map', () => {
    expect(validateAreaMap([['a', 'b'], ['c']])).toBe(false);
  });
});

describe('buildTemplateAreas', () => {
  it('builds a single-row template', () => {
    const result = buildTemplateAreas([['header', 'header', 'header']]);
    expect(result).toBe('"header header header"');
  });

  it('builds a multi-row template', () => {
    const result = buildTemplateAreas([
      ['header', 'header'],
      ['sidebar', 'main'],
      ['footer', 'footer'],
    ]);
    expect(result).toBe('"header header" "sidebar main" "footer footer"');
  });

  it('supports dot notation for empty cells', () => {
    const result = buildTemplateAreas([['nav', '.'], ['nav', 'main']]);
    expect(result).toBe('"nav ." "nav main"');
  });

  it('throws on jagged area map', () => {
    expect(() => buildTemplateAreas([['a', 'b'], ['c']])).toThrow();
  });
});

describe('buildTemplateStyles', () => {
  it('returns object with gridTemplateAreas', () => {
    const styles = buildTemplateStyles([['a', 'b'], ['c', 'd']]);
    expect(styles).toEqual({ gridTemplateAreas: '"a b" "c d"' });
  });
});

describe('buildAreaPlacement', () => {
  it('returns gridArea with the given name', () => {
    expect(buildAreaPlacement('header')).toEqual({ gridArea: 'header' });
  });

  it('throws on empty string', () => {
    expect(() => buildAreaPlacement('')).toThrow();
  });
});

describe('listAreaNames', () => {
  it('returns unique area names excluding dots', () => {
    const names = listAreaNames([
      ['header', 'header'],
      ['sidebar', 'main'],
      ['footer', '.'],
    ]);
    expect(names.sort()).toEqual(['footer', 'header', 'main', 'sidebar']);
  });

  it('returns empty array for all-dot map', () => {
    expect(listAreaNames([['.', '.'], ['.', '.']])).toEqual([]);
  });
});

describe('templateToCSS', () => {
  it('serializes template styles to CSS string', () => {
    const css = templateToCSS({ gridTemplateAreas: '"a b" "c d"' });
    expect(css).toBe('grid-template-areas: "a b" "c d";');
  });
});
