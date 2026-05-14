import { describe, it, expect } from "vitest";
import {
  normalizeBackground,
  buildBackgroundStyles,
  backgroundToCSS,
} from "./background";

describe("normalizeBackground", () => {
  it("treats hex string as color", () => {
    expect(normalizeBackground("#fff")).toEqual({ color: "#fff" });
  });

  it("treats rgb string as color", () => {
    expect(normalizeBackground("rgb(0,0,0)")).toEqual({ color: "rgb(0,0,0)" });
  });

  it("treats url string as image", () => {
    expect(normalizeBackground("url(img.png)")).toEqual({ image: "url(img.png)" });
  });

  it("treats linear-gradient as image", () => {
    const g = "linear-gradient(to right, red, blue)";
    expect(normalizeBackground(g)).toEqual({ image: g });
  });

  it("passes through config object unchanged", () => {
    const cfg = { color: "red", size: "cover" };
    expect(normalizeBackground(cfg)).toEqual(cfg);
  });
});

describe("buildBackgroundStyles", () => {
  it("builds color style", () => {
    expect(buildBackgroundStyles("#abc")).toEqual({ "background-color": "#abc" });
  });

  it("builds image style", () => {
    const styles = buildBackgroundStyles({ image: "url(bg.jpg)" });
    expect(styles["background-image"]).toBe("url(bg.jpg)");
  });

  it("builds gradient over image when both present", () => {
    const styles = buildBackgroundStyles({
      image: "url(x.png)",
      gradient: "linear-gradient(red, blue)",
    });
    expect(styles["background-image"]).toBe("linear-gradient(red, blue)");
  });

  it("builds full config", () => {
    const styles = buildBackgroundStyles({
      color: "#fff",
      size: "cover",
      position: "center",
      repeat: "no-repeat",
      attachment: "fixed",
      clip: "content-box",
      origin: "border-box",
    });
    expect(styles["background-size"]).toBe("cover");
    expect(styles["background-position"]).toBe("center");
    expect(styles["background-repeat"]).toBe("no-repeat");
    expect(styles["background-attachment"]).toBe("fixed");
    expect(styles["background-clip"]).toBe("content-box");
    expect(styles["background-origin"]).toBe("border-box");
  });

  it("omits undefined properties", () => {
    const styles = buildBackgroundStyles({ color: "blue" });
    expect(Object.keys(styles)).toEqual(["background-color"]);
  });
});

describe("backgroundToCSS", () => {
  it("returns CSS string", () => {
    const css = backgroundToCSS({ color: "red", size: "cover" });
    expect(css).toContain("background-color: red;");
    expect(css).toContain("background-size: cover;");
  });
});
