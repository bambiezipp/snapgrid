/**
 * density.ts
 * Utilities for controlling grid item density and auto-placement packing.
 */

export type DensityMode = "sparse" | "dense" | "balanced";

export interface DensityConfig {
  mode: DensityMode;
  rowHeight?: string;
  colWidth?: string;
}

export interface DensityStyles {
  gridAutoRows?: string;
  gridAutoColumns?: string;
  gridAutoFlow?: string;
}

/**
 * Normalize a density input to a DensityConfig object.
 */
export function normalizeDensity(
  input: DensityMode | DensityConfig | undefined
): DensityConfig {
  if (!input) return { mode: "sparse" };
  if (typeof input === "string") return { mode: input };
  return input;
}

/**
 * Resolve the CSS grid-auto-flow value based on density mode.
 */
export function resolveAutoFlow(mode: DensityMode): string {
  switch (mode) {
    case "dense":
      return "row dense";
    case "balanced":
      return "row dense";
    case "sparse":
    default:
      return "row";
  }
}

/**
 * Build CSS property map from a DensityConfig.
 */
export function buildDensityStyles(config: DensityConfig): DensityStyles {
  const styles: DensityStyles = {};

  styles.gridAutoFlow = resolveAutoFlow(config.mode);

  if (config.rowHeight) {
    styles.gridAutoRows = config.rowHeight;
  } else if (config.mode === "balanced") {
    styles.gridAutoRows = "minmax(min-content, auto)";
  }

  if (config.colWidth) {
    styles.gridAutoColumns = config.colWidth;
  }

  return styles;
}

/**
 * Convert DensityStyles to a CSS string block.
 */
export function densityToCSS(styles: DensityStyles): string {
  const lines: string[] = [];
  if (styles.gridAutoFlow) lines.push(`grid-auto-flow: ${styles.gridAutoFlow};`);
  if (styles.gridAutoRows) lines.push(`grid-auto-rows: ${styles.gridAutoRows};`);
  if (styles.gridAutoColumns) lines.push(`grid-auto-columns: ${styles.gridAutoColumns};`);
  return lines.join("\n");
}
