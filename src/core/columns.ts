/**
 * columns.ts — Utilities for building CSS grid column definitions
 */

export type ColumnValue = number | string;

export interface ColumnsConfig {
  count?: ColumnValue;
  minWidth?: string;
  maxWidth?: string;
  repeat?: "auto-fill" | "auto-fit";
}

/**
 * Normalizes a column value to a valid CSS grid template string.
 */
export function normalizeColumnValue(value: ColumnValue): string {
  if (typeof value === "number") {
    return `repeat(${value}, 1fr)`;
  }
  return value;
}

/**
 * Builds a CSS grid-template-columns value from a ColumnsConfig.
 */
export function buildColumnsTemplate(config: ColumnsConfig): string {
  const { count, minWidth = "0px", maxWidth = "1fr", repeat = "auto-fill" } = config;

  if (count !== undefined) {
    return normalizeColumnValue(count);
  }

  return `repeat(${repeat}, minmax(${minWidth}, ${maxWidth}))`;
}

/**
 * Builds a CSS properties record for grid column configuration.
 */
export function buildColumnsStyles(
  config: ColumnsConfig | ColumnValue
): Record<string, string> {
  if (typeof config === "number" || typeof config === "string") {
    return {
      gridTemplateColumns: normalizeColumnValue(config),
    };
  }

  return {
    gridTemplateColumns: buildColumnsTemplate(config),
  };
}

/**
 * Serializes columns styles to a CSS string.
 */
export function columnsToCSS(config: ColumnsConfig | ColumnValue): string {
  const styles = buildColumnsStyles(config);
  return Object.entries(styles)
    .map(([key, value]) => {
      const kebab = key.replace(/([A-Z])/g, "-$1").toLowerCase();
      return `${kebab}: ${value};`;
    })
    .join(" ");
}
