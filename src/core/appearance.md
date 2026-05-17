# appearance

Controls CSS `appearance`, `caret-color`, and `accent-color` properties for form element styling.

## Config

```ts
interface AppearanceConfig {
  appearance?: 'none' | 'auto' | 'menulist-button' | 'textfield';
  caretColor?: string | 'transparent' | 'auto';
  accentColor?: string | 'auto';
}
```

## Usage

```ts
import { buildAppearanceStyles, appearanceToCSS } from './appearance';

// Build styles as a plain object
const styles = buildAppearanceStyles({
  appearance: 'none',
  caretColor: '#0070f3',
  accentColor: 'teal',
});
// {
//   'appearance': 'none',
//   '-webkit-appearance': 'none',
//   'caret-color': '#0070f3',
//   'accent-color': 'teal',
// }

// Generate a CSS rule block
const css = appearanceToCSS('.my-input', {
  appearance: 'none',
  caretColor: 'blue',
});
// .my-input {
//   appearance: none;
//   -webkit-appearance: none;
//   caret-color: blue;
// }
```

## Notes

- `appearance: 'none'` automatically adds `-webkit-appearance: none` for cross-browser support.
- `caretColor` controls the blinking text cursor color inside inputs.
- `accentColor` applies to checkboxes, radios, range inputs, and progress elements.
- All color values are passed through as-is; use valid CSS color strings.
