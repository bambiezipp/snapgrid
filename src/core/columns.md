# columns

Utilities for defining CSS grid column layouts in snapgrid.

## Overview

The `columns` module provides helpers to generate `grid-template-columns` values from simple numeric counts, raw CSS strings, or structured config objects with responsive snap points.

## API

### `normalizeColumnValue(value: number | string): string`

Converts a column value to a CSS string.

- `number` → `repeat(n, 1fr)`
- `string` → returned as-is

```ts
normalizeColumnValue(3);           // "repeat(3, 1fr)"
normalizeColumnValue("1fr 2fr");   // "1fr 2fr"
```

### `buildColumnsTemplate(config: ColumnsConfig): string`

Builds a `grid-template-columns` value from a `ColumnsConfig` object.

```ts
buildColumnsTemplate({ count: 4 });
// "repeat(4, 1fr)"

buildColumnsTemplate({ minWidth: "200px", repeat: "auto-fill" });
// "repeat(auto-fill, minmax(200px, 1fr))"
```

### `buildColumnsStyles(config): Record<string, string>`

Returns a CSS properties record suitable for inline styles or style injection.

```ts
buildColumnsStyles(3);
// { gridTemplateColumns: "repeat(3, 1fr)" }

buildColumnsStyles({ minWidth: "150px", maxWidth: "300px", repeat: "auto-fit" });
// { gridTemplateColumns: "repeat(auto-fit, minmax(150px, 300px))" }
```

### `columnsToCSS(config): string`

Serializes column styles to a CSS declaration string.

```ts
columnsToCSS(2);
// "grid-template-columns: repeat(2, 1fr);"
```

## ColumnsConfig

| Property   | Type                       | Default       | Description                          |
|------------|----------------------------|---------------|--------------------------------------|
| `count`    | `number \| string`         | —             | Explicit column count or template    |
| `minWidth` | `string`                   | `"0px"`       | Minimum column width for minmax()    |
| `maxWidth` | `string`                   | `"1fr"`       | Maximum column width for minmax()    |
| `repeat`   | `"auto-fill" \| "auto-fit"` | `"auto-fill"` | CSS repeat strategy                  |
