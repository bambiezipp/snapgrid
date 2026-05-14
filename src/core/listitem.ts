/**
 * listitem.ts
 * Utilities for CSS list-style properties (list-style-type, list-style-position, list-style-image).
 */

export type ListStyleType =
  | 'none'
  | 'disc'
  | 'circle'
  | 'square'
  | 'decimal'
  | 'decimal-leading-zero'
  | 'lower-roman'
  | 'upper-roman'
  | 'lower-alpha'
  | 'upper-alpha'
  | 'lower-latin'
  | 'upper-latin'
  | string;

export type ListStylePosition = 'inside' | 'outside';

export interface ListItemConfig {
  type?: ListStyleType;
  position?: ListStylePosition;
  image?: string | null;
}

export interface ListItemStyles {
  'list-style-type'?: string;
  'list-style-position'?: string;
  'list-style-image'?: string;
}

const VALID_POSITIONS: ListStylePosition[] = ['inside', 'outside'];

export function normalizeListItemConfig(input: ListItemConfig | ListStyleType): ListItemConfig {
  if (typeof input === 'string') {
    return { type: input };
  }
  return input;
}

export function normalizeListPosition(position: string | undefined): ListStylePosition | undefined {
  if (!position) return undefined;
  const lower = position.toLowerCase() as ListStylePosition;
  return VALID_POSITIONS.includes(lower) ? lower : undefined;
}

export function normalizeListImage(image: string | null | undefined): string | undefined {
  if (image === null) return 'none';
  if (!image) return undefined;
  if (image === 'none') return 'none';
  return image.startsWith('url(') ? image : `url("${image}")`;
}

export function buildListItemStyles(config: ListItemConfig | ListStyleType): ListItemStyles {
  const normalized = normalizeListItemConfig(config);
  const styles: ListItemStyles = {};

  if (normalized.type !== undefined) {
    styles['list-style-type'] = normalized.type;
  }

  const position = normalizeListPosition(normalized.position);
  if (position) {
    styles['list-style-position'] = position;
  }

  const image = normalizeListImage(normalized.image);
  if (image !== undefined) {
    styles['list-style-image'] = image;
  }

  return styles;
}

export function listItemToCSS(config: ListItemConfig | ListStyleType): string {
  const styles = buildListItemStyles(config);
  return Object.entries(styles)
    .map(([prop, value]) => `${prop}: ${value};`)
    .join(' ');
}
