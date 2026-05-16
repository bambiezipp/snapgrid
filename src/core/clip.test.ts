import { describe, it, expect } from 'vitest';
import {
  normalizeClipPath,
  buildClipStyles,
  clipToCSS,
} from './clip';

describe('normalizeClipPath', () => {
  it('returns keyword strings as-is', () => {
    expect(normalizeClipPath('none')).toBe('none');
    expect(normalizeClipPath('inherit')).toBe('inherit');
  });

  it('handles raw string values', () => {
    expect(normalizeClipPath('url(#mask)')).toBe('url(#mask)');
  });

  it('builds inset with defaults', () => {
    expect(normalizeClipPath({ type: 'inset' })).toBe('inset(0px 0px 0px 0px)');
  });

  it('builds inset with values and round', () => {
    const result = normalizeClipPath({ type: 'inset', top: 10, right: '20%', bottom: 0, left: 5, round: '4px' });
    expect(result).toBe('inset(10px 20% 0px 5px round 4px)');
  });

  it('builds circle with defaults', () => {
    expect(normalizeClipPath({ type: 'circle' })).toBe('circle(closest-side)');
  });

  it('builds circle with radius and position', () => {
    expect(normalizeClipPath({ type: 'circle', radius: '50%', at: 'center' })).toBe('circle(50% at center)');
  });

  it('builds ellipse with defaults', () => {
    expect(normalizeClipPath({ type: 'ellipse' })).toBe('ellipse(closest-side closest-side)');
  });

  it('builds ellipse with values and position', () => {
    const result = normalizeClipPath({ type: 'ellipse', rx: '40%', ry: 80, at: '50% 50%' });
    expect(result).toBe('ellipse(40% 80px at 50% 50%)');
  });

  it('builds polygon without fill rule', () => {
    const result = normalizeClipPath({ type: 'polygon', points: ['0 0', '100% 0', '100% 100%'] });
    expect(result).toBe('polygon(0 0, 100% 0, 100% 100%)');
  });

  it('builds polygon with fill rule', () => {
    const result = normalizeClipPath({ type: 'polygon', fillRule: 'evenodd', points: ['0 0', '100% 0', '50% 100%'] });
    expect(result).toBe('polygon(evenodd, 0 0, 100% 0, 50% 100%)');
  });
});

describe('buildClipStyles', () => {
  it('returns clipPath record', () => {
    expect(buildClipStyles('none')).toEqual({ clipPath: 'none' });
  });

  it('returns shape-based clipPath', () => {
    expect(buildClipStyles({ type: 'circle', radius: '50%' })).toEqual({ clipPath: 'circle(50%)' });
  });
});

describe('clipToCSS', () => {
  it('returns CSS string', () => {
    expect(clipToCSS('none')).toBe('clip-path: none;');
  });

  it('returns shape CSS string', () => {
    expect(clipToCSS({ type: 'inset', top: 0, round: '8px' }))
      .toBe('clip-path: inset(0px 0px 0px 0px round 8px);');
  });
});
