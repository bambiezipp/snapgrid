/**
 * template.ts
 * Utilities for building CSS grid-template-areas strings
 * and resolving named area placements.
 */

export type GridAreaName = string;
export type GridAreaRow = GridAreaName[];
export type GridAreaMap = GridAreaRow[];

export interface AreaPlacement {
  gridArea: string;
}

export interface TemplateStyles {
  gridTemplateAreas: string;
}

/**
 * Validates that a grid area map is rectangular (all rows same length).
 */
export function validateAreaMap(areas: GridAreaMap): boolean {
  if (areas.length === 0) return false;
  const colCount = areas[0].length;
  return areas.every((row) => row.length === colCount);
}

/**
 * Converts a 2D array of area names into a CSS grid-template-areas string.
 *
 * Example:
 *   [['header', 'header'], ['sidebar', 'main']]
 *   => '"header header" "sidebar main"'
 */
export function buildTemplateAreas(areas: GridAreaMap): string {
  if (!validateAreaMap(areas)) {
    throw new Error(
      'snapgrid: grid area map must be rectangular (all rows must have the same number of columns)'
    );
  }
  return areas.map((row) => `"${row.join(' ')}"`).join(' ');
}

/**
 * Builds the CSS object for a grid container with template areas.
 */
export function buildTemplateStyles(areas: GridAreaMap): TemplateStyles {
  return {
    gridTemplateAreas: buildTemplateAreas(areas),
  };
}

/**
 * Builds the CSS object for a grid item assigned to a named area.
 */
export function buildAreaPlacement(name: GridAreaName): AreaPlacement {
  if (!name || typeof name !== 'string') {
    throw new Error('snapgrid: area name must be a non-empty string');
  }
  return { gridArea: name };
}

/**
 * Extracts the unique set of area names from a GridAreaMap.
 */
export function listAreaNames(areas: GridAreaMap): GridAreaName[] {
  const names = new Set<GridAreaName>();
  for (const row of areas) {
    for (const cell of row) {
      if (cell !== '.') names.add(cell);
    }
  }
  return Array.from(names);
}

/**
 * Converts template styles to a CSS string snippet.
 */
export function templateToCSS(styles: TemplateStyles): string {
  return `grid-template-areas: ${styles.gridTemplateAreas};`;
}
