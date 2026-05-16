/**
 * content.ts — CSS content & quotes utility for pseudo-elements
 */

export type ContentValue =
  | string
  | 'none'
  | 'normal'
  | 'open-quote'
  | 'close-quote'
  | 'no-open-quote'
  | 'no-close-quote';

export interface ContentConfig {
  content?: ContentValue;
  quotes?: string | [string, string] | [string, string, string, string];
  counterReset?: string;
  counterIncrement?: string;
}

const KEYWORD_VALUES = new Set([
  'none', 'normal', 'open-quote', 'close-quote',
  'no-open-quote', 'no-close-quote',
]);

export function normalizeContentValue(value: ContentValue): string {
  if (KEYWORD_VALUES.has(value)) return value;
  // If it's already quoted or a CSS function, return as-is
  if (/^["']/.test(value) || /^(url|counter|counters|attr)\(/.test(value)) {
    return value;
  }
  return `"${value}"`;
}

export function normalizeQuotes(
  quotes: ContentConfig['quotes']
): string | undefined {
  if (!quotes) return undefined;
  if (typeof quotes === 'string') return quotes;
  if (quotes.length === 2) {
    return `"${quotes[0]}" "${quotes[1]}"`;
  }
  if (quotes.length === 4) {
    return `"${quotes[0]}" "${quotes[1]}" "${quotes[2]}" "${quotes[3]}"`;
  }
  return undefined;
}

export function buildContentStyles(
  config: ContentConfig
): Record<string, string> {
  const styles: Record<string, string> = {};

  if (config.content !== undefined) {
    styles['content'] = normalizeContentValue(config.content);
  }

  const quotes = normalizeQuotes(config.quotes);
  if (quotes !== undefined) {
    styles['quotes'] = quotes;
  }

  if (config.counterReset !== undefined) {
    styles['counter-reset'] = config.counterReset;
  }

  if (config.counterIncrement !== undefined) {
    styles['counter-increment'] = config.counterIncrement;
  }

  return styles;
}

export function contentToCSS(config: ContentConfig): string {
  const styles = buildContentStyles(config);
  return Object.entries(styles)
    .map(([prop, val]) => `${prop}: ${val};`)
    .join(' ');
}
