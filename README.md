# snapgrid

Lightweight CSS grid utility library with responsive snap points.

## Installation

```bash
npm install snapgrid
```

## Usage

Import the library and apply grid utilities directly in your TypeScript project:

```typescript
import 'snapgrid/dist/snapgrid.css';
import { createGrid } from 'snapgrid';

const grid = createGrid({
  columns: 12,
  gap: '1rem',
  snapPoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
});

grid.applyTo('#app');
```

Use the generated class names in your HTML:

```html
<div class="sg-grid">
  <div class="sg-col-12 sg-col-md-6 sg-col-lg-4">Column 1</div>
  <div class="sg-col-12 sg-col-md-6 sg-col-lg-4">Column 2</div>
  <div class="sg-col-12 sg-col-md-12 sg-col-lg-4">Column 3</div>
</div>
```

## Features

- Zero dependencies
- Fully typed TypeScript API
- Customizable responsive snap points
- Minimal CSS output

## License

MIT © snapgrid contributors