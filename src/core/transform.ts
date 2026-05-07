export interface TransformOptions {
  translate?: string | [string, string];
  scale?: number | string | [string, string];
  rotate?: string | number;
  skew?: string | [string, string];
  origin?: string;
  perspective?: string | number;
}

export type TransformConfig = TransformOptions | string;

function toDegrees(value: string | number): string {
  if (typeof value === 'number') return `${value}deg`;
  return value;
}

function toPx(value: string | number): string {
  if (typeof value === 'number') return `${value}px`;
  return value;
}

export function normalizeTransform(input: TransformConfig): TransformOptions {
  if (typeof input === 'string') {
    return { translate: input };
  }
  return input;
}

export function buildTransformValue(options: TransformOptions): string {
  const parts: string[] = [];

  if (options.translate !== undefined) {
    if (Array.isArray(options.translate)) {
      parts.push(`translate(${options.translate[0]}, ${options.translate[1]})`);
    } else {
      parts.push(`translateX(${options.translate})`);
    }
  }

  if (options.scale !== undefined) {
    if (Array.isArray(options.scale)) {
      parts.push(`scale(${options.scale[0]}, ${options.scale[1]})`);
    } else {
      parts.push(`scale(${options.scale})`);
    }
  }

  if (options.rotate !== undefined) {
    parts.push(`rotate(${toDegrees(options.rotate)})`);
  }

  if (options.skew !== undefined) {
    if (Array.isArray(options.skew)) {
      parts.push(`skew(${options.skew[0]}, ${options.skew[1]})`);
    } else {
      parts.push(`skewX(${options.skew})`);
    }
  }

  return parts.length > 0 ? parts.join(' ') : 'none';
}

export function buildTransformStyles(
  config: TransformConfig
): Record<string, string> {
  const options = normalizeTransform(config);
  const styles: Record<string, string> = {};

  const transformValue = buildTransformValue(options);
  if (transformValue !== 'none') {
    styles['transform'] = transformValue;
  }

  if (options.origin !== undefined) {
    styles['transform-origin'] = options.origin;
  }

  if (options.perspective !== undefined) {
    styles['perspective'] = toPx(options.perspective);
  }

  return styles;
}

export function transformToCSS(config: TransformConfig): string {
  const styles = buildTransformStyles(config);
  return Object.entries(styles)
    .map(([k, v]) => `${k}: ${v};`)
    .join(' ');
}
