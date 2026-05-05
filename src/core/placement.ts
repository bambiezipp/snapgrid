/**
 * Placement module — combines alignment and span utilities into
 * a unified API for positioning grid items.
 */

import {
  AlignmentOptions,
  ItemAlignmentOptions,
  buildAlignmentStyles,
  buildItemAlignmentStyles,
  alignmentToCSS,
} from './alignment';
import { SpanOptions, buildSpanStyles } from './span';

export interface PlacementOptions extends SpanOptions, ItemAlignmentOptions {}

export interface ContainerPlacementOptions extends AlignmentOptions {}

/**
 * Builds a combined CSS properties map for a grid item,
 * merging span and self-alignment styles.
 */
export function buildItemPlacement(
  options: PlacementOptions,
  totalColumns?: number
): Record<string, string> {
  const spanStyles = buildSpanStyles(
    {
      colSpan: options.colSpan,
      rowSpan: options.rowSpan,
      colStart: options.colStart,
      rowStart: options.rowStart,
    },
    totalColumns
  );

  const selfStyles = buildItemAlignmentStyles({
    justifySelf: options.justifySelf,
    alignSelf: options.alignSelf,
  });

  return { ...spanStyles, ...selfStyles };
}

/**
 * Builds a combined CSS properties map for a grid container,
 * including alignment directives.
 */
export function buildContainerPlacement(
  options: ContainerPlacementOptions
): Record<string, string> {
  return buildAlignmentStyles(options);
}

/**
 * Serializes a placement styles map to an inline CSS string.
 */
export function placementToCSS(styles: Record<string, string>): string {
  return alignmentToCSS(styles);
}
