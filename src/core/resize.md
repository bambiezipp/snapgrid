# resize

Controls whether and how an element can be resized by the user, along with optional dimension constraints.

## Types

```ts
type ResizeValue = 'none' | 'both' | 'horizontal' | 'vertical' | 'block' | 'inline';

interface ResizeConfig {
  resize?: ResizeValue;
  minWidth?: string | number;
  minHeight?: string | number;
  maxWidth?: string | number;
  maxHeight?: string | number;
}
```

## Functions

### `normalizeResize(value)`
Validates and returns a `ResizeValue`. Falls back to `'none'` for unknown inputs.

### `toDimensionValue(value)`
Converts a `number` to a `px` string, or passes strings through unchanged.

### `buildResizeStyles(config)`
Returns a `Record<string, string>` of CSS property/value pairs.
Automatically sets `overflow: auto` when `resize` is specified (required by browsers).

### `resizeToCSS(config)`
Serializes the config to an inline CSS string.

## Usage

```ts
import { buildResizeStyles } from 'snapgrid';

const styles = buildResizeStyles({
  resize: 'both',
  minWidth: 200,
  maxWidth: '80%',
  minHeight: 100,
});
// { resize: 'both', overflow: 'auto', 'min-width': '200px', 'max-width': '80%', 'min-height': '100px' }
```

## Notes

- `resize` requires a non-`visible` overflow; `overflow: auto` is injected automatically.
- Number values for dimension constraints are treated as pixel values.
- `block` and `inline` are logical properties (writing-mode aware) and may have limited browser support.
