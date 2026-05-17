import { describe, it, expect } from 'vitest';
import { buildDisplayStyles } from './display';
import { buildFlexAlignStyles } from './flexalign';
import { buildPositionStyles } from './position';

describe('display integration', () => {
  it('display:flex pairs correctly with flex alignment', () => {
    const display = buildDisplayStyles({ display: 'flex' });
    const align = buildFlexAlignStyles({
      justifyContent: 'center',
      alignItems: 'stretch',
    });
    const merged = { ...display, ...align };
    expect(merged['display']).toBe('flex');
    expect(merged['justify-content']).toBe('center');
    expect(merged['align-items']).toBe('stretch');
  });

  it('display:none overrides position styles visually', () => {
    const display = buildDisplayStyles({ display: 'none' });
    const position = buildPositionStyles({ position: 'absolute', top: 0, left: 0 });
    const merged = { ...position, ...display };
    expect(merged['display']).toBe('none');
    expect(merged['position']).toBe('absolute');
  });

  it('float and clear work together', () => {
    const styles = buildDisplayStyles({
      display: 'block',
      float: 'left',
      clear: 'left',
    });
    expect(styles['float']).toBe('left');
    expect(styles['clear']).toBe('left');
  });

  it('inline-grid display is valid', () => {
    const styles = buildDisplayStyles({ display: 'inline-grid' });
    expect(styles['display']).toBe('inline-grid');
  });

  it('verticalAlign is preserved as-is', () => {
    const styles = buildDisplayStyles({ verticalAlign: '4px' });
    expect(styles['vertical-align']).toBe('4px');
  });
});
