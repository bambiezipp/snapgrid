/**
 * order.ts
 * Utilities for controlling CSS grid item order and z-index layering.
 */

import { resolveValue, resolveResponsiveConfig } from './responsive';
import { sortedBreakpointKeys } from './breakpoints';
import type { BreakpointMap } from './breakpoints';

export type OrderValue = number | 'first' | 'last' | 'none';
export type ResponsiveOrder = OrderValue | Partial<Record<string, OrderValue>>;

const ORDER_KEYWORDS: Record<string, number> = {
  first: -9999,
  last: 9999,
  none: 0,
};

export function normalizeOrder(value: OrderValue): number {
  if (typeof value === 'number') return value;
  return ORDER_KEYWORDS[value] ?? 0;
}

export function buildOrderStyles(
  order: ResponsiveOrder,
  breakpoints: BreakpointMap = {}
): Record<string, string> {
  const styles: Record<string, string> = {};

  if (typeof order === 'object' && !Array.isArray(order)) {
    const resolved = resolveResponsiveConfig(order as Partial<Record<string, OrderValue>>, breakpoints);
    for (const [key, val] of Object.entries(resolved)) {
      styles[key] = String(normalizeOrder(val as OrderValue));
    }
  } else {
    styles['order'] = String(normalizeOrder(order as OrderValue));
  }

  return styles;
}

export function buildZIndexStyles(
  zIndex: number | Partial<Record<string, number>>,
  breakpoints: BreakpointMap = {}
): Record<string, string> {
  const styles: Record<string, string> = {};

  if (typeof zIndex === 'object') {
    const keys = sortedBreakpointKeys(breakpoints);
    for (const bp of keys) {
      if (bp in zIndex) {
        styles[bp] = String(zIndex[bp]);
      }
    }
  } else {
    styles['z-index'] = String(zIndex);
  }

  return styles;
}

export function orderToCSS(styles: Record<string, string>, property = 'order'): string {
  return Object.entries(styles)
    .map(([, val]) => `${property}: ${val};`)
    .join('\n');
}
