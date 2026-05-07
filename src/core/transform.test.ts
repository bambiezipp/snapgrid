import {
  normalizeTransform,
  buildTransformValue,
  buildTransformStyles,
  transformToCSS,
} from './transform';

describe('normalizeTransform', () => {
  it('wraps a string as translate', () => {
    expect(normalizeTransform('50px')).toEqual({ translate: '50px' });
  });

  it('returns object as-is', () => {
    const opts = { rotate: 45, scale: 1.2 };
    expect(normalizeTransform(opts)).toEqual(opts);
  });
});

describe('buildTransformValue', () => {
  it('returns none for empty options', () => {
    expect(buildTransformValue({})).toBe('none');
  });

  it('builds translateX for single string translate', () => {
    expect(buildTransformValue({ translate: '10px' })).toBe('translateX(10px)');
  });

  it('builds translate() for array', () => {
    expect(buildTransformValue({ translate: ['10px', '20px'] })).toBe(
      'translate(10px, 20px)'
    );
  });

  it('builds rotate with number (appends deg)', () => {
    expect(buildTransformValue({ rotate: 90 })).toBe('rotate(90deg)');
  });

  it('builds rotate with string as-is', () => {
    expect(buildTransformValue({ rotate: '0.5turn' })).toBe('rotate(0.5turn)');
  });

  it('builds scale with single value', () => {
    expect(buildTransformValue({ scale: 1.5 })).toBe('scale(1.5)');
  });

  it('builds scale with array', () => {
    expect(buildTransformValue({ scale: ['1.5', '2'] })).toBe('scale(1.5, 2)');
  });

  it('builds skewX for single value', () => {
    expect(buildTransformValue({ skew: '15deg' })).toBe('skewX(15deg)');
  });

  it('builds skew() for array', () => {
    expect(buildTransformValue({ skew: ['10deg', '5deg'] })).toBe(
      'skew(10deg, 5deg)'
    );
  });

  it('combines multiple transforms', () => {
    const result = buildTransformValue({ translate: ['0', '-50%'], rotate: 45 });
    expect(result).toBe('translate(0, -50%) rotate(45deg)');
  });
});

describe('buildTransformStyles', () => {
  it('includes transform-origin when provided', () => {
    const styles = buildTransformStyles({ rotate: 30, origin: 'top left' });
    expect(styles['transform-origin']).toBe('top left');
  });

  it('includes perspective when provided', () => {
    const styles = buildTransformStyles({ perspective: 500 });
    expect(styles['perspective']).toBe('500px');
  });

  it('does not include transform key when value is none', () => {
    const styles = buildTransformStyles({ origin: 'center' });
    expect(styles['transform']).toBeUndefined();
  });
});

describe('transformToCSS', () => {
  it('serializes styles to CSS string', () => {
    const css = transformToCSS({ rotate: 45 });
    expect(css).toContain('transform: rotate(45deg);');
  });

  it('handles string shorthand', () => {
    const css = transformToCSS('100px');
    expect(css).toContain('transform: translateX(100px);');
  });
});
