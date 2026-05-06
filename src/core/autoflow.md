# autoflow

Utilities for controlling CSS Grid **auto-placement** and **implicit track sizing**.

## API

### `normalizeAutoFlow(direction: string): AutoFlowDirection`

Validates a grid auto-flow direction string. Throws if the value is not one of the accepted CSS keywords.

```ts
normalizeAutoFlow('row dense'); // 'row dense'
normalizeAutoFlow('diagonal');  // throws Error
```

### `buildAutoFlowStyles(config: AutoFlowConfig): Record<string, string>`

Builds a plain CSS properties object from an `AutoFlowConfig`. Only defined properties are included.

```ts
buildAutoFlowStyles({ direction: 'column', autoRows: 'minmax(80px, auto)' });
// { 'grid-auto-flow': 'column', 'grid-auto-rows': 'minmax(80px, auto)' }
```

### `autoFlowToCSS(config: AutoFlowConfig): string`

Serializes an `AutoFlowConfig` directly to a CSS declaration string.

```ts
autoFlowToCSS({ direction: 'row dense', autoCols: '1fr' });
// 'grid-auto-flow: row dense; grid-auto-columns: 1fr;'
```

## Types

```ts
type AutoFlowDirection = 'row' | 'column' | 'row dense' | 'column dense';

interface AutoFlowConfig {
  direction?: AutoFlowDirection;
  autoRows?: string;
  autoCols?: string;
}
```

## Integration

Pass `AutoFlowConfig` values through `snapgrid()` options to control how the browser places items that overflow explicit grid tracks.
