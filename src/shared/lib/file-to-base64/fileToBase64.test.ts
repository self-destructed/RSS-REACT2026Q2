import { describe, it, expect, afterEach, vi } from "vitest";
import { fileToBase64 } from "./fileToBase64";

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("fileToBase64", () => {
  it("calls FileReader.readAsDataURL", () => {
    const readAsDataURL = vi.fn();
    vi.stubGlobal("FileReader", function () {
      return { readAsDataURL };
    });

    void fileToBase64(new File([], "test.txt"));

    expect(readAsDataURL).toHaveBeenCalled();
  });
});
