/**
 * Border utilities for grid containers and items.
 * Supports shorthand, per-side, and responsive border definitions.
 */

export type BorderSide = "top" | "right" | "bottom" | "left";

export interface BorderValue {
  width?: string | number;
  style?: string;
  color?: string;
}

export interface BorderConfig {
  all?: BorderValue | string;
  top?: BorderValue | string;
  right?: BorderValue | string;
  bottom?: BorderValue | string;
  left?: BorderValue | string;
  radius?: string | number;
}

export function normalizeBorderValue(value: BorderValue | string): string {
  if (typeof value === "string") return value;
  const width = value.width !== undefined
    ? (typeof value.width === "number" ? `${value.width}px` : value.width)
    : "1px";
  const style = value.style ?? "solid";
  const color = value.color ?? "currentColor";
  return `${width} ${style} ${color}`;
}

export function normalizeRadius(value: string | number): string {
  return typeof value === "number" ? `${value}px` : value;
}

export function buildBorderStyles(config: BorderConfig): Record<string, string> {
  const styles: Record<string, string> = {};

  if (config.all !== undefined) {
    styles["border"] = normalizeBorderValue(config.all);
  }

  const sides: BorderSide[] = ["top", "right", "bottom", "left"];
  for (const side of sides) {
    const val = config[side];
    if (val !== undefined) {
      styles[`border-${side}`] = normalizeBorderValue(val);
    }
  }

  if (config.radius !== undefined) {
    styles["border-radius"] = normalizeRadius(config.radius);
  }

  return styles;
}

export function borderToCSS(selector: string, config: BorderConfig): string {
  const styles = buildBorderStyles(config);
  const declarations = Object.entries(styles)
    .map(([prop, val]) => `  ${prop}: ${val};`)
    .join("\n");
  return declarations ? `${selector} {\n${declarations}\n}` : "";
}
