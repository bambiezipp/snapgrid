# textdecoration

Controls CSS text decoration properties including line style, color, thickness, and underline offset.

## Types

```ts
interface TextDecorationConfig {
  line?: "none" | "underline" | "overline" | "line-through" | "underline overline";
  style?: "solid" | "double" | "dotted" | "dashed" | "wavy";
  color?: string;
  thickness?: string | number;
  offset?: string | number;
}

type TextDecorationInput = TextDecorationConfig | "none" | "underline" | "overline" | "line-through";
```

## Functions

### `normalizeTextDecoration(input)`

Normalizes a string shorthand or config object into a `TextDecorationConfig`.

```ts
normalizeTextDecoration("underline"); // { line: "underline" }
normalizeTextDecoration("none");      // { line: "none" }
```

### `buildTextDecorationStyles(config)`

Converts a `TextDecorationConfig` into a flat CSS properties record.
Numeric values for `thickness` and `offset` are automatically converted to `px`.

```ts
buildTextDecorationStyles({ line: "underline", style: "wavy", color: "red", thickness: 2, offset: 4 });
// {
//   "text-decoration-line": "underline",
//   "text-decoration-style": "wavy",
//   "text-decoration-color": "red",
//   "text-decoration-thickness": "2px",
//   "text-underline-offset": "4px"
// }
```

### `textDecorationToCSS(input)`

Convenience wrapper combining `normalizeTextDecoration` and `buildTextDecorationStyles`.

```ts
textDecorationToCSS("line-through");
// { "text-decoration-line": "line-through" }

textDecorationToCSS({ line: "underline", style: "dotted", color: "currentColor" });
// { "text-decoration-line": "underline", "text-decoration-style": "dotted", "text-decoration-color": "currentColor" }
```
