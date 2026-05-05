export interface GridConfig {
  columns?: number;
  gap?: string | number;
  rowGap?: string | number;
  columnGap?: string | number;
  minColumnWidth?: string;
  maxColumnWidth?: string;
  snapPoints?: SnapPoint[];
}

export interface SnapPoint {
  breakpoint: number;
  columns: number;
  gap?: string | number;
}

export interface GridStyles {
  display: string;
  gridTemplateColumns: string;
  gap?: string;
  rowGap?: string;
  columnGap?: string;
}

const normalizeSize = (value: string | number): string =>
  typeof value === 'number' ? `${value}px` : value;

export function buildGridStyles(config: GridConfig): GridStyles {
  const {
    columns,
    gap,
    rowGap,
    columnGap,
    minColumnWidth = '0',
    maxColumnWidth = '1fr',
  } = config;

  const templateColumns = columns
    ? `repeat(${columns}, minmax(${normalizeSize(minColumnWidth)}, ${maxColumnWidth}))`
    : `repeat(auto-fit, minmax(${normalizeSize(minColumnWidth)}, ${maxColumnWidth}))`;

  const styles: GridStyles = {
    display: 'grid',
    gridTemplateColumns: templateColumns,
  };

  if (gap !== undefined) styles.gap = normalizeSize(gap);
  if (rowGap !== undefined) styles.rowGap = normalizeSize(rowGap);
  if (columnGap !== undefined) styles.columnGap = normalizeSize(columnGap);

  return styles;
}

export function buildSnapCSS(config: GridConfig, selector: string): string {
  const { snapPoints = [] } = config;
  const baseStyles = buildGridStyles(config);

  const baseCSS = Object.entries(baseStyles)
    .map(([k, v]) => `  ${camelToKebab(k)}: ${v};`)
    .join('\n');

  let css = `${selector} {\n${baseCSS}\n}\n`;

  const sorted = [...snapPoints].sort((a, b) => a.breakpoint - b.breakpoint);
  for (const snap of sorted) {
    const snapStyles = buildGridStyles({ ...config, columns: snap.columns, gap: snap.gap ?? config.gap });
    const snapCSS = Object.entries(snapStyles)
      .map(([k, v]) => `    ${camelToKebab(k)}: ${v};`)
      .join('\n');
    css += `\n@media (min-width: ${snap.breakpoint}px) {\n  ${selector} {\n${snapCSS}\n  }\n}\n`;
  }

  return css;
}

function camelToKebab(str: string): string {
  return str.replace(/([A-Z])/g, (m) => `-${m.toLowerCase()}`);
}
