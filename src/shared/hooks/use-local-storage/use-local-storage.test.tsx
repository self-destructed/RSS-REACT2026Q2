import { afterAll, beforeEach, describe, expect, it, vi } from "vitest";
import useLocalStorage from "./use-local-storage";
import { createLocalStorageMock } from "../../api/__mocks__/local-storage";
import { act, renderHook } from "@testing-library/react";

describe("useLocalStorage", () => {
  beforeEach(() => {
    const mock = createLocalStorageMock();
    vi.stubGlobal("localStorage", mock);
  });

  afterAll(() => {
    vi.unstubAllGlobals();
  });

  describe("initialization", () => {
    it("should return initial value when localStorage is empty", () => {
      const initialValue = "initialValue";
      const { result } = renderHook(() =>
        useLocalStorage("testKey", initialValue),
      );
      const [value] = result.current;

      expect(value).toBe(initialValue);
    });

    it("should return value from localStorage if it exists", () => {
      const storedValue = "storedValue";
      localStorage.setItem("testKey", JSON.stringify(storedValue));

      const { result } = renderHook(() =>
        useLocalStorage("testKey", "initialValue"),
      );
      const [value] = result.current;

      expect(value).toBe(storedValue);
    });

    it("should return initial value if localStorage is unavailable", () => {
      vi.stubGlobal("localStorage", undefined);
      const { result } = renderHook(() =>
        useLocalStorage("testKey", "initialValue"),
      );
      const [value] = result.current;

      expect(value).toBe("initialValue");
    });
  });

  describe("setValue", () => {
    it("should update localStorage when the value changes", () => {
      const { result } = renderHook(() =>
        useLocalStorage("testKey", "initialValue"),
      );
      const [, setValue] = result.current;
      const newValue = "newValue";

      act(() => {
        setValue(newValue);
      });
      const storedValue = JSON.parse(localStorage.getItem("testKey") ?? "");

      expect(storedValue).toBe(newValue);
    });

    it("should handle function updater", () => {
      const { result } = renderHook(() => useLocalStorage("testKey", 0));
      const [, setValue] = result.current;

      act(() => {
        setValue((prev) => prev + 1);
      });
      const storedValue = JSON.parse(localStorage.getItem("testKey") ?? "123");

      expect(storedValue).toBe(1);
    });
  });

  describe("error handling", () => {
    it("should return initial value if JSON.parse fails", () => {
      localStorage.setItem("testKey", "invalidJson{");
      const { result } = renderHook(() =>
        useLocalStorage("testKey", "initialValue"),
      );
      const [value] = result.current;

      expect(value).toBe("initialValue");
    });

    it("should catch error when setValue fails", () => {
      const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

      const { result } = renderHook(() =>
        useLocalStorage("testKey", "initialValue"),
      );
      const [, setValue] = result.current;

      act(() => {
        setValue(() => {
          throw new Error("Updater error");
        });
      });

      expect(warnSpy).toHaveBeenCalledWith(
        "Error while updating localStorage:",
        expect.any(Error),
      );

      warnSpy.mockRestore();
    });
  });
});
