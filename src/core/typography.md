# Typography

The `typography` module provides utilities for applying typographic CSS properties to grid containers and items.

## API

### `TypographyOptions`

```ts
interface TypographyOptions {
  fontSize?: string | number;       // e.g. 16 → '16px', or '1rem'
  lineHeight?: string | number;     // e.g. 1.5 or '24px'
  textAlign?: 'left' | 'center' | 'right' | 'justify' | 'start' | 'end';
  fontWeight?: 'normal' | 'bold' | 'lighter' | 'bolder' | number;
  letterSpacing?: string | number;  // e.g. 2 → '2px', or '0.05em'
  textTransform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
  truncate?: boolean;               // Adds overflow ellipsis styles
}
```

### `buildTypographyStyles(options)`

Converts a `TypographyOptions` object into a flat CSS property map.

```ts
buildTypographyStyles({ fontSize: 16, textAlign: 'center', truncate: true });
// → { 'font-size': '16px', 'text-align': 'center', 'overflow': 'hidden', ... }
```

### `typographyToCSS(styles)`

Serializes the styles map into a CSS declaration string.

```ts
typographyToCSS({ 'font-size': '16px', 'text-align': 'center' });
// → 'font-size: 16px; text-align: center;'
```

### `toTypographyValue(value)`

Converts a number to a `px` string; strings are returned as-is.

### `normalizeFontWeight(weight)`

Validates and normalizes a font-weight value. Throws if a numeric weight is outside the range 1–1000.

## Usage with snapgrid

```ts
import { snapgrid } from 'snapgrid';

const css = snapgrid({
  columns: 3,
  typography: {
    fontSize: '1rem',
    lineHeight: 1.6,
    textAlign: 'center',
  },
});
```
