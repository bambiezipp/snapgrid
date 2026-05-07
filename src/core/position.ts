/**
 * position.ts
 * Utilities for CSS position, top/right/bottom/left, and z-index snap points.
 */

export type PositionKeyword = 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';

export type OffsetValue = number | string;

export interface PositionConfig {
  position?: PositionKeyword;
  top?: OffsetValue;
  right?: OffsetValue;
  bottom?: OffsetValue;
  left?: OffsetValue;
  inset?: OffsetValue;
  zIndex?: number | 'auto';
}

export type PositionStyles = Record<string, string>;

const VALID_POSITIONS: PositionKeyword[] = ['static', 'relative', 'absolute', 'fixed', 'sticky'];

export function normalizePosition(value: unknown): PositionKeyword | undefined {
  if (typeof value === 'string' && VALID_POSITIONS.includes(value as PositionKeyword)) {
    return value as PositionKeyword;
  }
  return undefined;
}

export function toOffsetValue(value: OffsetValue): string {
  if (typeof value === 'number') {
    return value === 0 ? '0' : `${value}px`;
  }
  return String(value);
}

export function buildPositionStyles(config: PositionConfig): PositionStyles {
  const styles: PositionStyles = {};

  const pos = normalizePosition(config.position);
  if (pos) styles['position'] = pos;

  if (config.inset !== undefined) {
    styles['inset'] = toOffsetValue(config.inset);
  } else {
    if (config.top !== undefined) styles['top'] = toOffsetValue(config.top);
    if (config.right !== undefined) styles['right'] = toOffsetValue(config.right);
    if (config.bottom !== undefined) styles['bottom'] = toOffsetValue(config.bottom);
    if (config.left !== undefined) styles['left'] = toOffsetValue(config.left);
  }

  if (config.zIndex !== undefined) {
    styles['z-index'] = String(config.zIndex);
  }

  return styles;
}

export function positionToCSS(config: PositionConfig, selector: string): string {
  const styles = buildPositionStyles(config);
  const declarations = Object.entries(styles)
    .map(([prop, val]) => `  ${prop}: ${val};`)
    .join('\n');
  return declarations ? `${selector} {\n${declarations}\n}` : '';
}
