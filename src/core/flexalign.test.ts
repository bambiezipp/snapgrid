import {
  normalizeJustifyContent,
  normalizeAlignItems,
  buildFlexAlignStyles,
  flexAlignToCSS,
} from './flexalign';

describe('normalizeJustifyContent', () => {
  it('maps start to flex-start', () => {
    expect(normalizeJustifyContent('start')).toBe('flex-start');
  });

  it('maps end to flex-end', () => {
    expect(normalizeJustifyContent('end')).toBe('flex-end');
  });

  it('passes through center unchanged', () => {
    expect(normalizeJustifyContent('center')).toBe('center');
  });

  it('passes through space-between unchanged', () => {
    expect(normalizeJustifyContent('space-between')).toBe('space-between');
  });
});

describe('normalizeAlignItems', () => {
  it('maps start to flex-start', () => {
    expect(normalizeAlignItems('start')).toBe('flex-start');
  });

  it('maps end to flex-end', () => {
    expect(normalizeAlignItems('end')).toBe('flex-end');
  });

  it('passes through baseline unchanged', () => {
    expect(normalizeAlignItems('baseline')).toBe('baseline');
  });
});

describe('buildFlexAlignStyles', () => {
  it('returns empty object for empty config', () => {
    expect(buildFlexAlignStyles({})).toEqual({});
  });

  it('builds justify-content style', () => {
    const result = buildFlexAlignStyles({ justifyContent: 'center' });
    expect(result['justify-content']).toBe('center');
  });

  it('builds align-items style', () => {
    const result = buildFlexAlignStyles({ alignItems: 'start' });
    expect(result['align-items']).toBe('flex-start');
  });

  it('builds align-content with start mapping', () => {
    const result = buildFlexAlignStyles({ alignContent: 'start' });
    expect(result['align-content']).toBe('flex-start');
  });

  it('builds align-self with end mapping', () => {
    const result = buildFlexAlignStyles({ alignSelf: 'end' });
    expect(result['align-self']).toBe('flex-end');
  });

  it('builds align-self auto passthrough', () => {
    const result = buildFlexAlignStyles({ alignSelf: 'auto' });
    expect(result['align-self']).toBe('auto');
  });

  it('builds justify-self passthrough', () => {
    const result = buildFlexAlignStyles({ justifySelf: 'stretch' });
    expect(result['justify-self']).toBe('stretch');
  });

  it('builds multiple styles at once', () => {
    const result = buildFlexAlignStyles({
      justifyContent: 'space-between',
      alignItems: 'center',
    });
    expect(result['justify-content']).toBe('space-between');
    expect(result['align-items']).toBe('center');
  });
});

describe('flexAlignToCSS', () => {
  it('produces CSS string from config', () => {
    const css = flexAlignToCSS({ justifyContent: 'end', alignItems: 'stretch' });
    expect(css).toContain('justify-content: flex-end;');
    expect(css).toContain('align-items: stretch;');
  });

  it('returns empty string for empty config', () => {
    expect(flexAlignToCSS({})).toBe('');
  });
});
