# minmax

Utilities for building CSS `minmax()` and track sizing expressions used in CSS Grid layouts.

## Overview

The `minmax` module provides helpers to define grid track sizes using CSS's `minmax()` function, `repeat()`, and other sizing keywords. It integrates with `buildGridStyles` in `grid.ts` to support flexible column and row definitions.

## API

### `normalizeTrackSize(value: TrackSize): string`

Converts a `TrackSize` (string or number) to a valid CSS value. Numbers are converted to `px` units; `0` becomes `"0"`.

### `buildMinMax(options: MinMaxOptions): string`

Builds a CSS `minmax(min, max)` expression from a `MinMaxOptions` object.

```ts
buildMinMax({ min: 0, max: "1fr" }); // => "minmax(0, 1fr)"
```

### `resolveTrackSizing(value: TrackSizingValue): string`

Resolves any `TrackSizingValue` — plain string, number, or `MinMaxOptions` — to a CSS string.

### `buildTrackTemplate(tracks: TrackSizingValue[]): string`

Builds a full `grid-template-columns` or `grid-template-rows` value from an array of track sizes.

```ts
buildTrackTemplate(["1fr", { min: 0, max: "1fr" }, "auto"]);
// => "1fr minmax(0, 1fr) auto"
```

### `buildRepeat(count, trackSize): string`

Builds a CSS `repeat()` expression.

```ts
buildRepeat("auto-fill", { min: "200px", max: "1fr" });
// => "repeat(auto-fill, minmax(200px, 1fr))"
```

### `buildColumnTemplate(columns, trackSize?): string`

Convenience helper to define column templates:
- Pass a **number** to generate equal-width columns (`repeat(n, 1fr)` by default).
- Pass an **array** for explicit per-column sizing.

```ts
buildColumnTemplate(3);               // => "repeat(3, 1fr)"
buildColumnTemplate(3, "200px");      // => "repeat(3, 200px)"
buildColumnTemplate(["1fr", "2fr"]); // => "1fr 2fr"
```
