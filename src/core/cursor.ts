export type CursorKeyword =
  | 'auto'
  | 'default'
  | 'none'
  | 'pointer'
  | 'wait'
  | 'text'
  | 'move'
  | 'grab'
  | 'grabbing'
  | 'not-allowed'
  | 'crosshair'
  | 'zoom-in'
  | 'zoom-out'
  | 'col-resize'
  | 'row-resize'
  | 'ew-resize'
  | 'ns-resize';

export interface CursorConfig {
  cursor?: CursorKeyword | string;
  pointerEvents?: 'auto' | 'none';
  userSelect?: 'auto' | 'none' | 'text' | 'all';
  touchAction?: 'auto' | 'none' | 'pan-x' | 'pan-y' | 'manipulation';
}

export type CursorInput = CursorKeyword | string | CursorConfig;

const CURSOR_KEYWORDS: Set<string> = new Set([
  'auto', 'default', 'none', 'pointer', 'wait', 'text', 'move',
  'grab', 'grabbing', 'not-allowed', 'crosshair', 'zoom-in', 'zoom-out',
  'col-resize', 'row-resize', 'ew-resize', 'ns-resize',
]);

export function normalizeCursor(input: CursorInput): CursorConfig {
  if (typeof input === 'string') {
    return { cursor: input };
  }
  return input;
}

export function buildCursorStyles(input: CursorInput): Record<string, string> {
  const config = normalizeCursor(input);
  const styles: Record<string, string> = {};

  if (config.cursor !== undefined) {
    styles['cursor'] = config.cursor;
  }
  if (config.pointerEvents !== undefined) {
    styles['pointer-events'] = config.pointerEvents;
  }
  if (config.userSelect !== undefined) {
    styles['user-select'] = config.userSelect;
  }
  if (config.touchAction !== undefined) {
    styles['touch-action'] = config.touchAction;
  }

  return styles;
}

export function isValidCursorKeyword(value: string): value is CursorKeyword {
  return CURSOR_KEYWORDS.has(value);
}

export function cursorToCSS(styles: Record<string, string>): string {
  return Object.entries(styles)
    .map(([k, v]) => `${k}: ${v};`)
    .join(' ');
}
