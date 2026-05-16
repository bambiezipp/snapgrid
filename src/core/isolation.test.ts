import {
  normalizeIsolation,
  normalizeMixBlendMode,
  normalizeWillChange,
  buildIsolationStyles,
  isolationToCSS,
} from "./isolation";

describe("normalizeIsolation", () => {
  it("returns 'isolate' for valid value", () => {
    expect(normalizeIsolation("isolate")).toBe("isolate");
  });

  it("returns 'auto' for valid value", () => {
    expect(normalizeIsolation("auto")).toBe("auto");
  });

  it("returns 'auto' for unknown string", () => {
    expect(normalizeIsolation("inherit")).toBe("auto");
  });

  it("returns 'auto' for non-string", () => {
    expect(normalizeIsolation(42)).toBe("auto");
    expect(normalizeIsolation(null)).toBe("auto");
  });
});

describe("normalizeMixBlendMode", () => {
  it("returns valid blend mode", () => {
    expect(normalizeMixBlendMode("multiply")).toBe("multiply");
    expect(normalizeMixBlendMode("screen")).toBe("screen");
    expect(normalizeMixBlendMode("normal")).toBe("normal");
  });

  it("returns undefined for invalid value", () => {
    expect(normalizeMixBlendMode("blur")).toBeUndefined();
    expect(normalizeMixBlendMode(123)).toBeUndefined();
  });
});

describe("normalizeWillChange", () => {
  it("returns string value as-is", () => {
    expect(normalizeWillChange("transform")).toBe("transform");
  });

  it("joins array values", () => {
    expect(normalizeWillChange(["transform", "opacity"])).toBe("transform, opacity");
  });

  it("filters empty strings from array", () => {
    expect(normalizeWillChange(["transform", "", "opacity"])).toBe("transform, opacity");
  });

  it("returns undefined for empty string", () => {
    expect(normalizeWillChange("")).toBeUndefined();
  });

  it("returns undefined for empty array", () => {
    expect(normalizeWillChange([])).toBeUndefined();
  });

  it("returns undefined for non-string", () => {
    expect(normalizeWillChange(null)).toBeUndefined();
  });
});

describe("buildIsolationStyles", () => {
  it("returns isolation style when set to isolate", () => {
    const styles = buildIsolationStyles({ isolation: "isolate" });
    expect(styles["isolation"]).toBe("isolate");
  });

  it("omits isolation when auto", () => {
    const styles = buildIsolationStyles({ isolation: "auto" });
    expect(styles["isolation"]).toBeUndefined();
  });

  it("includes mix-blend-mode when set", () => {
    const styles = buildIsolationStyles({ mixBlendMode: "overlay" });
    expect(styles["mix-blend-mode"]).toBe("overlay");
  });

  it("includes will-change when set", () => {
    const styles = buildIsolationStyles({ willChange: "transform" });
    expect(styles["will-change"]).toBe("transform");
  });

  it("returns empty object for empty config", () => {
    expect(buildIsolationStyles({})).toEqual({});
  });
});

describe("isolationToCSS", () => {
  it("returns CSS string for full config", () => {
    const css = isolationToCSS({
      isolation: "isolate",
      mixBlendMode: "multiply",
      willChange: ["transform", "opacity"],
    });
    expect(css).toContain("isolation: isolate;");
    expect(css).toContain("mix-blend-mode: multiply;");
    expect(css).toContain("will-change: transform, opacity;");
  });

  it("returns empty string for empty config", () => {
    expect(isolationToCSS({})).toBe("");
  });
});
