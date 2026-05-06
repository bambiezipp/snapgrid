import {
  toTimeValue,
  normalizeAnimationLayer,
  normalizeAnimation,
  layerToCSS,
  buildAnimationStyles,
  animationToCSS,
} from './animation';

describe('toTimeValue', () => {
  it('converts number to ms string', () => {
    expect(toTimeValue(300)).toBe('300ms');
  });

  it('passes through string values', () => {
    expect(toTimeValue('0.3s')).toBe('0.3s');
  });

  it('returns 0ms for undefined', () => {
    expect(toTimeValue(undefined)).toBe('0ms');
  });
});

describe('normalizeAnimationLayer', () => {
  it('fills in defaults', () => {
    const result = normalizeAnimationLayer({});
    expect(result.name).toBe('none');
    expect(result.easing).toBe('ease');
    expect(result.fill).toBe('none');
    expect(result.direction).toBe('normal');
    expect(result.playState).toBe('running');
  });

  it('preserves provided values', () => {
    const result = normalizeAnimationLayer({ name: 'fadeIn', duration: 400, fill: 'both' });
    expect(result.name).toBe('fadeIn');
    expect(result.duration).toBe(400);
    expect(result.fill).toBe('both');
  });
});

describe('normalizeAnimation', () => {
  it('handles string input', () => {
    const result = normalizeAnimation('slideIn');
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('slideIn');
  });

  it('handles array input', () => {
    const result = normalizeAnimation([{ name: 'a' }, { name: 'b' }]);
    expect(result).toHaveLength(2);
  });

  it('handles single object input', () => {
    const result = normalizeAnimation({ name: 'spin', iterations: 'infinite' });
    expect(result).toHaveLength(1);
  });
});

describe('buildAnimationStyles', () => {
  it('builds animation shorthand for simple name', () => {
    const styles = buildAnimationStyles('fadeIn');
    expect(styles.animation).toContain('fadeIn');
  });

  it('builds multiple layers separated by comma', () => {
    const styles = buildAnimationStyles([{ name: 'a', duration: 200 }, { name: 'b', duration: 400 }]);
    expect(styles.animation).toContain(',');
    expect(styles.animation).toContain('a');
    expect(styles.animation).toContain('b');
  });
});

describe('animationToCSS', () => {
  it('converts styles record to CSS string', () => {
    const css = animationToCSS({ animation: 'fadeIn 300ms ease' });
    expect(css).toBe('animation: fadeIn 300ms ease;');
  });
});
