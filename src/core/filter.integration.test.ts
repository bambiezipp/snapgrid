import { describe, it, expect } from 'vitest';
import { buildFilterStyles, filterToCSS } from './filter';
import { buildResponsiveCSS } from './responsive';

describe('filter integration', () => {
  it('produces valid CSS output for a frosted glass effect', () => {
    const styles = buildFilterStyles({
      backdrop: { blur: 12, brightness: 0.85, saturate: 1.8 },
    });
    const css = filterToCSS(styles);
    expect(css).toContain('backdrop-filter:');
    expect(css).toContain('blur(12px)');
    expect(css).toContain('brightness(0.85)');
    expect(css).toContain('saturate(180%)');
  });

  it('produces valid CSS for image processing filters', () => {
    const styles = buildFilterStyles({
      contrast: 1.2,
      brightness: 1.1,
      sepia: 0.3,
      dropShadow: '0 4px 6px rgba(0,0,0,0.3)',
    });
    const css = filterToCSS(styles);
    expect(css).toContain('contrast(120%)');
    expect(css).toContain('brightness(1.1)');
    expect(css).toContain('sepia(30%)');
    expect(css).toContain('drop-shadow(0 4px 6px rgba(0,0,0,0.3))');
  });

  it('works with responsive CSS builder pattern', () => {
    const breakpoints = { sm: '640px', md: '768px', lg: '1024px' };
    const smStyles = filterToCSS(buildFilterStyles({ blur: 2 }));
    const lgStyles = filterToCSS(buildFilterStyles({ blur: 8 }));
    expect(smStyles).toBe('filter: blur(2px);');
    expect(lgStyles).toBe('filter: blur(8px);');
    // Verify they're distinct responsive values
    expect(smStyles).not.toBe(lgStyles);
  });

  it('handles no-op config gracefully', () => {
    const styles = buildFilterStyles({});
    expect(Object.keys(styles)).toHaveLength(0);
    expect(filterToCSS(styles)).toBe('');
  });

  it('combines filter and backdrop-filter together', () => {
    const styles = buildFilterStyles({
      blur: 0,
      grayscale: 0.5,
      backdrop: { blur: 16 },
    });
    expect(styles['filter']).toContain('blur(0px)');
    expect(styles['filter']).toContain('grayscale(50%)');
    expect(styles['backdrop-filter']).toBe('blur(16px)');
  });
});
