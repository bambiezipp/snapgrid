# whitespace

Controls CSS white-space handling, word-break behavior, and text-overflow for grid items and containers.

## Types

```ts
interface WhitespaceConfig {
  whiteSpace?: 'normal' | 'nowrap' | 'pre' | 'pre-wrap' | 'pre-line' | 'break-spaces';
  wordBreak?: 'normal' | 'break-all' | 'keep-all' | 'break-word';
  textOverflow?: 'clip' | 'ellipsis' | string;
  truncate?: boolean;
}
```

## Functions

### `normalizeWhiteSpace(value)`
Validates and returns a `WhiteSpaceValue` or `undefined` if invalid.

### `normalizeWordBreak(value)`
Validates and returns a `WordBreakValue` or `undefined` if invalid.

### `normalizeTextOverflow(value)`
Accepts `'clip'`, `'ellipsis'`, or any custom string. Returns `undefined` for empty/non-string input.

### `buildWhitespaceStyles(config)`
Returns a `WhitespaceStyles` object with CSS property keys.

- When `truncate: true` is set, it automatically applies:
  - `white-space: nowrap`
  - `text-overflow: ellipsis`
  - `overflow: hidden`
- When `textOverflow` is set without explicit `overflow`, `overflow: hidden` is added automatically.

### `whitespaceToCSS(config)`
Serializes the config to an inline CSS string.

## Examples

```ts
buildWhitespaceStyles({ truncate: true });
// { 'white-space': 'nowrap', 'text-overflow': 'ellipsis', overflow: 'hidden' }

buildWhitespaceStyles({ whiteSpace: 'pre-wrap', wordBreak: 'break-all' });
// { 'white-space': 'pre-wrap', 'word-break': 'break-all' }

whitespaceToCSS({ textOverflow: 'ellipsis' });
// 'text-overflow: ellipsis; overflow: hidden;'
```
