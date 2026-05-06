# animation

The `animation` module provides utilities for defining CSS animations on grid items or containers.

## Types

### `AnimationLayer`

Represents a single CSS animation layer:

| Property    | Type                        | Default     |
|-------------|----------------------------|-------------|
| `name`      | `string`                   | `'none'`    |
| `duration`  | `number \| string`         | `0`         |
| `delay`     | `number \| string`         | `0`         |
| `easing`    | `string`                   | `'ease'`    |
| `iterations`| `number \| 'infinite'`    | `1`         |
| `fill`      | `AnimationFillMode`        | `'none'`    |
| `direction` | `AnimationDirection`       | `'normal'`  |
| `playState` | `AnimationPlayState`       | `'running'` |

### `AnimationInput`

Accepts a single `AnimationLayer`, an array of layers, or a shorthand string (animation name only).

## Functions

### `normalizeAnimation(input)`

Normalizes any `AnimationInput` into an array of `AnimationLayer` objects.

### `buildAnimationStyles(input)`

Builds a `Record<string, string>` containing the `animation` CSS shorthand.

```ts
buildAnimationStyles({ name: 'fadeIn', duration: 300, fill: 'both' });
// => { animation: 'fadeIn 300ms ease 0ms 1 both normal running' }
```

### `animationToCSS(styles)`

Converts a styles record to a CSS declaration string.

```ts
animationToCSS({ animation: 'fadeIn 300ms ease' });
// => 'animation: fadeIn 300ms ease;'
```

## Notes

- Numeric `duration` and `delay` values are treated as milliseconds.
- Multiple animation layers are joined with `, ` in the output.
