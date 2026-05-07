/**
 * zindex.ts — Utilities for z-index and stacking context management
 */

export type ZIndexValue = number | 'auto' | 'inherit' | 'initial' | 'unset';

export interface ZIndexConfig {
  zIndex?: ZIndexValue;
  isolate?: boolean;
  stackingContext?: boolean;
}

export interface ZIndexStyles {
  'z-index'?: string;
  isolation?: string;
  transform?: string;
}

const NAMED_Z_KEYWORDS = new Set(['auto', 'inherit', 'initial', 'unset']);

export function normalizeZIndex(value: ZIndexValue): string {
  if (typeof value === 'number') {
    if (!Number.isInteger(value)) {
      throw new RangeError(`z-index must be an integer, got: ${value}`);
    }
    return String(value);
  }
  if (NAMED_Z_KEYWORDS.has(value)) {
    return value;
  }
  throw new TypeError(`Invalid z-index value: "${value}"`);
}

export function buildZIndexStyles(config: ZIndexConfig): ZIndexStyles {
  const styles: ZIndexStyles = {};

  if (config.zIndex !== undefined) {
    styles['z-index'] = normalizeZIndex(config.zIndex);
  }

  if (config.isolate === true || config.stackingContext === true) {
    styles['isolation'] = 'isolate';
  }

  // Force stacking context via transform if isolation is not enough
  if (config.stackingContext === true && config.isolate !== true) {
    styles['transform'] = 'translateZ(0)';
  }

  return styles;
}

export function zIndexToCSS(styles: ZIndexStyles): string {
  return Object.entries(styles)
    .map(([prop, value]) => `${prop}: ${value};`)
    .join(' ');
}
