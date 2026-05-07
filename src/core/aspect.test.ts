import { describe, it, expect } from "vitest";
import {
  normalizeAspectRatio,
  buildAspectStyles,
  aspectToCSS,
} from "./aspect";

describe("normalizeAspectRatio", () => {
  it("resolves 'auto' preset", () => {
    expect(normalizeAspectRatio("auto")).toBe("auto");
  });

  it("resolves 'square' preset to '1 / 1'", () => {
    expect(normalizeAspectRatio("square")).toBe("1 / 1");
  });

  it("resolves 'video' preset to '16 / 9'", () => {
    expect(normalizeAspectRatio("video")).toBe("16 / 9");
  });

  it("resolves 'portrait' preset to '3 / 4'", () => {
    expect(normalizeAspectRatio("portrait")).toBe("3 / 4");
  });

  it("parses '4/3' fraction string", () => {
    expect(normalizeAspectRatio("4/3")).toBe("4 / 3");
  });

  it("parses '16 / 9' fraction string with spaces", () => {
    expect(normalizeAspectRatio("16 / 9")).toBe("16 / 9");
  });

  it("converts numeric value to string", () => {
    expect(normalizeAspectRatio(1.5)).toBe("1.5");
  });

  it("passes through unknown string values", () => {
    expect(normalizeAspectRatio("3/2" as any)).toBe("3 / 2");
  });
});

describe("buildAspectStyles", () => {
  it("builds aspect-ratio style", () => {
    expect(buildAspectStyles({ ratio: "square" })).toEqual({
      "aspect-ratio": "1 / 1",
    });
  });

  it("builds object-fit style", () => {
    expect(buildAspectStyles({ objectFit: "cover" })).toEqual({
      "object-fit": "cover",
    });
  });

  it("builds object-position style", () => {
    expect(buildAspectStyles({ objectPosition: "center top" })).toEqual({
      "object-position": "center top",
    });
  });

  it("builds all styles together", () => {
    expect(
      buildAspectStyles({ ratio: "video", objectFit: "contain", objectPosition: "50% 50%" })
    ).toEqual({
      "aspect-ratio": "16 / 9",
      "object-fit": "contain",
      "object-position": "50% 50%",
    });
  });

  it("returns empty object for empty config", () => {
    expect(buildAspectStyles({})).toEqual({});
  });
});

describe("aspectToCSS", () => {
  it("serializes styles to CSS string", () => {
    const css = aspectToCSS({ ratio: "square", objectFit: "cover" });
    expect(css).toContain("aspect-ratio: 1 / 1;");
    expect(css).toContain("object-fit: cover;");
  });

  it("returns empty string for empty config", () => {
    expect(aspectToCSS({})).toBe("");
  });
});
