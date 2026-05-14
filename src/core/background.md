# background

Utility for generating CSS background styles from a config object or shorthand string.

## Types

```ts
interface BackgroundConfig {
  color?: string;
  image?: string;
  size?: "cover" | "contain" | "auto" | string;
  position?: string;
  repeat?: "repeat" | "no-repeat" | "repeat-x" | "repeat-y" | "round" | "space";
  attachment?: "scroll" | "fixed" | "local";
  origin?: "border-box" | "padding-box" | "content-box";
  clip?: "border-box" | "padding-box" | "content-box" | "text";
  gradient?: string;
}

type BackgroundInput = string | BackgroundConfig;
```

## Functions

### `normalizeBackground(input)`

Converts a string shorthand or `BackgroundConfig` into a normalized `BackgroundConfig`.

- A hex/rgb/hsl string → `{ color }`
- A `url(...)` or gradient string → `{ image }`
- An object is returned as-is (shallow copy)

### `buildBackgroundStyles(input)`

Returns a `Record<string, string>` of CSS property/value pairs.

- When both `gradient` and `image` are set, `gradient` takes precedence for `background-image`.
- Only defined properties are included in the output.

### `backgroundToCSS(input)`

Returns a single CSS declaration string, e.g.:

```
background-color: #fff; background-size: cover;
```

## Example

```ts
import { buildBackgroundStyles } from "snapgrid";

const styles = buildBackgroundStyles({
  gradient: "linear-gradient(to right, #e66465, #9198e5)",
  size: "cover",
  position: "center",
  repeat: "no-repeat",
});
// {
//   "background-image": "linear-gradient(to right, #e66465, #9198e5)",
//   "background-size": "cover",
//   "background-position": "center",
//   "background-repeat": "no-repeat"
// }
```
