# zindex

Utilities for managing `z-index` and CSS stacking contexts in snapgrid.

## API

### `normalizeZIndex(value)`

Normalizes a z-index value to a CSS string.

- Accepts integers (positive, negative, zero) or CSS keywords: `auto`, `inherit`, `initial`, `unset`.
- Throws `RangeError` for non-integer numbers.
- Throws `TypeError` for unrecognized string values.

### `buildZIndexStyles(config)`

Builds a flat CSS style object from a `ZIndexConfig`.

| Option           | Type           | Description                                          |
|------------------|----------------|------------------------------------------------------|
| `zIndex`         | `ZIndexValue`  | The z-index value to apply.                          |
| `isolate`        | `boolean`      | Sets `isolation: isolate` to create a stacking context. |
| `stackingContext` | `boolean`     | Like `isolate`, but also adds `transform: translateZ(0)` as a fallback. |

### `zIndexToCSS(styles)`

Serializes a `ZIndexStyles` object to a CSS declaration string.

## Usage

```ts
import { buildZIndexStyles, zIndexToCSS } from 'snapgrid/core/zindex';

const styles = buildZIndexStyles({ zIndex: 100, isolate: true });
console.log(zIndexToCSS(styles));
// z-index: 100; isolation: isolate;
```

## Notes

- Use `isolate: true` when you want a stacking context without affecting paint.
- Use `stackingContext: true` for broader browser compatibility via the transform hack.
- Both `isolate` and `stackingContext` can be combined with a `zIndex` value.
