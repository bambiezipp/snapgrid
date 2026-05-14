export interface BackgroundConfig {
  color?: string;
  image?: string;
  size?: "cover" | "contain" | "auto" | string;
  position?: string;
  repeat?: "repeat" | "no-repeat" | "repeat-x" | "repeat-y" | "round" | "space";
  attachment?: "scroll" | "fixed" | "local";
  origin?: "border-box" | "padding-box" | "content-box";
  clip?: "border-box" | "padding-box" | "content-box" | "text";
  gradient?: string;
}

export type BackgroundInput = string | BackgroundConfig;

export function normalizeBackground(input: BackgroundInput): BackgroundConfig {
  if (typeof input === "string") {
    if (input.startsWith("#") || input.startsWith("rgb") || input.startsWith("hsl")) {
      return { color: input };
    }
    if (input.startsWith("url(") || input.startsWith("linear-gradient") || input.startsWith("radial-gradient")) {
      return { image: input };
    }
    return { color: input };
  }
  return { ...input };
}

export function buildBackgroundStyles(input: BackgroundInput): Record<string, string> {
  const config = normalizeBackground(input);
  const styles: Record<string, string> = {};

  if (config.color) {
    styles["background-color"] = config.color;
  }

  const imageSource = config.gradient ?? config.image;
  if (imageSource) {
    styles["background-image"] = imageSource;
  }

  if (config.size) {
    styles["background-size"] = config.size;
  }

  if (config.position) {
    styles["background-position"] = config.position;
  }

  if (config.repeat) {
    styles["background-repeat"] = config.repeat;
  }

  if (config.attachment) {
    styles["background-attachment"] = config.attachment;
  }

  if (config.origin) {
    styles["background-origin"] = config.origin;
  }

  if (config.clip) {
    styles["background-clip"] = config.clip;
  }

  return styles;
}

export function backgroundToCSS(input: BackgroundInput): string {
  const styles = buildBackgroundStyles(input);
  return Object.entries(styles)
    .map(([k, v]) => `${k}: ${v};`)
    .join(" ");
}
