export interface TextDecorationConfig {
  line?: "none" | "underline" | "overline" | "line-through" | "underline overline";
  style?: "solid" | "double" | "dotted" | "dashed" | "wavy";
  color?: string;
  thickness?: string | number;
  offset?: string | number;
}

export type TextDecorationInput = TextDecorationConfig | "none" | "underline" | "overline" | "line-through";

function toDecorationValue(value: string | number): string {
  if (typeof value === "number") return `${value}px`;
  return value;
}

export function normalizeTextDecoration(input: TextDecorationInput): TextDecorationConfig {
  if (typeof input === "string") {
    if (input === "none") return { line: "none" };
    return { line: input as TextDecorationConfig["line"] };
  }
  return input;
}

export function buildTextDecorationStyles(config: TextDecorationConfig): Record<string, string> {
  const styles: Record<string, string> = {};

  if (config.line !== undefined) {
    styles["text-decoration-line"] = config.line;
  }

  if (config.style !== undefined) {
    styles["text-decoration-style"] = config.style;
  }

  if (config.color !== undefined) {
    styles["text-decoration-color"] = config.color;
  }

  if (config.thickness !== undefined) {
    styles["text-decoration-thickness"] = toDecorationValue(config.thickness);
  }

  if (config.offset !== undefined) {
    styles["text-underline-offset"] = toDecorationValue(config.offset);
  }

  return styles;
}

export function textDecorationToCSS(input: TextDecorationInput): Record<string, string> {
  const config = normalizeTextDecoration(input);
  return buildTextDecorationStyles(config);
}
