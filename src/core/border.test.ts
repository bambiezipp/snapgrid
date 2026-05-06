import {
  normalizeBorderValue,
  normalizeRadius,
  buildBorderStyles,
  borderToCSS,
} from "./border";

describe("normalizeBorderValue", () => {
  it("returns string values unchanged", () => {
    expect(normalizeBorderValue("2px dashed red")).toBe("2px dashed red");
  });

  it("builds border string from object with defaults", () => {
    expect(normalizeBorderValue({})).toBe("1px solid currentColor");
  });

  it("uses numeric width as px", () => {
    expect(normalizeBorderValue({ width: 3, style: "dotted", color: "blue" })).toBe("3px dotted blue");
  });

  it("uses string width directly", () => {
    expect(normalizeBorderValue({ width: "0.5rem", color: "#333" })).toBe("0.5rem solid #333");
  });
});

describe("normalizeRadius", () => {
  it("appends px for numbers", () => {
    expect(normalizeRadius(8)).toBe("8px");
  });

  it("returns string values unchanged", () => {
    expect(normalizeRadius("50%")).toBe("50%");
  });
});

describe("buildBorderStyles", () => {
  it("returns empty object for empty config", () => {
    expect(buildBorderStyles({})).toEqual({});
  });

  it("sets shorthand border from all", () => {
    expect(buildBorderStyles({ all: "1px solid black" })).toEqual({
      border: "1px solid black",
    });
  });

  it("sets per-side borders", () => {
    const result = buildBorderStyles({ top: { width: 2, color: "red" }, bottom: "none" });
    expect(result["border-top"]).toBe("2px solid red");
    expect(result["border-bottom"]).toBe("none");
  });

  it("sets border-radius", () => {
    expect(buildBorderStyles({ radius: 4 })).toEqual({ "border-radius": "4px" });
  });

  it("combines all, sides, and radius", () => {
    const result = buildBorderStyles({ all: "1px solid #ccc", radius: "0.5rem" });
    expect(result["border"]).toBe("1px solid #ccc");
    expect(result["border-radius"]).toBe("0.5rem");
  });
});

describe("borderToCSS", () => {
  it("returns empty string for empty config", () => {
    expect(borderToCSS(".grid", {})).toBe("");
  });

  it("generates CSS block", () => {
    const css = borderToCSS(".card", { all: "1px solid #eee", radius: 8 });
    expect(css).toContain(".card {");
    expect(css).toContain("border: 1px solid #eee;");
    expect(css).toContain("border-radius: 8px;");
  });
});
