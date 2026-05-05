import {
  DEFAULT_BREAKPOINTS,
  mediaQueryMin,
  mediaQueryRange,
  sortedBreakpointKeys,
  mergeBreakpoints,
} from './breakpoints';

describe('mediaQueryMin', () => {
  it('returns correct min-width query for sm', () => {
    expect(mediaQueryMin('sm')).toBe('@media (min-width: 480px)');
  });

  it('returns correct min-width query for 2xl', () => {
    expect(mediaQueryMin('2xl')).toBe('@media (min-width: 1536px)');
  });

  it('throws for unknown breakpoint key', () => {
    expect(() => mediaQueryMin('xxl' as any)).toThrow('Unknown breakpoint key: "xxl"');
  });
});

describe('mediaQueryRange', () => {
  it('returns ranged query for md', () => {
    expect(mediaQueryRange('md')).toBe(
      '@media (min-width: 768px) and (max-width: 1023px)'
    );
  });

  it('returns min-only query for 2xl (no max)', () => {
    expect(mediaQueryRange('2xl')).toBe('@media (min-width: 1536px)');
  });

  it('throws for unknown breakpoint key', () => {
    expect(() => mediaQueryRange('tiny' as any)).toThrow('Unknown breakpoint key: "tiny"');
  });
});

describe('sortedBreakpointKeys', () => {
  it('returns keys sorted by min value ascending', () => {
    const keys = sortedBreakpointKeys();
    expect(keys).toEqual(['xs', 'sm', 'md', 'lg', 'xl', '2xl']);
  });

  it('handles custom breakpoint maps', () => {
    const custom = {
      large: { min: 1000 },
      small: { min: 200, max: 999 },
    } as any;
    const keys = sortedBreakpointKeys(custom);
    expect(keys).toEqual(['small', 'large']);
  });
});

describe('mergeBreakpoints', () => {
  it('overrides a default breakpoint', () => {
    const merged = mergeBreakpoints({ sm: { min: 500, max: 799 } });
    expect(merged.sm).toEqual({ min: 500, max: 799 });
    expect(merged.md).toEqual(DEFAULT_BREAKPOINTS.md);
  });

  it('adds a new breakpoint key', () => {
    const merged = mergeBreakpoints({ '3xl': { min: 1920 } } as any);
    expect((merged as any)['3xl']).toEqual({ min: 1920 });
  });

  it('does not mutate the base map', () => {
    mergeBreakpoints({ xs: { min: 10, max: 399 } });
    expect(DEFAULT_BREAKPOINTS.xs.min).toBe(0);
  });
});
