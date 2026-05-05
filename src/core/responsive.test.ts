import { resolveResponsiveConfig, buildResponsiveCSS } from './responsive';

describe('resolveResponsiveConfig', () => {
  it('returns a config entry per breakpoint', () => {
    const result = resolveResponsiveConfig({ columns: 12 });
    expect(result.length).toBeGreaterThan(0);
    result.forEach((entry) => {
      expect(entry).toHaveProperty('breakpoint');
      expect(entry).toHaveProperty('minWidth');
      expect(entry).toHaveProperty('columns');
    });
  });

  it('resolves scalar columns to all breakpoints', () => {
    const result = resolveResponsiveConfig({ columns: 6 });
    result.forEach((entry) => {
      expect(entry.columns).toBe(6);
    });
  });

  it('resolves per-breakpoint columns map', () => {
    const result = resolveResponsiveConfig({
      columns: { xs: 1, sm: 2, md: 4, lg: 8, xl: 12 },
    });
    const md = result.find((r) => r.breakpoint === 'md');
    expect(md?.columns).toBe(4);
  });

  it('falls back to default columns when breakpoint not in map', () => {
    const result = resolveResponsiveConfig({ columns: { xl: 10 } });
    const xs = result.find((r) => r.breakpoint === 'xs');
    expect(xs?.columns).toBe(12);
  });

  it('respects custom breakpoints', () => {
    const result = resolveResponsiveConfig(
      { columns: 3 },
      { mobile: 0, desktop: 1024 }
    );
    const keys = result.map((r) => r.breakpoint);
    expect(keys).toContain('mobile');
    expect(keys).toContain('desktop');
  });

  it('sorts breakpoints by minWidth ascending', () => {
    const result = resolveResponsiveConfig({ columns: 12 });
    const widths = result.map((r) => r.minWidth);
    const sorted = [...widths].sort((a, b) => a - b);
    expect(widths).toEqual(sorted);
  });
});

describe('buildResponsiveCSS', () => {
  it('returns a non-empty CSS string', () => {
    const css = buildResponsiveCSS({ columns: 12, gap: '1rem' });
    expect(typeof css).toBe('string');
    expect(css.length).toBeGreaterThan(0);
  });

  it('includes the selector', () => {
    const css = buildResponsiveCSS({ columns: 12 }, '.my-grid');
    expect(css).toContain('.my-grid');
  });

  it('includes media queries for non-zero breakpoints', () => {
    const css = buildResponsiveCSS({ columns: 12 });
    expect(css).toContain('@media');
  });

  it('does not wrap xs (minWidth=0) in a media query', () => {
    const css = buildResponsiveCSS({ columns: 12 }, '.snapgrid', { xs: 0 });
    const lines = css.split('\n');
    const firstBlock = lines.slice(0, lines.findIndex((l) => l === ''));
    expect(firstBlock.some((l) => l.startsWith('@media'))).toBe(false);
  });
});
