// snapgrid — main entry point
// Re-exports all public utilities

export { buildGridStyles, buildSnapCSS } from './core/grid';
export { getPreset, listPresets, mergeWithPreset } from './core/presets';
export { mediaQueryMin, mediaQueryRange, sortedBreakpointKeys, mergeBreakpoints } from './core/breakpoints';
export { resolveValue, resolveResponsiveConfig, buildResponsiveCSS } from './core/responsive';
export { normalizeGap, buildGapStyles, gapToCSS } from './core/gap';
export { buildAlignmentStyles, buildItemAlignmentStyles, alignmentToCSS } from './core/alignment';
export { resolveColSpan, resolveRowSpan, buildSpanStyles, validateColSpan } from './core/span';
export { buildItemPlacement, buildContainerPlacement, placementToCSS } from './core/placement';
export { normalizeAutoFlow, buildAutoFlowStyles, autoFlowToCSS } from './core/autoflow';
export { normalizeTrackSize, buildMinMax, resolveTrackSizing, buildTrackTemplate } from './core/minmax';
export { normalizeOrder, buildOrderStyles, buildZIndexStyles, orderToCSS } from './core/order';
export { normalizeVisibility, buildVisibilityStyles, buildDisplayStyles } from './core/visibility';
export { normalizeOverflow, buildOverflowStyles, overflowToCSS } from './core/overflow';
export { validateAreaMap, buildTemplateAreas, buildTemplateStyles, buildAreaPlacement, listAreaNames } from './core/template';
export { normalizeDensity, resolveAutoFlow, buildDensityStyles, densityToCSS } from './core/density';
export { normalizeTrackValue, buildTrackList, buildSizingStyles, sizingToCSS } from './core/sizing';
export { normalizePadding, buildPaddingStyles, paddingToCSS } from './core/padding';
export { normalizeMargin, buildMarginStyles, marginToCSS } from './core/margin';
export { normalizeBorderValue, normalizeRadius, buildBorderStyles, borderToCSS } from './core/border';
export { normalizeShadow, buildShadowStyles, shadowToCSS } from './core/shadow';
export { buildTypographyStyles, typographyToCSS } from './core/typography';
export { normalizeOpacity, normalizeBackdropBlur, buildColorStyles, colorToCSS } from './core/color';
export { normalizeTransition, buildTransitionStyles, transitionToCSS } from './core/transition';
export { normalizeAnimation, buildAnimationStyles, animationToCSS } from './core/animation';
export { normalizeCursor, buildCursorStyles, cursorToCSS } from './core/cursor';
export { normalizeAspectRatio, buildAspectStyles, aspectToCSS } from './core/aspect';
export { normalizePosition, buildPositionStyles, positionToCSS } from './core/position';
export { normalizeZIndex, buildZIndexStyles, zIndexToCSS } from './core/zindex';
export { normalizeTransform, buildTransformStyles, transformToCSS } from './core/transform';
export { normalizeFilterValue, buildFilterString, buildFilterStyles, filterToCSS } from './core/filter';
export type { FilterConfig, FilterStyles } from './core/filter';

export { snapgrid } from './core/snapgrid';
