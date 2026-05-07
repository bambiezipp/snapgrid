/**
 * aspect.ts — Utilities for CSS aspect-ratio and object-fit/position handling
 */

export type AspectRatioValue =
  | "auto"
  | "square"
  | "video"
  | "portrait"
  | `${number}/${number}`
  | number;

export type ObjectFit = "fill" | "contain" | "cover" | "none" | "scale-down";
export type ObjectPosition = string;

export interface AspectConfig {
  ratio?: AspectRatioValue;
  objectFit?: ObjectFit;
  objectPosition?: ObjectPosition;
}

export interface AspectStyles {
  "aspect-ratio"?: string;
  "object-fit"?: string;
  "object-position"?: string;
}

const PRESET_RATIOS: Record<string, string> = {
  auto: "auto",
  square: "1 / 1",
  video: "16 / 9",
  portrait: "3 / 4",
};

export function normalizeAspectRatio(value: AspectRatioValue): string {
  if (typeof value === "number") {
    return String(value);
  }
  if (value in PRESET_RATIOS) {
    return PRESET_RATIOS[value as keyof typeof PRESET_RATIOS];
  }
  // e.g. "4/3" or "4 / 3"
  const match = value.match(/^(\d+(?:\.\d+)?)\s*\/\s*(\d+(?:\.\d+)?)$/);
  if (match) {
    return `${match[1]} / ${match[2]}`;
  }
  return value;
}

export function buildAspectStyles(config: AspectConfig): AspectStyles {
  const styles: AspectStyles = {};

  if (config.ratio !== undefined) {
    styles["aspect-ratio"] = normalizeAspectRatio(config.ratio);
  }

  if (config.objectFit !== undefined) {
    styles["object-fit"] = config.objectFit;
  }

  if (config.objectPosition !== undefined) {
    styles["object-position"] = config.objectPosition;
  }

  return styles;
}

export function aspectToCSS(config: AspectConfig): string {
  const styles = buildAspectStyles(config);
  return Object.entries(styles)
    .map(([prop, value]) => `${prop}: ${value};`)
    .join(" ");
}
