/**
 * boxsizing.ts
 * Utilities for box-sizing, width, height, min/max sizing constraints.
 */

export type BoxSizingKeyword = "border-box" | "content-box";

export interface BoxSizingConfig {
  boxSizing?: BoxSizingKeyword;
  width?: string | number;
  height?: string | number;
  minWidth?: string | number;
  maxWidth?: string | number;
  minHeight?: string | number;
  maxHeight?: string | number;
}

export type BoxSizingStyles = Record<string, string>;

/** Convert a numeric or string value to a CSS dimension string. */
export function toDimensionValue(value: string | number): string {
  if (typeof value === "number") {
    return value === 0 ? "0" : `${value}px`;
  }
  return value.trim();
}

/** Normalize a BoxSizingConfig, filling in defaults. */
export function normalizeBoxSizing(
  config: BoxSizingConfig
): Required<Pick<BoxSizingConfig, "boxSizing">> & Omit<BoxSizingConfig, "boxSizing"> {
  return {
    boxSizing: config.boxSizing ?? "border-box",
    ...config,
  };
}

/** Build a flat CSS-properties map from a BoxSizingConfig. */
export function buildBoxSizingStyles(config: BoxSizingConfig): BoxSizingStyles {
  const normalized = normalizeBoxSizing(config);
  const styles: BoxSizingStyles = {};

  styles["box-sizing"] = normalized.boxSizing;

  if (normalized.width !== undefined) styles["width"] = toDimensionValue(normalized.width);
  if (normalized.height !== undefined) styles["height"] = toDimensionValue(normalized.height);
  if (normalized.minWidth !== undefined) styles["min-width"] = toDimensionValue(normalized.minWidth);
  if (normalized.maxWidth !== undefined) styles["max-width"] = toDimensionValue(normalized.maxWidth);
  if (normalized.minHeight !== undefined) styles["min-height"] = toDimensionValue(normalized.minHeight);
  if (normalized.maxHeight !== undefined) styles["max-height"] = toDimensionValue(normalized.maxHeight);

  return styles;
}

/** Serialize a BoxSizingStyles map to a CSS declaration block string. */
export function boxSizingToCSS(config: BoxSizingConfig): string {
  const styles = buildBoxSizingStyles(config);
  return Object.entries(styles)
    .map(([prop, val]) => `${prop}: ${val};`)
    .join(" ");
}
