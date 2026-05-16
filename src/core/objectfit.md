# objectfit

Utilities for controlling how replaced elements (images, videos) are sized and positioned within their containers using CSS `object-fit` and `object-position`.

## API

### `normalizeObjectFit(fit)`

Validates and returns a CSS `object-fit` keyword, or `undefined` if the value is not recognized.

**Valid values:** `fill` | `contain` | `cover` | `none` | `scale-down`

### `normalizeObjectPosition(position)`

Normalizes a position value into a CSS string.

- **String** — returned as-is (e.g. `'center'`, `'top right'`, `'50% 25%'`)
- **Object `{ x, y }`** — numeric values are converted to `px`, strings are used directly

### `buildObjectFitStyles(config)`

Returns a `Record<string, string>` of CSS property/value pairs from an `ObjectFitConfig`.

```ts
buildObjectFitStyles({ fit: 'cover', position: 'center' })
// => { 'object-fit': 'cover', 'object-position': 'center' }
```

### `objectFitToCSS(config)`

Serializes an `ObjectFitConfig` directly to a CSS declaration string.

```ts
objectFitToCSS({ fit: 'contain', position: { x: '50%', y: 0 } })
// => 'object-fit: contain; object-position: 50% 0px;'
```

## Types

```ts
type ObjectFitKeyword = 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';

type ObjectPositionValue =
  | string
  | { x: string | number; y: string | number };

interface ObjectFitConfig {
  fit?: ObjectFitKeyword;
  position?: ObjectPositionValue;
}
```
