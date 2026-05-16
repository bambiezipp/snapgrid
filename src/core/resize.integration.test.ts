import { describe, it, expect } from 'vitest';
import { buildResizeStyles } from './resize';
import { buildOverflowStyles } from './overflow';
import { buildBoxSizingStyles } from './boxsizing';

describe('resize integration', () => {
  it('resize config does not conflict with explicit overflow config', () => {
    const resizeStyles = buildResizeStyles({ resize: 'both' });
    const overflowStyles = buildOverflowStyles({ x: 'hidden', y: 'scroll' });

    // Merging: explicit overflow should win over resize-injected auto
    const merged = { ...resizeStyles, ...overflowStyles };
    expect(merged['overflow-x']).toBe('hidden');
    expect(merged['overflow-y']).toBe('scroll');
    expect(merged['resize']).toBe('both');
  });

  it('resize with boxsizing produces complete layout constraint set', () => {
    const resizeStyles = buildResizeStyles({
      resize: 'horizontal',
      minWidth: 150,
      maxWidth: '600px',
    });
    const boxStyles = buildBoxSizingStyles({
      width: '100%',
      boxSizing: 'border-box',
    });

    const merged = { ...boxStyles, ...resizeStyles };
    expect(merged['resize']).toBe('horizontal');
    expect(merged['min-width']).toBe('150px');
    expect(merged['max-width']).toBe('600px');
    expect(merged['box-sizing']).toBe('border-box');
    expect(merged['width']).toBe('100%');
  });

  it('no resize key is emitted when resize is omitted', () => {
    const styles = buildResizeStyles({ minWidth: 100, maxHeight: '50vh' });
    expect('resize' in styles).toBe(false);
    expect('overflow' in styles).toBe(false);
  });

  it('vertical resize with min/max height constraints', () => {
    const styles = buildResizeStyles({
      resize: 'vertical',
      minHeight: '80px',
      maxHeight: 400,
    });
    expect(styles['resize']).toBe('vertical');
    expect(styles['min-height']).toBe('80px');
    expect(styles['max-height']).toBe('400px');
    expect(styles['overflow']).toBe('auto');
  });
});
