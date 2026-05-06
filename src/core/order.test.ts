import { describe, it, expect } from 'vitest';
import {
  normalizeOrder,
  buildOrderStyles,
  buildZIndexStyles,
  orderToCSS,
} from './order';

describe('normalizeOrder', () => {
  it('returns number as-is', () => {
    expect(normalizeOrder(3)).toBe(3);
    expect(normalizeOrder(-1)).toBe(-1);
  });

  it('maps "first" to -9999', () => {
    expect(normalizeOrder('first')).toBe(-9999);
  });

  it('maps "last" to 9999', () => {
    expect(normalizeOrder('last')).toBe(9999);
  });

  it('maps "none" to 0', () => {
    expect(normalizeOrder('none')).toBe(0);
  });
});

describe('buildOrderStyles', () => {
  it('handles a plain number', () => {
    const result = buildOrderStyles(2);
    expect(result['order']).toBe('2');
  });

  it('handles keyword "first"', () => {
    const result = buildOrderStyles('first');
    expect(result['order']).toBe('-9999');
  });

  it('handles responsive object', () => {
    const breakpoints = { sm: '640px', lg: '1024px' };
    const result = buildOrderStyles({ sm: 1, lg: 'last' }, breakpoints);
    expect(result['sm']).toBe('1');
    expect(result['lg']).toBe('9999');
  });
});

describe('buildZIndexStyles', () => {
  it('handles a plain number', () => {
    const result = buildZIndexStyles(10);
    expect(result['z-index']).toBe('10');
  });

  it('handles responsive object with breakpoints', () => {
    const breakpoints = { md: '768px', xl: '1280px' };
    const result = buildZIndexStyles({ md: 5, xl: 10 }, breakpoints);
    expect(result['md']).toBe('5');
    expect(result['xl']).toBe('10');
  });
});

describe('orderToCSS', () => {
  it('generates CSS declaration', () => {
    const css = orderToCSS({ order: '3' });
    expect(css).toContain('order: 3;');
  });

  it('uses custom property name', () => {
    const css = orderToCSS({ 'z-index': '5' }, 'z-index');
    expect(css).toContain('z-index: 5;');
  });
});
