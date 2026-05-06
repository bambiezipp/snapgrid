import {
  normalizeDensity,
  resolveAutoFlow,
  buildDensityStyles,
  densityToCSS,
  type DensityConfig,
} from "./density";

describe("normalizeDensity", () => {
  it("returns sparse default when undefined", () => {
    expect(normalizeDensity(undefined)).toEqual({ mode: "sparse" });
  });

  it("wraps a string mode into a config object", () => {
    expect(normalizeDensity("dense")).toEqual({ mode: "dense" });
  });

  it("passes through a full config object unchanged", () => {
    const config: DensityConfig = { mode: "balanced", rowHeight: "100px" };
    expect(normalizeDensity(config)).toEqual(config);
  });
});

describe("resolveAutoFlow", () => {
  it("returns 'row' for sparse", () => {
    expect(resolveAutoFlow("sparse")).toBe("row");
  });

  it("returns 'row dense' for dense", () => {
    expect(resolveAutoFlow("dense")).toBe("row dense");
  });

  it("returns 'row dense' for balanced", () => {
    expect(resolveAutoFlow("balanced")).toBe("row dense");
  });
});

describe("buildDensityStyles", () => {
  it("builds sparse styles with no row/col overrides", () => {
    const result = buildDensityStyles({ mode: "sparse" });
    expect(result.gridAutoFlow).toBe("row");
    expect(result.gridAutoRows).toBeUndefined();
    expect(result.gridAutoColumns).toBeUndefined();
  });

  it("includes minmax auto rows for balanced mode", () => {
    const result = buildDensityStyles({ mode: "balanced" });
    expect(result.gridAutoRows).toBe("minmax(min-content, auto)");
  });

  it("uses explicit rowHeight over balanced default", () => {
    const result = buildDensityStyles({ mode: "balanced", rowHeight: "80px" });
    expect(result.gridAutoRows).toBe("80px");
  });

  it("includes gridAutoColumns when colWidth is provided", () => {
    const result = buildDensityStyles({ mode: "sparse", colWidth: "200px" });
    expect(result.gridAutoColumns).toBe("200px");
  });
});

describe("densityToCSS", () => {
  it("renders only defined properties", () => {
    const css = densityToCSS({ gridAutoFlow: "row dense" });
    expect(css).toBe("grid-auto-flow: row dense;");
    expect(css).not.toContain("grid-auto-rows");
  });

  it("renders all properties when all are set", () => {
    const css = densityToCSS({
      gridAutoFlow: "row dense",
      gridAutoRows: "100px",
      gridAutoColumns: "1fr",
    });
    expect(css).toContain("grid-auto-flow: row dense;");
    expect(css).toContain("grid-auto-rows: 100px;");
    expect(css).toContain("grid-auto-columns: 1fr;");
  });
});
