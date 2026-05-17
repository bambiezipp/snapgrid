/**
 * tableLayout.ts
 * Utilities for CSS table-layout, border-collapse, border-spacing, and caption-side.
 */

export type TableLayoutValue = "auto" | "fixed";
export type BorderCollapseValue = "collapse" | "separate";
export type CaptionSideValue = "top" | "bottom";

export interface TableLayoutConfig {
  layout?: TableLayoutValue;
  borderCollapse?: BorderCollapseValue;
  borderSpacingX?: string | number;
  borderSpacingY?: string | number;
  captionSide?: CaptionSideValue;
}

const VALID_LAYOUTS: TableLayoutValue[] = ["auto", "fixed"];
const VALID_COLLAPSES: BorderCollapseValue[] = ["collapse", "separate"];
const VALID_CAPTIONS: CaptionSideValue[] = ["top", "bottom"];

function toPxValue(value: string | number): string {
  if (typeof value === "number") return `${value}px`;
  return value;
}

export function normalizeTableLayout(config: TableLayoutConfig): TableLayoutConfig {
  const result: TableLayoutConfig = {};

  if (config.layout !== undefined) {
    result.layout = VALID_LAYOUTS.includes(config.layout) ? config.layout : "auto";
  }

  if (config.borderCollapse !== undefined) {
    result.borderCollapse = VALID_COLLAPSES.includes(config.borderCollapse)
      ? config.borderCollapse
      : "separate";
  }

  if (config.borderSpacingX !== undefined) {
    result.borderSpacingX = toPxValue(config.borderSpacingX);
  }

  if (config.borderSpacingY !== undefined) {
    result.borderSpacingY = toPxValue(config.borderSpacingY);
  }

  if (config.captionSide !== undefined) {
    result.captionSide = VALID_CAPTIONS.includes(config.captionSide)
      ? config.captionSide
      : "top";
  }

  return result;
}

export function buildTableLayoutStyles(config: TableLayoutConfig): Record<string, string> {
  const normalized = normalizeTableLayout(config);
  const styles: Record<string, string> = {};

  if (normalized.layout) {
    styles["table-layout"] = normalized.layout;
  }

  if (normalized.borderCollapse) {
    styles["border-collapse"] = normalized.borderCollapse;
  }

  if (normalized.borderSpacingX !== undefined || normalized.borderSpacingY !== undefined) {
    const x = normalized.borderSpacingX ?? "0px";
    const y = normalized.borderSpacingY ?? x;
    styles["border-spacing"] = x === y ? x : `${x} ${y}`;
  }

  if (normalized.captionSide) {
    styles["caption-side"] = normalized.captionSide;
  }

  return styles;
}

export function tableLayoutToCSS(config: TableLayoutConfig): string {
  const styles = buildTableLayoutStyles(config);
  return Object.entries(styles)
    .map(([prop, value]) => `${prop}: ${value};`)
    .join(" ");
}
