// src/index.ts — Public API for snapgrid

export { buildGridStyles, buildSnapCSS, camelToKebab } from './core/grid';
export { getPreset, listPresets, mergeWithPreset } from './core/presets';
export { mediaQueryMin, mediaQueryRange, sortedBreakpointKeys, mergeBreakpoints } from './core/breakpoints';
export { resolveValue, resolveResponsiveConfig, buildResponsiveCSS } from './core/responsive';
export { normalizeGap, buildGapStyles, gapToCSS } from './core/gap';
export { buildAlignmentStyles, buildItemAlignmentStyles, alignmentToCSS } from './core/alignment';
export { resolveColSpan, resolveRowSpan, buildSpanStyles, validateColSpan } from './core/span';
export { buildItemPlacement, buildContainerPlacement, placementToCSS } from './core/placement';
export { normalizeAutoFlow, buildAutoFlowStyles, autoFlowToCSS } from './core/autoflow';
export { normalizeTrackSize, buildMinMax, resolveTrackSizing, buildTrackTemplate, buildRepeat } from './core/minmax';
export { normalizeOrder, buildOrderStyles, buildZIndexStyles, orderToCSS } from './core/order';
export { normalizeVisibility, buildVisibilityStyles, buildDisplayStyles as buildVisibilityDisplayStyles } from './core/visibility';
export { normalizeOverflow, normalizeScrollValue, buildOverflowStyles, overflowToCSS } from './core/overflow';
export { validateAreaMap, buildTemplateAreas, buildTemplateStyles, buildAreaPlacement, listAreaNames } from './core/template';
export { normalizeDensity, resolveAutoFlow, buildDensityStyles, densityToCSS } from './core/density';
export { normalizeTrackValue, buildTrackList, buildSizingStyles, sizingToCSS } from './core/sizing';
export { toCSSValue, normalizePadding, buildPaddingStyles, paddingToCSS, mergePaddingConfigs } from './core/padding';
export { normalizeMargin, buildMarginStyles, marginToCSS } from './core/margin';
export { normalizeBorderValue, normalizeRadius, buildBorderStyles, borderToCSS } from './core/border';
export { normalizeShadowLayer, normalizeShadow, buildShadowStyles, shadowToCSS } from './core/shadow';
export { toTypographyValue, normalizeFontWeight, buildTypographyStyles, typographyToCSS } from './core/typography';
export { normalizeOpacity, normalizeBackdropBlur, buildColorStyles, colorToCSS } from './core/color';
export { toTimeValue, normalizeTransitionLayer, normalizeTransition, buildTransitionStyles, transitionToCSS } from './core/transition';
export { normalizeAnimationLayer, normalizeAnimation, layerToCSS, buildAnimationStyles } from './core/animation';
export { normalizeCursor, buildCursorStyles, isValidCursorKeyword, cursorToCSS } from './core/cursor';
export { normalizeAspectRatio, buildAspectStyles, aspectToCSS } from './core/aspect';
export { normalizePosition, toOffsetValue, buildPositionStyles, positionToCSS } from './core/position';
export { normalizeZIndex, buildZIndexStyles, zIndexToCSS } from './core/zindex';
export { normalizeTransform, buildTransformValue, buildTransformStyles, transformToCSS } from './core/transform';
export { normalizeFilterValue, buildFilterString, buildFilterStyles, filterToCSS } from './core/filter';
export { normalizeJustifyContent, normalizeAlignItems, buildFlexAlignStyles, flexAlignToCSS } from './core/flexalign';
export { normalizePointerEvents, normalizeUserSelect, normalizeTouchAction, buildPointerStyles, pointerToCSS } from './core/pointerevents';
export { toOutlineValue, normalizeOutline, buildOutlineStyles, outlineToCSS } from './core/outline';
export { normalizeBackground, buildBackgroundStyles, backgroundToCSS } from './core/background';
export { toDimensionValue, normalizeBoxSizing, buildBoxSizingStyles, boxSizingToCSS } from './core/boxsizing';
export { normalizeWhiteSpace, normalizeWordBreak, normalizeTextOverflow, buildWhitespaceStyles, whitespaceToCSS } from './core/whitespace';
export { normalizeListItemConfig, normalizeListPosition, normalizeListImage, buildListItemStyles, listItemToCSS } from './core/listitem';
export { toDecorationValue, normalizeTextDecoration, buildTextDecorationStyles, textDecorationToCSS } from './core/textdecoration';
export { normalizeColumnValue, buildColumnsTemplate, buildColumnsStyles, columnsToCSS } from './core/columns';
export { normalizeContentValue, normalizeQuotes, buildContentStyles, contentToCSS } from './core/content';
export { normalizeScrollBehavior, normalizeSnapType, buildScrollStyles, scrollToCSS } from './core/scroll';
export { normalizeIsolation, normalizeMixBlendMode, normalizeWillChange, buildIsolationStyles, isolationToCSS } from './core/isolation';
export { normalizeResize, buildResizeStyles, resizeToCSS } from './core/resize';
export { normalizeObjectFit, normalizeObjectPosition, buildObjectFitStyles, objectFitToCSS } from './core/objectfit';
export { normalizeClipPath, buildClipStyles, clipToCSS } from './core/clip';
export { normalizeAppearance, normalizeCaretColor, normalizeAccentColor, buildAppearanceStyles, appearanceToCSS } from './core/appearance';
export { normalizeTableLayout, buildTableLayoutStyles, tableLayoutToCSS } from './core/tableLayout';

// display module
export {
  normalizeDisplay,
  normalizeFloat,
  normalizeClear,
  buildDisplayStyles,
  displayToCSS,
} from './core/display';
export type { DisplayConfig, DisplayValue, FloatValue, ClearValue } from './core/display';
