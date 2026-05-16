# scroll

Utility for controlling scroll behavior and CSS scroll snap properties on grid containers and items.

## Types

### `ScrollConfig`

| Property          | Type                                      | Description                              |
|-------------------|-------------------------------------------|------------------------------------------|
| `behavior`        | `'auto' \| 'smooth' \| 'instant'`         | Controls scroll animation behavior       |
| `snapType`        | `'none' \| 'x' \| 'y' \| 'block' \| 'inline' \| 'both'` | Scroll snap axis         |
| `snapStrictness`  | `'mandatory' \| 'proximity'`              | How strictly snap points are enforced    |
| `snapAlign`       | `'none' \| 'start' \| 'end' \| 'center'` | Alignment of snap items                  |
| `snapStop`        | `'normal' \| 'always'`                    | Whether to stop at every snap point      |
| `overscroll`      | `'auto' \| 'contain' \| 'none'`           | Overscroll behavior on both axes         |
| `overscrollX`     | `'auto' \| 'contain' \| 'none'`           | Overscroll behavior on x-axis            |
| `overscrollY`     | `'auto' \| 'contain' \| 'none'`           | Overscroll behavior on y-axis            |

## Functions

### `buildScrollStyles(config: ScrollConfig): Record<string, string>`

Returns a map of CSS property names to values based on the provided config.

```ts
buildScrollStyles({ behavior: 'smooth', snapType: 'y', snapStrictness: 'mandatory' });
// { 'scroll-behavior': 'smooth', 'scroll-snap-type': 'y mandatory' }
```

### `scrollToCSS(config: ScrollConfig): string`

Returns a single CSS declaration string.

```ts
scrollToCSS({ snapAlign: 'start', overscroll: 'contain' });
// 'scroll-snap-align: start; overscroll-behavior: contain;'
```

### `normalizeSnapType(type, strictness?): string`

Combines a snap axis with a strictness modifier.

```ts
normalizeSnapType('x', 'mandatory'); // 'x mandatory'
normalizeSnapType('none');           // 'none'
```

## Usage with snapgrid

Apply scroll snap to a horizontal grid container:

```ts
const styles = buildScrollStyles({
  snapType: 'x',
  snapStrictness: 'mandatory',
  behavior: 'smooth',
  overscroll: 'contain',
});
```

Apply snap alignment to grid items:

```ts
const itemStyles = buildScrollStyles({
  snapAlign: 'start',
  snapStop: 'always',
});
```
