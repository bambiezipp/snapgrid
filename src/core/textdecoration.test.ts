import { describe, it, expect } from "vitest";
import {
  normalizeTextDecoration,
  buildTextDecorationStyles,
  textDecorationToCSS,
} from "./textdecoration";

describe("normalizeTextDecoration", () => {
  it("normalizes string shorthand 'underline'", () => {
    expect(normalizeTextDecoration("underline")).toEqual({ line: "underline" });
  });

  it("normalizes string 'none'", () => {
    expect(normalizeTextDecoration("none")).toEqual({ line: "none" });
  });

  it("passes through config object unchanged", () => {
    const config = { line: "underline" as const, style: "wavy" as const, color: "red" };
    expect(normalizeTextDecoration(config)).toEqual(config);
  });
});

describe("buildTextDecorationStyles", () => {
  it("builds line style", () => {
    expect(buildTextDecorationStyles({ line: "underline" })).toEqual({
      "text-decoration-line": "underline",
    });
  });

  it("builds style property", () => {
    expect(buildTextDecorationStyles({ style: "dotted" })).toEqual({
      "text-decoration-style": "dotted",
    });
  });

  it("builds color property", () => {
    expect(buildTextDecorationStyles({ color: "blue" })).toEqual({
      "text-decoration-color": "blue",
    });
  });

  it("converts numeric thickness to px", () => {
    expect(buildTextDecorationStyles({ thickness: 2 })).toEqual({
      "text-decoration-thickness": "2px",
    });
  });

  it("converts numeric offset to px", () => {
    expect(buildTextDecorationStyles({ offset: 4 })).toEqual({
      "text-underline-offset": "4px",
    });
  });

  it("builds full config", () => {
    const result = buildTextDecorationStyles({
      line: "underline",
      style: "wavy",
      color: "#ff0",
      thickness: "auto",
      offset: "3px",
    });
    expect(result).toEqual({
      "text-decoration-line": "underline",
      "text-decoration-style": "wavy",
      "text-decoration-color": "#ff0",
      "text-decoration-thickness": "auto",
      "text-underline-offset": "3px",
    });
  });

  it("returns empty object for empty config", () => {
    expect(buildTextDecorationStyles({})).toEqual({});
  });
});

describe("textDecorationToCSS", () => {
  it("converts shorthand string to CSS properties", () => {
    expect(textDecorationToCSS("line-through")).toEqual({
      "text-decoration-line": "line-through",
    });
  });

  it("converts config object to CSS properties", () => {
    expect(textDecorationToCSS({ line: "overline", style: "dashed" })).toEqual({
      "text-decoration-line": "overline",
      "text-decoration-style": "dashed",
    });
  });
});
