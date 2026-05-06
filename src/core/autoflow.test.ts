import { describe, it, expect } from 'vitest';
import {
  normalizeAutoFlow,
  buildAutoFlowStyles,
  autoFlowToCSS,
  AutoFlowConfig,
} from './autoflow';

describe('normalizeAutoFlow', () => {
  it('accepts valid directions', () => {
    expect(normalizeAutoFlow('row')).toBe('row');
    expect(normalizeAutoFlow('column')).toBe('column');
    expect(normalizeAutoFlow('row dense')).toBe('row dense');
    expect(normalizeAutoFlow('column dense')).toBe('column dense');
  });

  it('throws on invalid direction', () => {
    expect(() => normalizeAutoFlow('diagonal')).toThrow(/Invalid auto-flow direction/);
  });
});

describe('buildAutoFlowStyles', () => {
  it('returns empty object for empty config', () => {
    expect(buildAutoFlowStyles({})).toEqual({});
  });

  it('sets grid-auto-flow', () => {
    const styles = buildAutoFlowStyles({ direction: 'column dense' });
    expect(styles['grid-auto-flow']).toBe('column dense');
  });

  it('sets grid-auto-rows', () => {
    const styles = buildAutoFlowStyles({ autoRows: 'minmax(100px, auto)' });
    expect(styles['grid-auto-rows']).toBe('minmax(100px, auto)');
  });

  it('sets grid-auto-columns', () => {
    const styles = buildAutoFlowStyles({ autoCols: '1fr' });
    expect(styles['grid-auto-columns']).toBe('1fr');
  });

  it('sets all properties together', () => {
    const config: AutoFlowConfig = {
      direction: 'row dense',
      autoRows: '200px',
      autoCols: '100px',
    };
    const styles = buildAutoFlowStyles(config);
    expect(styles['grid-auto-flow']).toBe('row dense');
    expect(styles['grid-auto-rows']).toBe('200px');
    expect(styles['grid-auto-columns']).toBe('100px');
  });
});

describe('autoFlowToCSS', () => {
  it('returns empty string for empty config', () => {
    expect(autoFlowToCSS({})).toBe('');
  });

  it('serializes single property', () => {
    expect(autoFlowToCSS({ direction: 'row' })).toBe('grid-auto-flow: row;');
  });

  it('serializes multiple properties', () => {
    const css = autoFlowToCSS({ direction: 'column', autoRows: 'auto' });
    expect(css).toContain('grid-auto-flow: column;');
    expect(css).toContain('grid-auto-rows: auto;');
  });
});
