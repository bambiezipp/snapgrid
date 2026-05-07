# position

Utilities for controlling CSS positioning, offsets, and z-index.

## Types

### `PositionKeyword`
One of: `'static' | 'relative' | 'absolute' | 'fixed' | 'sticky'`

### `PositionConfig`
```ts
interface PositionConfig {
  position?: PositionKeyword;
  top?: number | string;
  right?: number | string;
  bottom?: number | string;
  left?: number | string;
  inset?: number | string; // shorthand, overrides individual offsets
  zIndex?: number | 'auto';
}
```

## Functions

### `normalizePosition(value)`
Returns a valid `PositionKeyword` or `undefined` if the input is not recognized.

### `toOffsetValue(value)`
Converts a numeric offset to a `px` string. Zero becomes `'0'`. Strings pass through unchanged.

### `buildPositionStyles(config)`
Returns a flat `Record<string, string>` of CSS property–value pairs.

- When `inset` is provided, individual side offsets (`top`, `right`, `bottom`, `left`) are ignored.
- Numeric `zIndex` values are stringified directly.

### `positionToCSS(config, selector)`
Formats the position styles into a complete CSS rule block string.

## Example

```ts
import { positionToCSS } from 'snapgrid/core/position';

positionToCSS({ position: 'sticky', top: 0, zIndex: 50 }, '.navbar');
// .navbar {
//   position: sticky;
//   top: 0;
//   z-index: 50;
// }
```
