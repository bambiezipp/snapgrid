# clip

CSS `clip-path` utility for the snapgrid library.

## Overview

The `clip` module provides helpers to build `clip-path` CSS values using typed shape configs or raw strings.

## Types

### `ClipConfig`

Accepts one of:
- A keyword string: `'none'`, `'inherit'`, `'initial'`, `'unset'`
- A raw CSS string (e.g. `'url(#mask)'`)
- A shape object: `ClipInset`, `ClipCircle`, `ClipEllipse`, or `ClipPolygon`

## Shape Objects

### `ClipInset`
```ts
{ type: 'inset', top?: string|number, right?: string|number, bottom?: string|number, left?: string|number, round?: string }
```

### `ClipCircle`
```ts
{ type: 'circle', radius?: string|number, at?: string }
```

### `ClipEllipse`
```ts
{ type: 'ellipse', rx?: string|number, ry?: string|number, at?: string }
```

### `ClipPolygon`
```ts
{ type: 'polygon', points: string[], fillRule?: 'nonzero' | 'evenodd' }
```

## API

### `normalizeClipPath(config: ClipConfig): string`
Converts a `ClipConfig` into a CSS `clip-path` value string.

### `buildClipStyles(config: ClipConfig): Record<string, string>`
Returns a style object `{ clipPath: '...' }`.

### `clipToCSS(config: ClipConfig): string`
Returns a CSS declaration string.

## Examples

```ts
normalizeClipPath('none');                          // 'none'
normalizeClipPath({ type: 'circle', radius: '50%', at: 'center' }); // 'circle(50% at center)'
normalizeClipPath({ type: 'inset', top: 10, round: '4px' });        // 'inset(10px 0px 0px 0px round 4px)'
normalizeClipPath({ type: 'polygon', points: ['0 0','100% 0','50% 100%'] }); // 'polygon(0 0, 100% 0, 50% 100%)'
```
