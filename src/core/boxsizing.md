# boxsizing

The `boxsizing` module provides utilities for controlling CSS box model sizing properties including `box-sizing`, `width`, `height`, and min/max constraints.

## API

### `BoxSizingConfig`

```ts
interface BoxSizingConfig {
  boxSizing?: "border-box" | "content-box"; // default: "border-box"
  width?: string | number;
  height?: string | number;
  minWidth?: string | number;
  maxWidth?: string | number;
  minHeight?: string | number;
  maxHeight?: string | number;
}
```

Numeric values are automatically converted to `px` units. The value `0` is emitted as `"0"` (no unit).

### `toDimensionValue(value)`

Converts a `number` to a `px` string, or trims and returns a `string` as-is.

```ts
toDimensionValue(320);    // "320px"
toDimensionValue(0);      // "0"
toDimensionValue("50%");  // "50%"
```

### `buildBoxSizingStyles(config)`

Returns a flat `Record<string, string>` of CSS property/value pairs.

```ts
buildBoxSizingStyles({ width: 640, maxWidth: "100%" });
// { "box-sizing": "border-box", "width": "640px", "max-width": "100%" }
```

### `boxSizingToCSS(config)`

Serializes the config to an inline CSS declaration block string.

```ts
boxSizingToCSS({ width: 320, height: "100vh" });
// "box-sizing: border-box; width: 320px; height: 100vh;"
```

## Notes

- `box-sizing` defaults to `"border-box"` for predictable layout behaviour.
- Only properties explicitly set in the config are included in the output.
