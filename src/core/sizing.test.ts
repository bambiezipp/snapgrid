import { describe, it, expect } from "vitest";
import {
  normalizeTrackValue,
  buildTrackList,
  buildSizingStyles,
  sizingToCSS,
} from "./sizing";

describe("normalizeTrackValue", () => {
  it("converts small integers to fr units", () => {
    expect(normalizeTrackValue(1)).toBe("1fr");
    expect(normalizeTrackValue(3)).toBe("3fr");
    expect(normalizeTrackValue(12)).toBe("12fr");
  });

  it("converts large numbers to px units", () => {
    expect(normalizeTrackValue(200)).toBe("200px");
    expect(normalizeTrackValue(0)).toBe("0px");
  });

  it("passes through keyword values", () => {
    expect(normalizeTrackValue("auto")).toBe("auto");
    expect(normalizeTrackValue("min-content")).toBe("min-content");
    expect(normalizeTrackValue("max-content")).toBe("max-content");
  });

  it("passes through CSS string values", () => {
    expect(normalizeTrackValue("1fr")).toBe("1fr");
    expect(normalizeTrackValue("minmax(100px, 1fr)")).toBe("minmax(100px, 1fr)");
    expect(normalizeTrackValue("250px")).toBe("250px");
  });
});

describe("buildTrackList", () => {
  it("handles a single value", () => {
    expect(buildTrackList(1)).toBe("1fr");
    expect(buildTrackList("auto")).toBe("auto");
  });

  it("joins an array of values", () => {
    expect(buildTrackList([1, 2, 1])).toBe("1fr 2fr 1fr");
    expect(buildTrackList(["200px", "auto", "1fr"])).toBe("200px auto 1fr");
  });
});

describe("buildSizingStyles", () => {
  it("returns empty object for empty config", () => {
    expect(buildSizingStyles({})).toEqual({});
  });

  it("builds grid-template-columns", () => {
    const result = buildSizingStyles({ columns: [1, 2, 1] });
    expect(result["grid-template-columns"]).toBe("1fr 2fr 1fr");
  });

  it("builds grid-template-rows", () => {
    const result = buildSizingStyles({ rows: "auto" });
    expect(result["grid-template-rows"]).toBe("auto");
  });

  it("builds auto-columns and auto-rows", () => {
    const result = buildSizingStyles({ autoColumns: "200px", autoRows: 1 });
    expect(result["grid-auto-columns"]).toBe("200px");
    expect(result["grid-auto-rows"]).toBe("1fr");
  });

  it("builds all properties together", () => {
    const result = buildSizingStyles({
      columns: [1, 1, 1],
      rows: ["auto", 1],
      autoRows: "min-content",
    });
    expect(Object.keys(result)).toHaveLength(3);
  });
});

describe("sizingToCSS", () => {
  it("serializes to CSS declaration string", () => {
    const css = sizingToCSS({ columns: [1, 1], autoRows: "auto" });
    expect(css).toContain("grid-template-columns: 1fr 1fr;");
    expect(css).toContain("grid-auto-rows: auto;");
  });

  it("returns empty string for empty config", () => {
    expect(sizingToCSS({})).toBe("");
  });
});
