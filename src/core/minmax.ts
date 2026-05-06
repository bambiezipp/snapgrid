/**
 * Utilities for CSS grid minmax() and track sizing functions.
 */

export type TrackSize = string | number;

export interface MinMaxOptions {
  min: TrackSize;
  max: TrackSize;
}

export type TrackSizingValue =
  | TrackSize
  | MinMaxOptions
  | "auto"
  | "min-content"
  | "max-content"
  | "fit-content";

/**
 * Normalize a raw track size value to a CSS string.
 */
export function normalizeTrackSize(value: TrackSize): string {
  if (typeof value === "number") {
    return value === 0 ? "0" : `${value}px`;
  }
  return value;
}

/**
 * Build a CSS minmax() expression.
 */
export function buildMinMax(options: MinMaxOptions): string {
  const min = normalizeTrackSize(options.min);
  const max = normalizeTrackSize(options.max);
  return `minmax(${min}, ${max})`;
}

/**
 * Resolve a TrackSizingValue to a CSS string.
 */
export function resolveTrackSizing(value: TrackSizingValue): string {
  if (typeof value === "object" && value !== null && "min" in value && "max" in value) {
    return buildMinMax(value as MinMaxOptions);
  }
  return normalizeTrackSize(value as TrackSize);
}

/**
 * Build grid-template-columns or grid-template-rows from an array of track sizes.
 */
export function buildTrackTemplate(tracks: TrackSizingValue[]): string {
  return tracks.map(resolveTrackSizing).join(" ");
}

/**
 * Build a repeat() expression.
 */
export function buildRepeat(
  count: number | "auto-fill" | "auto-fit",
  trackSize: TrackSizingValue
): string {
  const size = resolveTrackSizing(trackSize);
  return `repeat(${count}, ${size})`;
}

/**
 * Build grid-template-columns CSS property value for common column patterns.
 */
export function buildColumnTemplate(
  columns: number | TrackSizingValue[],
  trackSize: TrackSizingValue = "1fr"
): string {
  if (Array.isArray(columns)) {
    return buildTrackTemplate(columns);
  }
  return buildRepeat(columns, trackSize);
}
