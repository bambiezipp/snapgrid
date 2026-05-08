# filter

Utility for generating CSS `filter` and `backdrop-filter` properties.

## API

### `FilterConfig`

```ts
interface FilterConfig {
  blur?: number | string;       // px by default
  brightness?: number;          // raw value e.g. 1.5
  contrast?: number;            // 0–1 fraction → percent, or string
  grayscale?: number;           // 0–1 fraction → percent, or string
  hueRotate?: number | string;  // deg by default
  invert?: number;              // 0–1 fraction → percent
  opacity?: number;             // 0–1 fraction → percent
  saturate?: number;            // 0–1 fraction → percent
  sepia?: number;               // 0–1 fraction → percent
  dropShadow?: string;          // raw shadow string
  backdrop?: Partial<Omit<FilterConfig, 'backdrop' | 'dropShadow'>>;
}
```

## Functions

### `normalizeFilterValue(key, value)`
Converts a single filter key/value pair into a CSS filter function string.

### `buildFilterString(config)`
Builds a complete filter string from a config object (excluding `backdrop`).

### `buildFilterStyles(config)`
Returns a `FilterStyles` record with `filter` and/or `backdrop-filter` keys.

### `filterToCSS(styles)`
Serializes a `FilterStyles` record to a CSS declaration string.

## Examples

```ts
buildFilterStyles({ blur: 4, brightness: 1.2 })
// { filter: 'blur(4px) brightness(1.2)' }

buildFilterStyles({ backdrop: { blur: 8 } })
// { 'backdrop-filter': 'blur(8px)' }

buildFilterStyles({ grayscale: 1, backdrop: { blur: 4, brightness: 0.8 } })
// { filter: 'grayscale(100%)', 'backdrop-filter': 'blur(4px) brightness(0.8)' }
```

## Notes
- Numeric values for `contrast`, `grayscale`, `invert`, `opacity`, `saturate`, `sepia` in range [0, 1] are converted to percentages.
- `blur` defaults to `px`, `hueRotate` defaults to `deg`.
- `dropShadow` is passed as a raw string.
