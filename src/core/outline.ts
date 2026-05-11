// Outline styles — distinct from border, used for focus indicators

export interface OutlineConfig {
  width?: string | number;
  style?: 'none' | 'solid' | 'dashed' | 'dotted' | 'double' | 'inset' | 'outset';
  color?: string;
  offset?: string | number;
}

function toOutlineValue(value: string | number, unit = 'px'): string {
  if (typeof value === 'number') return `${value}${unit}`;
  return value;
}

export function normalizeOutline(input: OutlineConfig | string | 'none'): OutlineConfig {
  if (input === 'none') return { style: 'none' };
  if (typeof input === 'string') {
    return { width: '2px', style: 'solid', color: input };
  }
  return input;
}

export function buildOutlineStyles(config: OutlineConfig): Record<string, string> {
  const styles: Record<string, string> = {};

  if (config.style === 'none') {
    styles['outline'] = 'none';
    return styles;
  }

  const parts: string[] = [];

  if (config.width !== undefined) {
    parts.push(toOutlineValue(config.width));
  }

  if (config.style !== undefined) {
    parts.push(config.style);
  }

  if (config.color !== undefined) {
    parts.push(config.color);
  }

  if (parts.length > 0) {
    styles['outline'] = parts.join(' ');
  }

  if (config.offset !== undefined) {
    styles['outlineOffset'] = toOutlineValue(config.offset);
  }

  return styles;
}

export function outlineToCSS(config: OutlineConfig | string | 'none'): Record<string, string> {
  return buildOutlineStyles(normalizeOutline(config));
}
