import { GridConfig } from './grid';

export type PresetName = 'default' | 'sidebar' | 'masonry' | 'dashboard' | 'gallery';

const presets: Record<PresetName, GridConfig> = {
  default: {
    columns: 12,
    gap: 16,
    snapPoints: [
      { breakpoint: 480, columns: 4 },
      { breakpoint: 768, columns: 8 },
      { breakpoint: 1024, columns: 12 },
    ],
  },
  sidebar: {
    columns: 2,
    columnGap: '2rem',
    minColumnWidth: '240px',
    snapPoints: [
      { breakpoint: 768, columns: 2 },
    ],
  },
  masonry: {
    minColumnWidth: '200px',
    maxColumnWidth: '1fr',
    gap: 16,
    snapPoints: [
      { breakpoint: 480, columns: 2 },
      { breakpoint: 768, columns: 3 },
      { breakpoint: 1200, columns: 4 },
    ],
  },
  dashboard: {
    columns: 3,
    gap: 24,
    snapPoints: [
      { breakpoint: 640, columns: 1 },
      { breakpoint: 1024, columns: 2 },
      { breakpoint: 1280, columns: 3 },
    ],
  },
  gallery: {
    minColumnWidth: '160px',
    maxColumnWidth: '280px',
    gap: 8,
    snapPoints: [
      { breakpoint: 480, columns: 2 },
      { breakpoint: 768, columns: 3 },
      { breakpoint: 1024, columns: 4 },
      { breakpoint: 1440, columns: 5 },
    ],
  },
};

export function getPreset(name: PresetName): GridConfig {
  const preset = presets[name];
  if (!preset) throw new Error(`Unknown preset: "${name}"`);
  return { ...preset };
}

export function listPresets(): PresetName[] {
  return Object.keys(presets) as PresetName[];
}

export function mergeWithPreset(name: PresetName, overrides: Partial<GridConfig>): GridConfig {
  return { ...getPreset(name), ...overrides };
}
