import { describe, it, expect } from "vitest";
import {
  toDimensionValue,
  normalizeBoxSizing,
  buildBoxSizingStyles,
  boxSizingToCSS,
} from "./boxsizing";

describe("toDimensionValue", () => {
  it("converts 0 to '0'", () => {
    expect(toDimensionValue(0)).toBe("0");
  });

  it("converts positive number to px string", () => {
    expect(toDimensionValue(320)).toBe("320px");
  });

  it("passes through string values", () => {
    expect(toDimensionValue("100%")).toBe("100%");
    expect(toDimensionValue("  50vw  ")).toBe("50vw");
  });
});

describe("normalizeBoxSizing", () => {
  it("defaults boxSizing to border-box", () => {
    const result = normalizeBoxSizing({});
    expect(result.boxSizing).toBe("border-box");
  });

  it("preserves explicit boxSizing value", () => {
    const result = normalizeBoxSizing({ boxSizing: "content-box" });
    expect(result.boxSizing).toBe("content-box");
  });
});

describe("buildBoxSizingStyles", () => {
  it("always includes box-sizing", () => {
    const styles = buildBoxSizingStyles({});
    expect(styles["box-sizing"]).toBe("border-box");
  });

  it("includes width and height when provided", () => {
    const styles = buildBoxSizingStyles({ width: 200, height: "100vh" });
    expect(styles["width"]).toBe("200px");
    expect(styles["height"]).toBe("100vh");
  });

  it("includes min/max constraints", () => {
    const styles = buildBoxSizingStyles({
      minWidth: 100,
      maxWidth: "80%",
      minHeight: 0,
      maxHeight: 600,
    });
    expect(styles["min-width"]).toBe("100px");
    expect(styles["max-width"]).toBe("80%");
    expect(styles["min-height"]).toBe("0");
    expect(styles["max-height"]).toBe("600px");
  });

  it("omits undefined properties", () => {
    const styles = buildBoxSizingStyles({ width: 100 });
    expect(styles["height"]).toBeUndefined();
    expect(styles["min-width"]).toBeUndefined();
  });
});

describe("boxSizingToCSS", () => {
  it("serializes to CSS declaration string", () => {
    const css = boxSizingToCSS({ width: 100, height: 50 });
    expect(css).toContain("box-sizing: border-box;");
    expect(css).toContain("width: 100px;");
    expect(css).toContain("height: 50px;");
  });

  it("returns only box-sizing for empty config", () => {
    const css = boxSizingToCSS({});
    expect(css).toBe("box-sizing: border-box;");
  });
});
