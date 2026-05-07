/**
 * Integration tests: position module used alongside responsive utilities.
 */
import { describe, it, expect } from 'vitest';
import { buildResponsiveCSS } from './responsive';
import { buildPositionStyles, PositionConfig } from './position';
import { mergeBreakpoints } from './breakpoints';

describe('position + responsive integration', () => {
  const breakpoints = mergeBreakpoints({}, { sm: 640, md: 768, lg: 1024 });

  it('generates responsive position classes at each breakpoint', () => {
    const configs: Record<string, PositionConfig> = {
      base: { position: 'relative' },
      md: { position: 'sticky', top: 0, zIndex: 10 },
      lg: { position: 'fixed', inset: 0, zIndex: 50 },
    };

    const blocks: string[] = [];

    for (const [bp, config] of Object.entries(configs)) {
      const styles = buildPositionStyles(config);
      const declarations = Object.entries(styles)
        .map(([p, v]) => `  ${p}: ${v};`)
        .join('\n');
      const rule = `.snap-pos {\n${declarations}\n}`;

      if (bp === 'base') {
        blocks.push(rule);
      } else {
        const minWidth = breakpoints[bp];
        blocks.push(`@media (min-width: ${minWidth}px) {\n${rule}\n}`);
      }
    }

    const css = blocks.join('\n');
    expect(css).toContain('position: relative;');
    expect(css).toContain('@media (min-width: 768px)');
    expect(css).toContain('position: sticky;');
    expect(css).toContain('top: 0;');
    expect(css).toContain('@media (min-width: 1024px)');
    expect(css).toContain('inset: 0;');
    expect(css).toContain('z-index: 50;');
  });

  it('does not emit inset when individual offsets are used', () => {
    const styles = buildPositionStyles({ top: 8, bottom: 8 });
    expect(styles['inset']).toBeUndefined();
    expect(styles['top']).toBe('8px');
    expect(styles['bottom']).toBe('8px');
  });

  it('inset overrides individual offsets', () => {
    const styles = buildPositionStyles({ inset: '0 auto', top: 10 });
    expect(styles['inset']).toBe('0 auto');
    expect(styles['top']).toBeUndefined();
  });
});
