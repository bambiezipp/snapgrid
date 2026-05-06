/**
 * autoflow.ts
 * Utilities for CSS Grid auto-placement and flow control.
 */

export type AutoFlowDirection = 'row' | 'column' | 'row dense' | 'column dense';

export interface AutoFlowConfig {
  direction?: AutoFlowDirection;
  autoRows?: string;
  autoCols?: string;
}

/**
 * Validates and normalizes an AutoFlowDirection value.
 */
export function normalizeAutoFlow(direction: string): AutoFlowDirection {
  const valid: AutoFlowDirection[] = ['row', 'column', 'row dense', 'column dense'];
  if (valid.includes(direction as AutoFlowDirection)) {
    return direction as AutoFlowDirection;
  }
  throw new Error(`Invalid auto-flow direction: "${direction}". Must be one of: ${valid.join(', ')}`);
}

/**
 * Builds a CSS properties object for grid auto-flow settings.
 */
export function buildAutoFlowStyles(config: AutoFlowConfig): Record<string, string> {
  const styles: Record<string, string> = {};

  if (config.direction !== undefined) {
    styles['grid-auto-flow'] = normalizeAutoFlow(config.direction);
  }

  if (config.autoRows !== undefined) {
    styles['grid-auto-rows'] = config.autoRows;
  }

  if (config.autoCols !== undefined) {
    styles['grid-auto-columns'] = config.autoCols;
  }

  return styles;
}

/**
 * Serializes auto-flow styles to a CSS string snippet.
 */
export function autoFlowToCSS(config: AutoFlowConfig): string {
  const styles = buildAutoFlowStyles(config);
  return Object.entries(styles)
    .map(([prop, value]) => `${prop}: ${value};`)
    .join(' ');
}
