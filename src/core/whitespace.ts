/**
 * whitespace.ts
 * Utilities for controlling white-space, word-break, and text-overflow behavior.
 */

export type WhiteSpaceValue =
  | 'normal'
  | 'nowrap'
  | 'pre'
  | 'pre-wrap'
  | 'pre-line'
  | 'break-spaces';

export type WordBreakValue = 'normal' | 'break-all' | 'keep-all' | 'break-word';

export type TextOverflowValue = 'clip' | 'ellipsis' | string;

export interface WhitespaceConfig {
  whiteSpace?: WhiteSpaceValue;
  wordBreak?: WordBreakValue;
  textOverflow?: TextOverflowValue;
  /** Automatically sets overflow:hidden + nowrap when ellipsis is used */
  truncate?: boolean;
}

export interface WhitespaceStyles {
  'white-space'?: string;
  'word-break'?: string;
  'text-overflow'?: string;
  overflow?: string;
}

const VALID_WHITE_SPACE: WhiteSpaceValue[] = [
  'normal', 'nowrap', 'pre', 'pre-wrap', 'pre-line', 'break-spaces',
];

const VALID_WORD_BREAK: WordBreakValue[] = [
  'normal', 'break-all', 'keep-all', 'break-word',
];

export function normalizeWhiteSpace(value: unknown): WhiteSpaceValue | undefined {
  if (typeof value !== 'string') return undefined;
  const v = value.trim() as WhiteSpaceValue;
  return VALID_WHITE_SPACE.includes(v) ? v : undefined;
}

export function normalizeWordBreak(value: unknown): WordBreakValue | undefined {
  if (typeof value !== 'string') return undefined;
  const v = value.trim() as WordBreakValue;
  return VALID_WORD_BREAK.includes(v) ? v : undefined;
}

export function normalizeTextOverflow(value: unknown): TextOverflowValue | undefined {
  if (typeof value !== 'string') return undefined;
  const v = value.trim();
  return v.length > 0 ? v : undefined;
}

export function buildWhitespaceStyles(config: WhitespaceConfig): WhitespaceStyles {
  const styles: WhitespaceStyles = {};

  if (config.truncate) {
    styles['white-space'] = 'nowrap';
    styles['text-overflow'] = 'ellipsis';
    styles['overflow'] = 'hidden';
    return styles;
  }

  const ws = normalizeWhiteSpace(config.whiteSpace);
  if (ws) styles['white-space'] = ws;

  const wb = normalizeWordBreak(config.wordBreak);
  if (wb) styles['word-break'] = wb;

  const to = normalizeTextOverflow(config.textOverflow);
  if (to) {
    styles['text-overflow'] = to;
    if (!styles['overflow']) styles['overflow'] = 'hidden';
  }

  return styles;
}

export function whitespaceToCSS(config: WhitespaceConfig): string {
  const styles = buildWhitespaceStyles(config);
  return Object.entries(styles)
    .map(([k, v]) => `${k}: ${v};`)
    .join(' ');
}
