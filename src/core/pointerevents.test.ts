import {
  normalizePointerEvents,
  normalizeUserSelect,
  normalizeTouchAction,
  buildPointerStyles,
  pointerToCSS,
} from './pointerevents';

describe('normalizePointerEvents', () => {
  it('returns valid pointer-events values as-is', () => {
    expect(normalizePointerEvents('none')).toBe('none');
    expect(normalizePointerEvents('all')).toBe('all');
    expect(normalizePointerEvents('inherit')).toBe('inherit');
    expect(normalizePointerEvents('auto')).toBe('auto');
  });

  it('falls back to auto for invalid values', () => {
    expect(normalizePointerEvents('invalid')).toBe('auto');
    expect(normalizePointerEvents(null)).toBe('auto');
    expect(normalizePointerEvents(undefined)).toBe('auto');
    expect(normalizePointerEvents(42)).toBe('auto');
  });
});

describe('normalizeUserSelect', () => {
  it('returns valid user-select values as-is', () => {
    expect(normalizeUserSelect('none')).toBe('none');
    expect(normalizeUserSelect('text')).toBe('text');
    expect(normalizeUserSelect('all')).toBe('all');
    expect(normalizeUserSelect('contain')).toBe('contain');
  });

  it('falls back to auto for invalid values', () => {
    expect(normalizeUserSelect('bogus')).toBe('auto');
    expect(normalizeUserSelect(undefined)).toBe('auto');
  });
});

describe('normalizeTouchAction', () => {
  it('returns the string value trimmed', () => {
    expect(normalizeTouchAction('pan-x')).toBe('pan-x');
    expect(normalizeTouchAction('  manipulation  ')).toBe('manipulation');
    expect(normalizeTouchAction('none')).toBe('none');
  });

  it('falls back to auto for empty or invalid values', () => {
    expect(normalizeTouchAction('')).toBe('auto');
    expect(normalizeTouchAction(null)).toBe('auto');
    expect(normalizeTouchAction(undefined)).toBe('auto');
  });
});

describe('buildPointerStyles', () => {
  it('builds pointer-events style', () => {
    const result = buildPointerStyles({ pointerEvents: 'none' });
    expect(result['pointer-events']).toBe('none');
  });

  it('builds user-select with vendor prefix', () => {
    const result = buildPointerStyles({ userSelect: 'none' });
    expect(result['user-select']).toBe('none');
    expect(result['-webkit-user-select']).toBe('none');
  });

  it('builds touch-action style', () => {
    const result = buildPointerStyles({ touchAction: 'pan-y' });
    expect(result['touch-action']).toBe('pan-y');
  });

  it('returns empty object when no config provided', () => {
    expect(buildPointerStyles({})).toEqual({});
  });

  it('combines all properties', () => {
    const result = buildPointerStyles({
      pointerEvents: 'none',
      userSelect: 'none',
      touchAction: 'none',
    });
    expect(Object.keys(result)).toHaveLength(4);
  });
});

describe('pointerToCSS', () => {
  it('returns a CSS string', () => {
    const css = pointerToCSS({ pointerEvents: 'none', userSelect: 'none' });
    expect(css).toContain('pointer-events: none;');
    expect(css).toContain('user-select: none;');
    expect(css).toContain('-webkit-user-select: none;');
  });

  it('returns empty string for empty config', () => {
    expect(pointerToCSS({})).toBe('');
  });
});
