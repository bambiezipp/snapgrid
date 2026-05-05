/**
 * Column/row span utilities for snapgrid items.
 */

export interface SpanOptions {
  colSpan?: number | 'full';
  rowSpan?: number;
  colStart?: number | 'auto';
  rowStart?: number | 'auto';
}

/**
 * Resolves a colSpan value to a CSS grid-column value.
 * 'full' spans all columns using 1 / -1.
 */
export function resolveColSpan(
  colSpan: number | 'full',
  totalColumns?: number
): string {
  if (colSpan === 'full') {
    return '1 / -1';
  }
  if (typeof colSpan === 'number' && colSpan > 0) {
    return `span ${colSpan}`;
  }
  throw new RangeError(`Invalid colSpan: ${colSpan}. Must be a positive integer or 'full'.`);
}

/**
 * Resolves a rowSpan value to a CSS grid-row value.
 */
export function resolveRowSpan(rowSpan: number): string {
  if (rowSpan > 0) {
    return `span ${rowSpan}`;
  }
  throw new RangeError(`Invalid rowSpan: ${rowSpan}. Must be a positive integer.`);
}

/**
 * Builds CSS properties for a grid item based on SpanOptions.
 */
export function buildSpanStyles(
  options: SpanOptions,
  totalColumns?: number
): Record<string, string> {
  const styles: Record<string, string> = {};

  if (options.colSpan !== undefined) {
    const spanValue = resolveColSpan(options.colSpan, totalColumns);
    const startValue =
      options.colStart !== undefined && options.colStart !== 'auto'
        ? `${options.colStart} / ${options.colStart} + ${options.colSpan === 'full' ? '' : options.colSpan}`
        : undefined;

    if (options.colStart !== undefined && options.colStart !== 'auto' && options.colSpan !== 'full') {
      styles['grid-column'] = `${options.colStart} / span ${options.colSpan}`;
    } else {
      styles['grid-column'] = spanValue;
    }
  } else if (options.colStart !== undefined) {
    styles['grid-column-start'] = String(options.colStart);
  }

  if (options.rowSpan !== undefined) {
    const rowSpanValue = resolveRowSpan(options.rowSpan);
    if (options.rowStart !== undefined && options.rowStart !== 'auto') {
      styles['grid-row'] = `${options.rowStart} / span ${options.rowSpan}`;
    } else {
      styles['grid-row'] = rowSpanValue;
    }
  } else if (options.rowStart !== undefined) {
    styles['grid-row-start'] = String(options.rowStart);
  }

  return styles;
}
