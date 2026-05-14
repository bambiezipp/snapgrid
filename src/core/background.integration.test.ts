import { describe, it, expect } from "vitest";
import { buildBackgroundStyles, backgroundToCSS } from "./background";
import { buildColorStyles } from "./color";

describe("background + color integration", () => {
  it("background color and color opacity can coexist independently", () => {
    const bg = buildBackgroundStyles({ color: "#3498db" });
    const color = buildColorStyles({ text: "#fff", opacity: 0.9 });

    expect(bg["background-color"]).toBe("#3498db");
    expect(color["color"]).toBe("#fff");
    expect(color["opacity"]).toBe("0.9");
    expect(bg["color"]).toBeUndefined();
    expect(color["background-color"]).toBeUndefined();
  });

  it("gradient background renders correct CSS", () => {
    const css = backgroundToCSS({
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      size: "cover",
    });
    expect(css).toContain("background-image: linear-gradient(135deg, #667eea 0%, #764ba2 100%);");
    expect(css).toContain("background-size: cover;");
  });

  it("no-repeat fixed background attachment renders all fields", () => {
    const styles = buildBackgroundStyles({
      image: "url(/hero.jpg)",
      size: "cover",
      position: "top center",
      repeat: "no-repeat",
      attachment: "fixed",
    });
    expect(styles["background-image"]).toBe("url(/hero.jpg)");
    expect(styles["background-size"]).toBe("cover");
    expect(styles["background-position"]).toBe("top center");
    expect(styles["background-repeat"]).toBe("no-repeat");
    expect(styles["background-attachment"]).toBe("fixed");
  });

  it("clip text pattern works", () => {
    const styles = buildBackgroundStyles({
      gradient: "linear-gradient(to right, red, blue)",
      clip: "text",
    });
    expect(styles["background-clip"]).toBe("text");
    expect(styles["background-image"]).toBe("linear-gradient(to right, red, blue)");
  });
});
