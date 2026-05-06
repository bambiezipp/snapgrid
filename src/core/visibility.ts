/**
 * visibility.ts
 * Utilities for responsive show/hide of grid items via CSS.
 */

import { mediaQueryMin } from './breakpoints';
import type { BreakpointMap } from './breakpoints';

export type VisibilityValue = 'visible' | 'hidden' | 'collapse';
export type ResponsiveVisibility = VisibilityValue | Partial<Record<string, VisibilityValue>>;

export function normalizeVisibility(value: VisibilityValue): string {
  return value;
}

export function buildVisibilityStyles(
  visibility: ResponsiveVisibility,
  breakpoints: BreakpointMap = {}
): string {
  if (typeof visibility === 'string') {
    return `visibility: ${normalizeVisibility(visibility)};`;
  }

  const lines: string[] = [];

  for (const [bp, val] of Object.entries(visibility)) {
    if (!val) continue;
    const bpValue = breakpoints[bp];
    if (bpValue) {
      lines.push(
        `${mediaQueryMin(bpValue)} {\n  visibility: ${normalizeVisibility(val)};\n}`
      );
    } else {
      lines.push(`visibility: ${normalizeVisibility(val)};`);
    }
  }

  return lines.join('\n');
}

export function buildDisplayStyles(
  show: boolean | Partial<Record<string, boolean>>,
  breakpoints: BreakpointMap = {}
): string {
  if (typeof show === 'boolean') {
    return `display: ${show ? 'grid' : 'none'};`;
  }

  const lines: string[] = [];

  for (const [bp, val] of Object.entries(show)) {
    if (val === undefined) continue;
    const bpValue = breakpoints[bp];
    const displayVal = val ? 'grid' : 'none';
    if (bpValue) {
      lines.push(
        `${mediaQueryMin(bpValue)} {\n  display: ${displayVal};\n}`
      );
    } else {
      lines.push(`display: ${displayVal};`);
    }
  }

  return lines.join('\n');
}
