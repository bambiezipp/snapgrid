/**
 * appearance.ts
 * Utilities for CSS appearance, caret, and accent-color properties.
 */

export interface AppearanceConfig {
  appearance?: 'none' | 'auto' | 'menulist-button' | 'textfield';
  caretColor?: string | 'transparent' | 'auto';
  accentColor?: string | 'auto';
}

export function normalizeAppearance(
  value: AppearanceConfig['appearance']
): string {
  if (!value) return 'auto';
  const valid = ['none', 'auto', 'menulist-button', 'textfield'];
  if (!valid.includes(value)) {
    throw new Error(`Invalid appearance value: "${value}"`);
  }
  return value;
}

export function normalizeCaretColor(value: string | undefined): string {
  if (!value) return 'auto';
  return value.trim();
}

export function normalizeAccentColor(value: string | undefined): string {
  if (!value) return 'auto';
  return value.trim();
}

export function buildAppearanceStyles(
  config: AppearanceConfig
): Record<string, string> {
  const styles: Record<string, string> = {};

  if (config.appearance !== undefined) {
    styles['appearance'] = normalizeAppearance(config.appearance);
    styles['-webkit-appearance'] = normalizeAppearance(config.appearance);
  }

  if (config.caretColor !== undefined) {
    styles['caret-color'] = normalizeCaretColor(config.caretColor);
  }

  if (config.accentColor !== undefined) {
    styles['accent-color'] = normalizeAccentColor(config.accentColor);
  }

  return styles;
}

export function appearanceToCSS(
  selector: string,
  config: AppearanceConfig
): string {
  const styles = buildAppearanceStyles(config);
  const declarations = Object.entries(styles)
    .map(([prop, val]) => `  ${prop}: ${val};`)
    .join('\n');
  return declarations ? `${selector} {\n${declarations}\n}` : '';
}
