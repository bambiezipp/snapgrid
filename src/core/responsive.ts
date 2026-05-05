import { mediaQueryMin, sortedBreakpointKeys, mergeBreakpoints } from './breakpoints';
import { buildGridStyles, buildSnapCSS } from './grid';

export interface ResponsiveGridConfig {
  columns?: number | Record<string, number>;
  gap?: string | Record<string, string>;
  snapPoints?: number[] | Record<string, number[]>;
  rowHeight?: string | Record<string, string>;
}

export interface ResolvedBreakpointConfig {
  breakpoint: string;
  minWidth: number;
  columns: number;
  gap: string;
  snapPoints: number[];
  rowHeight: string;
}

const DEFAULT_BREAKPOINTS: Record<string, number> = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
};

function resolveValue<T>(value: T | Record<string, T>, breakpoint: string, fallback: T): T {
  if (value === null || value === undefined) return fallback;
  if (typeof value === 'object' && !Array.isArray(value)) {
    const map = value as Record<string, T>;
    return map[breakpoint] ?? fallback;
  }
  return value as T;
}

export function resolveResponsiveConfig(
  config: ResponsiveGridConfig,
  customBreakpoints?: Record<string, number>
): ResolvedBreakpointConfig[] {
  const breakpoints = mergeBreakpoints(DEFAULT_BREAKPOINTS, customBreakpoints ?? {});
  const keys = sortedBreakpointKeys(breakpoints);

  return keys.map((key) => ({
    breakpoint: key,
    minWidth: breakpoints[key],
    columns: resolveValue(config.columns, key, 12),
    gap: resolveValue(config.gap, key, '1rem'),
    snapPoints: resolveValue(config.snapPoints, key, []),
    rowHeight: resolveValue(config.rowHeight, key, 'auto'),
  }));
}

export function buildResponsiveCSS(
  config: ResponsiveGridConfig,
  selector: string = '.snapgrid',
  customBreakpoints?: Record<string, number>
): string {
  const resolved = resolveResponsiveConfig(config, customBreakpoints);
  const cssBlocks: string[] = [];

  resolved.forEach(({ minWidth, columns, gap, snapPoints, rowHeight }) => {
    const styles = buildGridStyles({ columns, gap, rowHeight });
    const snapCSS = snapPoints.length > 0 ? buildSnapCSS(snapPoints) : '';
    const declarations = Object.entries(styles)
      .map(([k, v]) => `  ${k}: ${v};`)
      .join('\n');
    const block = minWidth === 0
      ? `${selector} {\n${declarations}${snapCSS ? `\n  ${snapCSS}` : ''}\n}`
      : `${mediaQueryMin(minWidth)} {\n  ${selector} {\n${declarations.replace(/^/gm, '  ')}${snapCSS ? `\n    ${snapCSS}` : ''}\n  }\n}`;

    cssBlocks.push(block);
  });

  return cssBlocks.join('\n\n');
}
