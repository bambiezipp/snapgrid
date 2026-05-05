import { getPreset, listPresets, mergeWithPreset } from './presets';

describe('getPreset', () => {
  it('should return the default preset', () => {
    const preset = getPreset('default');
    expect(preset.columns).toBe(12);
    expect(preset.gap).toBe(16);
    expect(preset.snapPoints).toHaveLength(3);
  });

  it('should return a copy of the preset (not a reference)', () => {
    const p1 = getPreset('masonry');
    const p2 = getPreset('masonry');
    p1.columns = 99;
    expect(p2.columns).not.toBe(99);
  });

  it('should throw for unknown preset', () => {
    expect(() => getPreset('unknown' as any)).toThrow('Unknown preset');
  });

  it('should return gallery preset with correct snap points', () => {
    const preset = getPreset('gallery');
    expect(preset.snapPoints).toHaveLength(4);
    expect(preset.snapPoints![3].breakpoint).toBe(1440);
  });
});

describe('listPresets', () => {
  it('should list all available preset names', () => {
    const names = listPresets();
    expect(names).toContain('default');
    expect(names).toContain('sidebar');
    expect(names).toContain('masonry');
    expect(names).toContain('dashboard');
    expect(names).toContain('gallery');
    expect(names).toHaveLength(5);
  });
});

describe('mergeWithPreset', () => {
  it('should override preset values', () => {
    const config = mergeWithPreset('default', { columns: 6, gap: '2rem' });
    expect(config.columns).toBe(6);
    expect(config.gap).toBe('2rem');
    expect(config.snapPoints).toBeDefined();
  });

  it('should not mutate the original preset', () => {
    mergeWithPreset('dashboard', { columns: 1 });
    const original = getPreset('dashboard');
    expect(original.columns).toBe(3);
  });
});
