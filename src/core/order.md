# Order Module

The `order` module provides utilities for controlling the visual order of CSS grid items and managing z-index layering.

## Functions

### `normalizeOrder(value: OrderValue): number`

Converts an `OrderValue` (number or keyword) to its numeric CSS equivalent.

| Keyword  | CSS Value |
|----------|-----------|
| `first`  | `-9999`   |
| `last`   | `9999`    |
| `none`   | `0`       |

```ts
normalizeOrder('first'); // -9999
normalizeOrder(3);       // 3
```

### `buildOrderStyles(order, breakpoints?)`

Builds a map of order values, optionally responsive.

```ts
buildOrderStyles('last');
// { order: '9999' }

buildOrderStyles({ sm: 1, lg: 'first' }, { sm: '640px', lg: '1024px' });
// { sm: '1', lg: '-9999' }
```

### `buildZIndexStyles(zIndex, breakpoints?)`

Builds a map of z-index values, optionally responsive.

```ts
buildZIndexStyles(10);
// { 'z-index': '10' }
```

### `orderToCSS(styles, property?)`

Serializes the styles map to CSS declaration strings.

```ts
orderToCSS({ order: '2' });
// 'order: 2;'
```

## Usage with `snapgrid`

```ts
snapgrid({
  columns: 3,
  items: [
    { span: 2, order: 'first' },
    { span: 1, order: 1 },
  ]
});
```
