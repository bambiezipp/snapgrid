import { describe, it, expect } from "vitest";
import { buildBoxSizingStyles, boxSizingToCSS } from "./boxsizing";

describe("boxsizing integration", () => {
  it("produces a full constrained box config", () => {
    const styles = buildBoxSizingStyles({
      boxSizing: "border-box",
      width: "100%",
      minWidth: 280,
      maxWidth: 1200,
      height: "auto",
      minHeight: 48,
    });

    expect(styles).toEqual({
      "box-sizing": "border-box",
      "width": "100%",
      "min-width": "280px",
      "max-width": "1200px",
      "height": "auto",
      "min-height": "48px",
    });
  });

  it("CSS output for a fixed-size card", () => {
    const css = boxSizingToCSS({
      width: 320,
      height: 240,
      maxWidth: "100%",
    });

    expect(css).toBe(
      "box-sizing: border-box; width: 320px; height: 240px; max-width: 100%;"
    );
  });

  it("content-box mode passes through correctly", () => {
    const styles = buildBoxSizingStyles({
      boxSizing: "content-box",
      width: 400,
    });
    expect(styles["box-sizing"]).toBe("content-box");
    expect(styles["width"]).toBe("400px");
  });

  it("zero dimensions are handled without units", () => {
    const styles = buildBoxSizingStyles({ minWidth: 0, minHeight: 0 });
    expect(styles["min-width"]).toBe("0");
    expect(styles["min-height"]).toBe("0");
  });

  it("omits maxHeight when not specified", () => {
    const styles = buildBoxSizingStyles({ height: 100 });
    expect("max-height" in styles).toBe(false);
  });
});
