import { describe, it, expect } from "vitest";
import {
  normalizeTableLayout,
  buildTableLayoutStyles,
  tableLayoutToCSS,
} from "./tableLayout";

describe("normalizeTableLayout", () => {
  it("passes valid layout values through", () => {
    expect(normalizeTableLayout({ layout: "fixed" })).toEqual({ layout: "fixed" });
    expect(normalizeTableLayout({ layout: "auto" })).toEqual({ layout: "auto" });
  });

  it("falls back to auto for invalid layout", () => {
    expect(normalizeTableLayout({ layout: "invalid" as any })).toEqual({ layout: "auto" });
  });

  it("normalizes borderCollapse", () => {
    expect(normalizeTableLayout({ borderCollapse: "collapse" })).toEqual({
      borderCollapse: "collapse",
    });
    expect(normalizeTableLayout({ borderCollapse: "bad" as any })).toEqual({
      borderCollapse: "separate",
    });
  });

  it("converts numeric spacing to px", () => {
    expect(normalizeTableLayout({ borderSpacingX: 8 })).toEqual({ borderSpacingX: "8px" });
    expect(normalizeTableLayout({ borderSpacingY: "1rem" })).toEqual({ borderSpacingY: "1rem" });
  });

  it("normalizes captionSide", () => {
    expect(normalizeTableLayout({ captionSide: "bottom" })).toEqual({ captionSide: "bottom" });
    expect(normalizeTableLayout({ captionSide: "left" as any })).toEqual({ captionSide: "top" });
  });
});

describe("buildTableLayoutStyles", () => {
  it("builds table-layout property", () => {
    expect(buildTableLayoutStyles({ layout: "fixed" })).toEqual({ "table-layout": "fixed" });
  });

  it("builds border-spacing with equal x and y", () => {
    expect(buildTableLayoutStyles({ borderSpacingX: 4, borderSpacingY: 4 })).toEqual({
      "border-spacing": "4px",
    });
  });

  it("builds border-spacing with different x and y", () => {
    expect(buildTableLayoutStyles({ borderSpacingX: 4, borderSpacingY: 8 })).toEqual({
      "border-spacing": "4px 8px",
    });
  });

  it("defaults y to x when only x is provided", () => {
    expect(buildTableLayoutStyles({ borderSpacingX: "0.5rem" })).toEqual({
      "border-spacing": "0.5rem",
    });
  });

  it("builds full config", () => {
    const result = buildTableLayoutStyles({
      layout: "fixed",
      borderCollapse: "collapse",
      captionSide: "bottom",
    });
    expect(result).toEqual({
      "table-layout": "fixed",
      "border-collapse": "collapse",
      "caption-side": "bottom",
    });
  });

  it("returns empty object for empty config", () => {
    expect(buildTableLayoutStyles({})).toEqual({});
  });
});

describe("tableLayoutToCSS", () => {
  it("serializes styles to CSS string", () => {
    const css = tableLayoutToCSS({ layout: "fixed", borderCollapse: "collapse" });
    expect(css).toContain("table-layout: fixed;");
    expect(css).toContain("border-collapse: collapse;");
  });

  it("returns empty string for empty config", () => {
    expect(tableLayoutToCSS({})).toBe("");
  });
});
