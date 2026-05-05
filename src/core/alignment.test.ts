import {
  buildAlignmentStyles,
  buildItemAlignmentStyles,
  alignmentToCSS,
} from './alignment';

describe('buildAlignmentStyles', () => {
  it('returns empty object when no options provided', () => {
    expect(buildAlignmentStyles({})).toEqual({});
  });

  it('maps justifyContent correctly', () => {
    const result = buildAlignmentStyles({ justifyContent: 'center' });
    expect(result).toEqual({ 'justify-content': 'center' });
  });

  it('maps alignItems correctly', () => {
    const result = buildAlignmentStyles({ alignItems: 'stretch' });
    expect(result).toEqual({ 'align-items': 'stretch' });
  });

  it('maps all alignment options', () => {
    const result = buildAlignmentStyles({
      justifyContent: 'space-between',
      alignItems: 'start',
      justifyItems: 'end',
      alignContent: 'stretch',
    });
    expect(result).toEqual({
      'justify-content': 'space-between',
      'align-items': 'start',
      'justify-items': 'end',
      'align-content': 'stretch',
    });
  });
});

describe('buildItemAlignmentStyles', () => {
  it('returns empty object when no options provided', () => {
    expect(buildItemAlignmentStyles({})).toEqual({});
  });

  it('maps justifySelf correctly', () => {
    const result = buildItemAlignmentStyles({ justifySelf: 'center' });
    expect(result).toEqual({ 'justify-self': 'center' });
  });

  it('maps alignSelf correctly', () => {
    const result = buildItemAlignmentStyles({ alignSelf: 'end' });
    expect(result).toEqual({ 'align-self': 'end' });
  });

  it('maps both self-alignment options', () => {
    const result = buildItemAlignmentStyles({
      justifySelf: 'start',
      alignSelf: 'baseline',
    });
    expect(result).toEqual({
      'justify-self': 'start',
      'align-self': 'baseline',
    });
  });
});

describe('alignmentToCSS', () => {
  it('serializes empty styles to empty string', () => {
    expect(alignmentToCSS({})).toBe('');
  });

  it('serializes single property', () => {
    expect(alignmentToCSS({ 'align-items': 'center' })).toBe(
      'align-items: center;'
    );
  });

  it('serializes multiple properties', () => {
    const css = alignmentToCSS({
      'justify-content': 'space-between',
      'align-items': 'stretch',
    });
    expect(css).toContain('justify-content: space-between;');
    expect(css).toContain('align-items: stretch;');
  });
});
