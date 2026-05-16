import { describe, it, expect } from 'vitest';
import { buildClipStyles, normalizeClipPath } from './clip';
import { buildResponsiveCSS } from './responsive';
import { sortedBreakpointKeys } from './breakpoints';

const defaultBreakpoints = { sm: '640px', md: '768px', lg: '1024px' };

describe('clip integration', () => {
  it('composes with responsive breakpoints for keyword', () => {
    const responsive = {
      base: 'none' as const,
      md: { type: 'circle' as const, radius: '50%', at: 'center' },
    };

    const keys = sortedBreakpointKeys(defaultBreakpoints);
    const css = buildResponsiveCSS(
      responsive,
      (val) => Object.entries(buildClipStyles(val))
        .map(([, v]) => `clip-path: ${v};`)
        .join(''),
      defaultBreakpoints,
      keys
    );

    expect(css).toContain('clip-path: none;');
    expect(css).toContain('clip-path: circle(50% at center);');
    expect(css).toContain('@media');
  });

  it('polygon clip path produces valid CSS', () => {
    const style = buildClipStyles({
      type: 'polygon',
      fillRule: 'evenodd',
      points: ['0 0', '100% 0', '100% 75%', '75% 100%', '0 100%'],
    });
    expect(style.clipPath).toMatch(/^polygon\(evenodd,/);
    expect(style.clipPath).toContain('100% 75%');
  });

  it('inset with round produces valid CSS', () => {
    const val = normalizeClipPath({ type: 'inset', top: '10%', bottom: '10%', round: '50%' });
    expect(val).toBe('inset(10% 0px 10% 0px round 50%)');
  });

  it('ellipse defaults produce closest-side', () => {
    const val = normalizeClipPath({ type: 'ellipse' });
    expect(val).toBe('ellipse(closest-side closest-side)');
  });

  it('buildClipStyles returns correct key', () => {
    const styles = buildClipStyles({ type: 'circle', radius: 80 });
    expect(Object.keys(styles)).toEqual(['clipPath']);
    expect(styles.clipPath).toBe('circle(80px)');
  });
});
