/**
 * pointerevents.ts
 * Utilities for controlling pointer-events and user-select CSS properties.
 */

export type PointerEventsValue = 'auto' | 'none' | 'all' | 'inherit';
export type UserSelectValue = 'auto' | 'none' | 'text' | 'all' | 'contain';

export interface PointerConfig {
  pointerEvents?: PointerEventsValue;
  userSelect?: UserSelectValue;
  touchAction?: string;
}

const VALID_POINTER_EVENTS: PointerEventsValue[] = ['auto', 'none', 'all', 'inherit'];
const VALID_USER_SELECT: UserSelectValue[] = ['auto', 'none', 'text', 'all', 'contain'];

export function normalizePointerEvents(value: unknown): PointerEventsValue {
  if (typeof value === 'string' && VALID_POINTER_EVENTS.includes(value as PointerEventsValue)) {
    return value as PointerEventsValue;
  }
  return 'auto';
}

export function normalizeUserSelect(value: unknown): UserSelectValue {
  if (typeof value === 'string' && VALID_USER_SELECT.includes(value as UserSelectValue)) {
    return value as UserSelectValue;
  }
  return 'auto';
}

export function normalizeTouchAction(value: unknown): string {
  if (typeof value === 'string' && value.trim().length > 0) {
    return value.trim();
  }
  return 'auto';
}

export function buildPointerStyles(config: PointerConfig): Record<string, string> {
  const styles: Record<string, string> = {};

  if (config.pointerEvents !== undefined) {
    styles['pointer-events'] = normalizePointerEvents(config.pointerEvents);
  }

  if (config.userSelect !== undefined) {
    const sel = normalizeUserSelect(config.userSelect);
    styles['user-select'] = sel;
    styles['-webkit-user-select'] = sel;
  }

  if (config.touchAction !== undefined) {
    styles['touch-action'] = normalizeTouchAction(config.touchAction);
  }

  return styles;
}

export function pointerToCSS(config: PointerConfig): string {
  const styles = buildPointerStyles(config);
  return Object.entries(styles)
    .map(([prop, val]) => `${prop}: ${val};`)
    .join(' ');
}
