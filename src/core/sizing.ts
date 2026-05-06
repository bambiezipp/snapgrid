/**
 * sizing.ts
 * Utilities for building grid column/row sizing styles.
 * Handles fixed, fractional, auto, and min-content/max-content track sizes.
 */

export type TrackSizeValue =
  | number
  | string
  | "auto"
  | "min-content"
  | "max-content";

export interface SizingConfig {
  columns?: TrackSizeValue | TrackSizeValue[];
  rows?: TrackSizeValue | TrackSizeValue[];
  autoColumns?: TrackSizeValue;
  autoRows?: TrackSizeValue;
}

/**
 * Normalize a single track size value to a valid CSS string.
 */
export function normalizeTrackValue(value: TrackSizeValue): string {
  if (typeof value === "number") {
    return value > 0 && value <= 12 ? `${value}fr` : `${value}px`;
  }
  const keywords = ["auto", "min-content", "max-content"];
  if (keywords.includes(value)) return value;
  // Pass through already-valid CSS strings (e.g. "200px", "1fr", "minmax(...)")
  return value;
}

/**
 * Convert an array of track sizes to a CSS grid-template string.
 */
export function buildTrackList(tracks: TrackSizeValue | TrackSizeValue[]): string {
  const arr = Array.isArray(tracks) ? tracks : [tracks];
  return arr.map(normalizeTrackValue).join(" ");
}

/**
 * Build CSS properties for grid sizing config.
 */
export function buildSizingStyles(config: SizingConfig): Record<string, string> {
  const styles: Record<string, string> = {};

  if (config.columns !== undefined) {
    styles["grid-template-columns"] = buildTrackList(config.columns);
  }

  if (config.rows !== undefined) {
    styles["grid-template-rows"] = buildTrackList(config.rows);
  }

  if (config.autoColumns !== undefined) {
    styles["grid-auto-columns"] = normalizeTrackValue(config.autoColumns);
  }

  if (config.autoRows !== undefined) {
    styles["grid-auto-rows"] = normalizeTrackValue(config.autoRows);
  }

  return styles;
}

/**
 * Serialize sizing styles to a CSS declaration block string.
 */
export function sizingToCSS(config: SizingConfig): string {
  const styles = buildSizingStyles(config);
  return Object.entries(styles)
    .map(([prop, val]) => `${prop}: ${val};`)
    .join(" ");
}
