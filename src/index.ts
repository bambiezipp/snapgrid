export { buildGridStyles, buildSnapCSS } from './core/grid';
export type { GridConfig, GridStyles, SnapPoint } from './core/grid';
export { getPreset, listPresets, mergeWithPreset } from './core/presets';
export type { PresetName } from './core/presets';

import { buildSnapCSS } from './core/grid';
import { getPreset, mergeWithPreset } from './core/presets';
import type { GridConfig } from './core/grid';
import type { PresetName } from './core/presets';

export interface SnapGridOptions {
  selector?: string;
  preset?: PresetName;
  config?: Partial<GridConfig>;
}

/**
 * Main entry point: generate CSS for a grid with optional preset and overrides.
 *
 * @example
 * const css = snapgrid({ preset: 'gallery', selector: '.my-grid' });
 * document.head.insertAdjacentHTML('beforeend', `<style>${css}</style>`);
 */
export function snapgrid(options: SnapGridOptions = {}): string {
  const { selector = '.sg-grid', preset, config = {} } = options;

  let resolvedConfig: GridConfig;

  if (preset) {
    resolvedConfig = mergeWithPreset(preset, config);
  } else {
    resolvedConfig = config as GridConfig;
  }

  return buildSnapCSS(resolvedConfig, selector);
}

export default snapgrid;
