# template

The `template` module provides utilities for defining and applying **CSS Grid named template areas** in snapgrid.

## Overview

Named template areas let you visually map out the layout of your grid using human-readable names, making complex layouts easier to reason about.

## API

### `buildTemplateAreas(areas: GridAreaMap): string`

Converts a 2D array of area names into a CSS `grid-template-areas` string.

```ts
buildTemplateAreas([
  ['header', 'header'],
  ['sidebar', 'main'],
  ['footer', 'footer'],
]);
// => '"header header" "sidebar main" "footer footer"'
```

Use `.` for empty/unnamed cells:

```ts
buildTemplateAreas([['nav', '.'], ['nav', 'main']]);
// => '"nav ." "nav main"'
```

### `buildTemplateStyles(areas: GridAreaMap): TemplateStyles`

Returns a CSS-in-JS style object for use on a grid container.

```ts
buildTemplateStyles([['a', 'b'], ['c', 'd']]);
// => { gridTemplateAreas: '"a b" "c d"' }
```

### `buildAreaPlacement(name: string): AreaPlacement`

Returns a CSS-in-JS style object assigning a grid item to a named area.

```ts
buildAreaPlacement('sidebar');
// => { gridArea: 'sidebar' }
```

### `listAreaNames(areas: GridAreaMap): string[]`

Extracts all unique named areas from a map, excluding `.` placeholders.

### `templateToCSS(styles: TemplateStyles): string`

Serializes a `TemplateStyles` object to a raw CSS declaration string.

## Notes

- All rows in the area map must have the same number of columns (rectangular). An error is thrown otherwise.
- Area names should be valid CSS ident strings.
