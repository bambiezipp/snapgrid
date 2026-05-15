import { describe, it, expect } from "vitest";
import {
  normalizeColumnValue,
  buildColumnsTemplate,
  buildColumnsStyles,
  columnsToCSS,
} from "./columns";

describe("normalizeColumnValue", () => {
  it("converts a number to a repeat(n, 1fr) string", () => {
    expect(normalizeColumnValue(3)).toBe("repeat(3, 1fr)");
  });

  it("returns a string value as-is", () => {
    expect(normalizeColumnValue("200px 1fr auto")).toBe("200px 1fr auto");
  });
});

describe("buildColumnsTemplate", () => {
  it("uses count when provided", () => {
    expect(buildColumnsTemplate({ count: 4 })).toBe("repeat(4, 1fr)");
  });

  it("uses auto-fill with minmax by default", () => {
    expect(buildColumnsTemplate({ minWidth: "200px" })).toBe(
      "repeat(auto-fill, minmax(200px, 1fr))"
    );
  });

  it("uses auto-fit when specified", () => {
    expect(buildColumnsTemplate({ minWidth: "150px", repeat: "auto-fit" })).toBe(
      "repeat(auto-fit, minmax(150px, 1fr))"
    );
  });

  it("applies custom maxWidth", () => {
    expect(buildColumnsTemplate({ minWidth: "100px", maxWidth: "300px" })).toBe(
      "repeat(auto-fill, minmax(100px, 300px))"
    );
  });

  it("defaults minWidth to 0px and maxWidth to 1fr", () => {
    expect(buildColumnsTemplate({})).toBe("repeat(auto-fill, minmax(0px, 1fr))");
  });
});

describe("buildColumnsStyles", () => {
  it("handles a numeric shorthand", () => {
    expect(buildColumnsStyles(2)).toEqual({
      gridTemplateColumns: "repeat(2, 1fr)",
    });
  });

  it("handles a string shorthand", () => {
    expect(buildColumnsStyles("1fr 2fr")).toEqual({
      gridTemplateColumns: "1fr 2fr",
    });
  });

  it("handles a full config object", () => {
    expect(buildColumnsStyles({ minWidth: "250px", repeat: "auto-fit" })).toEqual({
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    });
  });
});

describe("columnsToCSS", () => {
  it("serializes numeric config to CSS string", () => {
    expect(columnsToCSS(3)).toBe("grid-template-columns: repeat(3, 1fr);");
  });

  it("serializes object config to CSS string", () => {
    expect(columnsToCSS({ count: 2 })).toBe(
      "grid-template-columns: repeat(2, 1fr);"
    );
  });
});
