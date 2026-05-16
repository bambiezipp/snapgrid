/**
 * isolation.ts
 * Handles CSS isolation and stacking context utilities.
 */

export type IsolationValue = "isolate" | "auto";

export type MixBlendMode =
  | "normal"
  | "multiply"
  | "screen"
  | "overlay"
  | "darken"
  | "lighten"
  | "color-dodge"
  | "color-burn"
  | "hard-light"
  | "soft-light"
  | "difference"
  | "exclusion"
  | "hue"
  | "saturation"
  | "color"
  | "luminosity";

export interface IsolationConfig {
  isolation?: IsolationValue;
  mixBlendMode?: MixBlendMode;
  willChange?: string | string[];
}

const VALID_ISOLATION: IsolationValue[] = ["isolate", "auto"];

const VALID_BLEND_MODES: MixBlendMode[] = [
  "normal", "multiply", "screen", "overlay", "darken", "lighten",
  "color-dodge", "color-burn", "hard-light", "soft-light",
  "difference", "exclusion", "hue", "saturation", "color", "luminosity",
];

export function normalizeIsolation(value: unknown): IsolationValue {
  if (typeof value === "string" && VALID_ISOLATION.includes(value as IsolationValue)) {
    return value as IsolationValue;
  }
  return "auto";
}

export function normalizeMixBlendMode(value: unknown): MixBlendMode | undefined {
  if (typeof value === "string" && VALID_BLEND_MODES.includes(value as MixBlendMode)) {
    return value as MixBlendMode;
  }
  return undefined;
}

export function normalizeWillChange(value: unknown): string | undefined {
  if (Array.isArray(value)) {
    const filtered = value.filter((v) => typeof v === "string" && v.trim().length > 0);
    return filtered.length > 0 ? filtered.join(", ") : undefined;
  }
  if (typeof value === "string" && value.trim().length > 0) {
    return value.trim();
  }
  return undefined;
}

export function buildIsolationStyles(config: IsolationConfig): Record<string, string> {
  const styles: Record<string, string> = {};

  const isolation = normalizeIsolation(config.isolation);
  if (isolation !== "auto") {
    styles["isolation"] = isolation;
  }

  const blend = normalizeMixBlendMode(config.mixBlendMode);
  if (blend) {
    styles["mix-blend-mode"] = blend;
  }

  const willChange = normalizeWillChange(config.willChange);
  if (willChange) {
    styles["will-change"] = willChange;
  }

  return styles;
}

export function isolationToCSS(config: IsolationConfig): string {
  const styles = buildIsolationStyles(config);
  return Object.entries(styles)
    .map(([prop, val]) => `${prop}: ${val};`)
    .join(" ");
}
