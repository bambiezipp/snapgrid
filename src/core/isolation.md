# isolation

The `isolation` module provides utilities for controlling CSS stacking contexts, blend modes, and rendering hints.

## Types

### `IsolationConfig`

```ts
interface IsolationConfig {
  isolation?: "isolate" | "auto";
  mixBlendMode?: MixBlendMode;
  willChange?: string | string[];
}
```

## Functions

### `buildIsolationStyles(config)`

Returns a `Record<string, string>` of CSS properties based on the given config.

```ts
buildIsolationStyles({ isolation: "isolate", mixBlendMode: "multiply" });
// => { "isolation": "isolate", "mix-blend-mode": "multiply" }
```

### `isolationToCSS(config)`

Returns a single CSS declaration string.

```ts
isolationToCSS({ isolation: "isolate", willChange: "transform" });
// => "isolation: isolate; will-change: transform;"
```

## Blend Modes

Supported `mixBlendMode` values:

- `normal`, `multiply`, `screen`, `overlay`
- `darken`, `lighten`, `color-dodge`, `color-burn`
- `hard-light`, `soft-light`, `difference`, `exclusion`
- `hue`, `saturation`, `color`, `luminosity`

## `willChange`

Accepts either a single string or an array of property names:

```ts
buildIsolationStyles({ willChange: ["transform", "opacity"] });
// => { "will-change": "transform, opacity" }
```

## Notes

- `isolation: auto` is the default and will be omitted from output.
- Invalid blend modes are silently ignored.
- Empty `willChange` values are filtered out.
