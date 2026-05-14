# listitem

Utilities for controlling CSS list-style properties on grid items or standalone elements.

## API

### `buildListItemStyles(config)`

Returns a `ListItemStyles` record of kebab-case CSS properties.

```ts
import { buildListItemStyles } from './listitem';

// Shorthand — type only
buildListItemStyles('decimal');
// => { 'list-style-type': 'decimal' }

// Full config
buildListItemStyles({ type: 'square', position: 'inside', image: null });
// => {
//   'list-style-type': 'square',
//   'list-style-position': 'inside',
//   'list-style-image': 'none',
// }
```

### `listItemToCSS(config)`

Serialises the result of `buildListItemStyles` into an inline CSS string.

```ts
import { listItemToCSS } from './listitem';

listItemToCSS({ type: 'disc', position: 'outside' });
// => 'list-style-type: disc; list-style-position: outside;'
```

## Types

```ts
interface ListItemConfig {
  type?: ListStyleType;      // 'none' | 'disc' | 'decimal' | … | string
  position?: 'inside' | 'outside';
  image?: string | null;     // null → 'none', string → url("…")
}
```

## Notes

- `image: null` explicitly sets `list-style-image: none`, removing any inherited image.
- Plain image paths (not starting with `url(`) are automatically wrapped: `url("path")`.
- Invalid `position` values are silently ignored and the property is omitted.
