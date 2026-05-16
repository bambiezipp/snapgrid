// clip.ts — CSS clip-path and masking utilities

export type ClipPathKeyword = 'none' | 'inherit' | 'initial' | 'unset';

export type ClipShapeType = 'inset' | 'circle' | 'ellipse' | 'polygon';

export interface ClipInset {
  type: 'inset';
  top?: string | number;
  right?: string | number;
  bottom?: string | number;
  left?: string | number;
  round?: string;
}

export interface ClipCircle {
  type: 'circle';
  radius?: string | number;
  at?: string;
}

export interface ClipEllipse {
  type: 'ellipse';
  rx?: string | number;
  ry?: string | number;
  at?: string;
}

export interface ClipPolygon {
  type: 'polygon';
  points: string[];
  fillRule?: 'nonzero' | 'evenodd';
}

export type ClipShape = ClipInset | ClipCircle | ClipEllipse | ClipPolygon;

export type ClipConfig = ClipPathKeyword | ClipShape | string;

function toCSSUnit(value: string | number): string {
  return typeof value === 'number' ? `${value}px` : value;
}

export function normalizeClipPath(config: ClipConfig): string {
  if (typeof config === 'string') return config;

  switch (config.type) {
    case 'inset': {
      const { top = 0, right = 0, bottom = 0, left = 0, round } = config;
      const sides = [top, right, bottom, left].map(toCSSUnit).join(' ');
      return round ? `inset(${sides} round ${round})` : `inset(${sides})`;
    }
    case 'circle': {
      const r = config.radius !== undefined ? toCSSUnit(config.radius) : 'closest-side';
      return config.at ? `circle(${r} at ${config.at})` : `circle(${r})`;
    }
    case 'ellipse': {
      const rx = config.rx !== undefined ? toCSSUnit(config.rx) : 'closest-side';
      const ry = config.ry !== undefined ? toCSSUnit(config.ry) : 'closest-side';
      return config.at ? `ellipse(${rx} ${ry} at ${config.at})` : `ellipse(${rx} ${ry})`;
    }
    case 'polygon': {
      const rule = config.fillRule ? `${config.fillRule}, ` : '';
      return `polygon(${rule}${config.points.join(', ')})`;
    }
  }
}

export function buildClipStyles(config: ClipConfig): Record<string, string> {
  return { clipPath: normalizeClipPath(config) };
}

export function clipToCSS(config: ClipConfig): string {
  const styles = buildClipStyles(config);
  return Object.entries(styles)
    .map(([k, v]) => `clip-path: ${v};`)
    .join('\n');
}
