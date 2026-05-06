import {
  normalizeTrackSize,
  buildMinMax,
  resolveTrackSizing,
  buildTrackTemplate,
  buildRepeat,
  buildColumnTemplate,
} from "./minmax";

describe("normalizeTrackSize", () => {
  it("converts number to px string", () => {
    expect(normalizeTrackSize(200)).toBe("200px");
  });

  it("converts 0 to '0'", () => {
    expect(normalizeTrackSize(0)).toBe("0");
  });

  it("returns string values unchanged", () => {
    expect(normalizeTrackSize("1fr")).toBe("1fr");
    expect(normalizeTrackSize("auto")).toBe("auto");
  });
});

describe("buildMinMax", () => {
  it("builds minmax with string values", () => {
    expect(buildMinMax({ min: "100px", max: "1fr" })).toBe("minmax(100px, 1fr)");
  });

  it("builds minmax with number values", () => {
    expect(buildMinMax({ min: 100, max: 300 })).toBe("minmax(100px, 300px)");
  });

  it("builds minmax with mixed values", () => {
    expect(buildMinMax({ min: 0, max: "1fr" })).toBe("minmax(0, 1fr)");
  });
});

describe("resolveTrackSizing", () => {
  it("resolves a plain string", () => {
    expect(resolveTrackSizing("auto")).toBe("auto");
  });

  it("resolves a number", () => {
    expect(resolveTrackSizing(150)).toBe("150px");
  });

  it("resolves a MinMaxOptions object", () => {
    expect(resolveTrackSizing({ min: "80px", max: "1fr" })).toBe("minmax(80px, 1fr)");
  });
});

describe("buildTrackTemplate", () => {
  it("joins multiple track sizes", () => {
    expect(buildTrackTemplate(["1fr", "2fr", "1fr"])).toBe("1fr 2fr 1fr");
  });

  it("handles mixed track types", () => {
    expect(buildTrackTemplate([200, { min: 0, max: "1fr" }, "auto"])).toBe(
      "200px minmax(0, 1fr) auto"
    );
  });
});

describe("buildRepeat", () => {
  it("builds repeat with count and size", () => {
    expect(buildRepeat(3, "1fr")).toBe("repeat(3, 1fr)");
  });

  it("builds repeat with auto-fill", () => {
    expect(buildRepeat("auto-fill", { min: "200px", max: "1fr" })).toBe(
      "repeat(auto-fill, minmax(200px, 1fr))"
    );
  });
});

describe("buildColumnTemplate", () => {
  it("builds equal columns from count", () => {
    expect(buildColumnTemplate(4)).toBe("repeat(4, 1fr)");
  });

  it("builds columns with custom track size", () => {
    expect(buildColumnTemplate(3, "200px")).toBe("repeat(3, 200px)");
  });

  it("builds columns from array", () => {
    expect(buildColumnTemplate(["1fr", "2fr"])).toBe("1fr 2fr");
  });
});
