/**
 * Alignment utilities for snapgrid.
 * Handles justify/align properties for grid containers and items.
 */

export type JustifyContent =
  | 'start'
  | 'end'
  | 'center'
  | 'stretch'
  | 'space-around'
  | 'space-between'
  | 'space-evenly';

export type AlignItems =
  | 'start'
  | 'end'
  | 'center'
  | 'stretch'
  | 'baseline';

export type JustifyItems =
  | 'start'
  | 'end'
  | 'center'
  | 'stretch';

export type AlignContent =
  | 'start'
  | 'end'
  | 'center'
  | 'stretch'
  | 'space-around'
  | 'space-between'
  | 'space-evenly';

export interface AlignmentOptions {
  justifyContent?: JustifyContent;
  alignItems?: AlignItems;
  justifyItems?: JustifyItems;
  alignContent?: AlignContent;
}

export interface ItemAlignmentOptions {
  justifySelf?: JustifyItems;
  alignSelf?: AlignItems;
}

/**
 * Builds CSS properties object for grid container alignment.
 */
export function buildAlignmentStyles(
  options: AlignmentOptions
): Record<string, string> {
  const styles: Record<string, string> = {};

  if (options.justifyContent) {
    styles['justify-content'] = options.justifyContent;
  }
  if (options.alignItems) {
    styles['align-items'] = options.alignItems;
  }
  if (options.justifyItems) {
    styles['justify-items'] = options.justifyItems;
  }
  if (options.alignContent) {
    styles['align-content'] = options.alignContent;
  }

  return styles;
}

/**
 * Builds CSS properties object for grid item self-alignment.
 */
export function buildItemAlignmentStyles(
  options: ItemAlignmentOptions
): Record<string, string> {
  const styles: Record<string, string> = {};

  if (options.justifySelf) {
    styles['justify-self'] = options.justifySelf;
  }
  if (options.alignSelf) {
    styles['align-self'] = options.alignSelf;
  }

  return styles;
}

/**
 * Serializes alignment styles to a CSS string snippet.
 */
export function alignmentToCSS(
  styles: Record<string, string>
): string {
  return Object.entries(styles)
    .map(([prop, value]) => `${prop}: ${value};`)
    .join(' ');
}
