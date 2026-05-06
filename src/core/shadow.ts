/**
 * Box shadow utilities for grid containers and items.
 */

export interface ShadowLayer {
  offsetX?: string | number;
  offsetY?: string | number;
  blur?: string | number;
  spread?: string | number;
  color?: string;
  inset?: boolean;
}

export type ShadowConfig = ShadowLayer | ShadowLayer[] | string;

function toPx(value: string | number | undefined, fallback = "0"): string {
  if (value === undefined) return fallback;
  return typeof value === "number" ? `${value}px` : value;
}

export function normalizeShadowLayer(layer: ShadowLayer): string {
  const parts: string[] = [];
  if (layer.inset) parts.push("inset");
  parts.push(toPx(layer.offsetX));
  parts.push(toPx(layer.offsetY));
  if (layer.blur !== undefined || layer.spread !== undefined) {
    parts.push(toPx(layer.blur));
  }
  if (layer.spread !== undefined) {
    parts.push(toPx(layer.spread));
  }
  if (layer.color) parts.push(layer.color);
  return parts.join(" ");
}

export function normalizeShadow(config: ShadowConfig): string {
  if (typeof config === "string") return config;
  if (Array.isArray(config)) {
    return config.map(normalizeShadowLayer).join(", ");
  }
  return normalizeShadowLayer(config);
}

export function buildShadowStyles(config: ShadowConfig): Record<string, string> {
  return { "box-shadow": normalizeShadow(config) };
}

export function shadowToCSS(selector: string, config: ShadowConfig): string {
  const value = normalizeShadow(config);
  return `${selector} {\n  box-shadow: ${value};\n}`;
}
