import { buildGridStyles, buildSnapCSS, GridConfig } from './grid';

describe('buildGridStyles', () => {
  it('should build styles with explicit columns', () => {
    const config: GridConfig = { columns: 3, gap: 16 };
    const styles = buildGridStyles(config);
    expect(styles.display).toBe('grid');
    expect(styles.gridTemplateColumns).toBe('repeat(3, minmax(0, 1fr))');
    expect(styles.gap).toBe('16px');
  });

  it('should use auto-fit when no columns specified', () => {
    const config: GridConfig = { minColumnWidth: '200px' };
    const styles = buildGridStyles(config);
    expect(styles.gridTemplateColumns).toBe('repeat(auto-fit, minmax(200px, 1fr))');
  });

  it('should handle string gap values', () => {
    const config: GridConfig = { columns: 2, gap: '1rem' };
    const styles = buildGridStyles(config);
    expect(styles.gap).toBe('1rem');
  });

  it('should support separate rowGap and columnGap', () => {
    const config: GridConfig = { columns: 4, rowGap: 8, columnGap: '1.5rem' };
    const styles = buildGridStyles(config);
    expect(styles.rowGap).toBe('8px');
    expect(styles.columnGap).toBe('1.5rem');
    expect(styles.gap).toBeUndefined();
  });

  it('should use custom maxColumnWidth', () => {
    const config: GridConfig = { columns: 2, minColumnWidth: '100px', maxColumnWidth: '300px' };
    const styles = buildGridStyles(config);
    expect(styles.gridTemplateColumns).toBe('repeat(2, minmax(100px, 300px))');
  });
});

describe('buildSnapCSS', () => {
  it('should generate base CSS with no snap points', () => {
    const config: GridConfig = { columns: 1, gap: 8 };
    const css = buildSnapCSS(config, '.grid');
    expect(css).toContain('.grid {');
    expect(css).toContain('display: grid;');
    expect(css).not.toContain('@media');
  });

  it('should generate media queries for snap points', () => {
    const config: GridConfig = {
      columns: 1,
      gap: 8,
      snapPoints: [{ breakpoint: 768, columns: 2 }, { breakpoint: 1024, columns: 3 }],
    };
    const css = buildSnapCSS(config, '.snap-grid');
    expect(css).toContain('@media (min-width: 768px)');
    expect(css).toContain('@media (min-width: 1024px)');
    expect(css).toContain('repeat(2, minmax(0, 1fr))');
    expect(css).toContain('repeat(3, minmax(0, 1fr))');
  });

  it('should sort snap points by breakpoint ascending', () => {
    const config: GridConfig = {
      columns: 1,
      snapPoints: [{ breakpoint: 1200, columns: 4 }, { breakpoint: 600, columns: 2 }],
    };
    const css = buildSnapCSS(config, '.grid');
    const idx600 = css.indexOf('600px');
    const idx1200 = css.indexOf('1200px');
    expect(idx600).toBeLessThan(idx1200);
  });
});
