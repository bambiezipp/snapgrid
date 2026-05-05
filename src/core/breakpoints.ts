/**
 * Breakpoint definitions and utilities for snapgrid.
 * Provides standard responsive breakpoints and helpers to
 * generate media query strings from breakpoint configs.
 */

export type BreakpointKey = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export interface Breakpoint {
  min: number;
  max?: number;
}

export type BreakpointMap = Record<BreakpointKey, Breakpoint>;

export const DEFAULT_BREAKPOINTS: BreakpointMap = {
  xs:  { min: 0,    max: 479 },
  sm:  { min: 480,  max: 767 },
  md:  { min: 768,  max: 1023 },
  lg:  { min: 1024, max: 1279 },
  xl:  { min: 1280, max: 1535 },
  '2xl': { min: 1536 },
};

/**
 * Returns a min-width media query string for the given breakpoint key.
 */
export function mediaQueryMin(key: BreakpointKey, breakpoints: BreakpointMap = DEFAULT_BREAKPOINTS): string {
  const bp = breakpoints[key];
  if (!bp) throw new Error(`Unknown breakpoint key: "${key}"`);
  return `@media (min-width: ${bp.min}px)`;
}

/**
 * Returns a ranged media query string (min and max) for the given breakpoint key.
 * If the breakpoint has no max, falls back to a min-only query.
 */
export function mediaQueryRange(key: BreakpointKey, breakpoints: BreakpointMap = DEFAULT_BREAKPOINTS): string {
  const bp = breakpoints[key];
  if (!bp) throw new Error(`Unknown breakpoint key: "${key}"`);
  if (bp.max === undefined) return `@media (min-width: ${bp.min}px)`;
  return `@media (min-width: ${bp.min}px) and (max-width: ${bp.max}px)`;
}

/**
 * Resolves an ordered list of breakpoint keys from smallest to largest min value.
 */
export function sortedBreakpointKeys(breakpoints: BreakpointMap = DEFAULT_BREAKPOINTS): BreakpointKey[] {
  return (Object.keys(breakpoints) as BreakpointKey[]).sort(
    (a, b) => breakpoints[a].min - breakpoints[b].min
  );
}

/**
 * Merges a partial custom breakpoint map over the defaults.
 */
export function mergeBreakpoints(
  custom: Partial<BreakpointMap>,
  base: BreakpointMap = DEFAULT_BREAKPOINTS
): BreakpointMap {
  return { ...base, ...custom };
}
