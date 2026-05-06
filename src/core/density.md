# density

Controls how grid items are packed into the grid container using CSS `grid-auto-flow`, `grid-auto-rows`, and `grid-auto-columns`.

## Modes

| Mode       | `grid-auto-flow` | Description                                              |
|------------|------------------|----------------------------------------------------------|
| `sparse`   | `row`            | Default CSS behavior; items placed in order, no backfill |
| `dense`    | `row dense`      | Backfills gaps with smaller items                        |
| `balanced` | `row dense`      | Dense packing with `minmax(min-content, auto)` row sizing|

## Usage

```ts
import { normalizeDensity, buildDensityStyles, densityToCSS } from "./density";

// String shorthand
const config = normalizeDensity("dense");
const styles = buildDensityStyles(config);
console.log(densityToCSS(styles));
// grid-auto-flow: row dense;

// Full config with explicit row height
const config2 = normalizeDensity({ mode: "balanced", rowHeight: "120px" });
const styles2 = buildDensityStyles(config2);
console.log(densityToCSS(styles2));
// grid-auto-flow: row dense;
// grid-auto-rows: 120px;
```

## API

### `normalizeDensity(input)`
Accepts a `DensityMode` string or a full `DensityConfig` object. Returns a normalized `DensityConfig`.

### `resolveAutoFlow(mode)`
Maps a `DensityMode` to the corresponding CSS `grid-auto-flow` string value.

### `buildDensityStyles(config)`
Produces a `DensityStyles` object with only the relevant CSS properties set.

### `densityToCSS(styles)`
Serializes a `DensityStyles` object to a multi-line CSS declaration string.
