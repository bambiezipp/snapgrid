# Padding Module

The `padding` module provides utilities for applying CSS padding to grid containers and items in a structured, type-safe way.

## Types

### `PaddingValue`
A `string` (e.g. `'1rem'`, `'8px'`) or `number` (converted to `px`, except `0`).

### `PaddingConfig`
```ts
interface PaddingConfig {
  all?: PaddingValue;    // shorthand for all sides
  x?: PaddingValue;     // left + right
  y?: PaddingValue;     // top + bottom
  top?: PaddingValue;
  right?: PaddingValue;
  bottom?: PaddingValue;
  left?: PaddingValue;
}
```

Specific sides (`top`, `right`, `bottom`, `left`) take precedence over `x`/`y` shorthands.

## Functions

### `normalizePadding(input)`
Converts a shorthand `PaddingValue` or `PaddingConfig` into a normalized `PaddingConfig`. Returns `{}` for `undefined`.

### `buildPaddingStyles(config)`
Returns a `Record<string, string>` of CSS property/value pairs.

- If `all` is set, returns `{ padding: value }` only.
- Otherwise resolves individual sides from `x`, `y`, and specific side keys.

### `paddingToCSS(config)`
Serializes a `PaddingConfig` to a CSS declaration string.

```ts
padding ToCSS({ x: '16px', y: '8px' });
// => 'padding-left: 16px; padding-right: 16px; padding-top: 8px; padding-bottom: 8px;'
```

## Usage

```ts
import { normalizePadding, buildPaddingStyles } from 'snapgrid/core/padding';

const config = normalizePadding({ x: '1rem', top: '2rem' });
const styles = buildPaddingStyles(config);
// { 'padding-left': '1rem', 'padding-right': '1rem', 'padding-top': '2rem' }
```
