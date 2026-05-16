# content

Utility for CSS `content`, `quotes`, `counter-reset`, and `counter-increment` properties — primarily used for styling pseudo-elements (`::before`, `::after`) and CSS counters.

## Types

```ts
type ContentValue =
  | string
  | 'none' | 'normal'
  | 'open-quote' | 'close-quote'
  | 'no-open-quote' | 'no-close-quote';

interface ContentConfig {
  content?: ContentValue;
  quotes?: string | [string, string] | [string, string, string, string];
  counterReset?: string;
  counterIncrement?: string;
}
```

## Functions

### `normalizeContentValue(value)`
Converts a plain string to a CSS-quoted string. Keywords and CSS functions (e.g. `url()`, `counter()`, `attr()`) are passed through unchanged.

```ts
normalizeContentValue('hello')      // → '"hello"'
normalizeContentValue('none')       // → 'none'
normalizeContentValue('url(x.svg)') // → 'url(x.svg)'
```

### `normalizeQuotes(quotes)`
Accepts a raw string, a 2-tuple, or a 4-tuple of quote characters and returns the CSS `quotes` property value.

```ts
normalizeQuotes(['«', '»'])                    // → '"«" "»"'
normalizeQuotes(['"', '"', "'", "'"])          // → '""" """ "\'" "\'"'
```

### `buildContentStyles(config)`
Returns a `Record<string, string>` of CSS property/value pairs.

```ts
buildContentStyles({ content: 'open-quote', counterReset: 'section 0' })
// → { content: 'open-quote', 'counter-reset': 'section 0' }
```

### `contentToCSS(config)`
Serializes a `ContentConfig` to a single CSS declaration string.

```ts
contentToCSS({ content: 'none', counterReset: 'item' })
// → 'content: none; counter-reset: item;'
```

## Usage Example

```ts
import { buildContentStyles } from 'snapgrid';

const pseudoBefore = buildContentStyles({
  content: 'open-quote',
  quotes: ['\u201C', '\u201D'],
});
// { content: 'open-quote', quotes: '"\u201C" "\u201D"' }
```
