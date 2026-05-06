# Border Module

The `border` module provides utilities for applying CSS borders to grid containers and items.

## Types

### `BorderValue`
An object describing a border:
- `width` — number (px) or string (e.g. `"0.5rem"`)
- `style` — CSS border style (default: `"solid"`)
- `color` — CSS color (default: `"currentColor"`)

### `BorderConfig`
Configuration object for borders:
- `all` — applies to all sides via `border` shorthand
- `top`, `right`, `bottom`, `left` — per-side overrides
- `radius` — `border-radius` value (number → px, string used as-is)

## Functions

### `normalizeBorderValue(value)`
Converts a `BorderValue` object or string into a CSS border string.

```ts
normalizeBorderValue({ width: 2, style: "dashed", color: "red" });
// => "2px dashed red"
```

### `normalizeRadius(value)`
Converts a radius value to a CSS string.

```ts
normalizeRadius(8);     // => "8px"
normalizeRadius("50%"); // => "50%"
```

### `buildBorderStyles(config)`
Returns a `Record<string, string>` of CSS property/value pairs.

```ts
buildBorderStyles({ all: "1px solid #ccc", radius: 4 });
// => { border: "1px solid #ccc", "border-radius": "4px" }
```

### `borderToCSS(selector, config)`
Generates a full CSS block string.

```ts
borderToCSS(".grid", { top: { width: 2, color: "blue" } });
// => ".grid {\n  border-top: 2px solid blue;\n}"
```
