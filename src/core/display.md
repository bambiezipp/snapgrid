# display

Controls CSS `display`, `float`, `clear`, and `vertical-align` properties.

## Types

```ts
interface DisplayConfig {
  display?: DisplayValue;      // 'flex' | 'grid' | 'block' | 'none' | ...
  float?: FloatValue;          // 'left' | 'right' | 'none' | 'inline-start' | 'inline-end'
  clear?: ClearValue;          // 'left' | 'right' | 'both' | 'none' | ...
  verticalAlign?: string;      // any valid CSS vertical-align value
}
```

## Usage

```ts
import { buildDisplayStyles, displayToCSS } from 'snapgrid/core/display';

// Object form
const styles = buildDisplayStyles({
  display: 'flex',
  float: 'left',
  clear: 'both',
  verticalAlign: 'middle',
});
// => { display: 'flex', float: 'left', clear: 'both', 'vertical-align': 'middle' }

// CSS string form
const css = displayToCSS({ display: 'grid' });
// => 'display: grid;'
```

## Supported `display` values

| Value          | Description                    |
|----------------|--------------------------------|
| `block`        | Block-level box                |
| `inline`       | Inline box                     |
| `inline-block` | Inline block box               |
| `flex`         | Block-level flex container     |
| `inline-flex`  | Inline flex container          |
| `grid`         | Block-level grid container     |
| `inline-grid`  | Inline grid container          |
| `contents`     | No box, children promoted      |
| `none`         | Element removed from layout    |
| `table`        | Table layout                   |
| `list-item`    | Generates a list-item box      |

## Notes

- Unknown `display` strings are passed through as-is for forward compatibility.
- Invalid `float` or `clear` values are silently omitted.
- `verticalAlign` accepts any string (e.g. `'top'`, `'4px'`, `'baseline'`).
