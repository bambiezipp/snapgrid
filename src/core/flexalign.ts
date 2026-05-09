/**
 * flexalign.ts
 * Utilities for controlling flex container and item alignment properties.
 */

export type JustifyContent =
  | 'start'
  | 'end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'
  | 'stretch';

export type AlignItems =
  | 'start'
  | 'end'
  | 'center'
  | 'baseline'
  | 'stretch';

export type AlignSelf = AlignItems | 'auto';

export type AlignContent =
  | 'start'
  | 'end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'
  | 'stretch'
  | 'normal';

export interface FlexAlignConfig {
  justifyContent?: JustifyContent;
  alignItems?: AlignItems;
  alignContent?: AlignContent;
  alignSelf?: AlignSelf;
  justifySelf?: 'auto' | 'start' | 'end' | 'center' | 'stretch';
}

const JUSTIFY_CONTENT_MAP: Record<JustifyContent, string> = {
  start: 'flex-start',
  end: 'flex-end',
  center: 'center',
  'space-between': 'space-between',
  'space-around': 'space-around',
  'space-evenly': 'space-evenly',
  stretch: 'stretch',
};

const ALIGN_ITEMS_MAP: Record<AlignItems, string> = {
  start: 'flex-start',
  end: 'flex-end',
  center: 'center',
  baseline: 'baseline',
  stretch: 'stretch',
};

export function normalizeJustifyContent(value: JustifyContent): string {
  return JUSTIFY_CONTENT_MAP[value] ?? value;
}

export function normalizeAlignItems(value: AlignItems): string {
  return ALIGN_ITEMS_MAP[value] ?? value;
}

export function buildFlexAlignStyles(
  config: FlexAlignConfig
): Record<string, string> {
  const styles: Record<string, string> = {};

  if (config.justifyContent) {
    styles['justify-content'] = normalizeJustifyContent(config.justifyContent);
  }
  if (config.alignItems) {
    styles['align-items'] = normalizeAlignItems(config.alignItems);
  }
  if (config.alignContent) {
    styles['align-content'] = config.alignContent === 'start'
      ? 'flex-start'
      : config.alignContent === 'end'
      ? 'flex-end'
      : config.alignContent;
  }
  if (config.alignSelf) {
    styles['align-self'] = config.alignSelf === 'start'
      ? 'flex-start'
      : config.alignSelf === 'end'
      ? 'flex-end'
      : config.alignSelf;
  }
  if (config.justifySelf) {
    styles['justify-self'] = config.justifySelf;
  }

  return styles;
}

export function flexAlignToCSS(config: FlexAlignConfig): string {
  const styles = buildFlexAlignStyles(config);
  return Object.entries(styles)
    .map(([k, v]) => `${k}: ${v};`)
    .join(' ');
}
