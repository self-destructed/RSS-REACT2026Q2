import { describe, it, expect, vi, beforeEach } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useUrlParam } from "./useUrlParam";

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    prefetch: vi.fn(),
  })),
  useSearchParams: vi.fn(() => new URLSearchParams()),
  usePathname: vi.fn(() => "/test"),
  redirect: vi.fn(),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe("useUrlParam", () => {
  describe("value", () => {
    it("returns empty string when param is absent", () => {
      const { result } = renderHook(() => useUrlParam("page"));

      expect(result.current[0]).toBe("");
    });

    it("returns param value when present in URL", () => {
      vi.mocked(useSearchParams).mockReturnValue(new URLSearchParams("page=2"));

      const { result } = renderHook(() => useUrlParam("page"));

      expect(result.current[0]).toBe("2");
    });

    it("re-reads value when key changes", () => {
      vi.mocked(useSearchParams).mockReturnValue(
        new URLSearchParams("page=2&name=rick"),
      );

      const { result, rerender } = renderHook(
        (key: string) => useUrlParam(key),
        { initialProps: "page" },
      );

      expect(result.current[0]).toBe("2");

      rerender("name");

      expect(result.current[0]).toBe("rick");
    });
  });

  describe("setValue", () => {
    it("replaces URL with param when setting non-empty value", () => {
      vi.mocked(usePathname).mockReturnValue("/characters");
      vi.mocked(useSearchParams).mockReturnValue(new URLSearchParams());
      const replace = vi.fn();

      vi.mocked(useRouter).mockReturnValue({
        push: vi.fn(),
        replace,
        back: vi.fn(),
        prefetch: vi.fn(),
      });

      const { result } = renderHook(() => useUrlParam("name"));

      act(() => {
        result.current[1]("morty");
      });

      expect(replace).toHaveBeenCalledWith("/characters?name=morty");
    });

    it("removes param when setting empty value", () => {
      vi.mocked(usePathname).mockReturnValue("/characters");
      vi.mocked(useSearchParams).mockReturnValue(
        new URLSearchParams("name=rick"),
      );
      const replace = vi.fn();

      vi.mocked(useRouter).mockReturnValue({
        push: vi.fn(),
        replace,
        back: vi.fn(),
        prefetch: vi.fn(),
      });

      const { result } = renderHook(() => useUrlParam("name"));

      act(() => {
        result.current[1]("");
      });

      expect(replace).toHaveBeenCalledWith("/characters?");
    });

    it("preserves other search params", () => {
      vi.mocked(usePathname).mockReturnValue("/characters");
      vi.mocked(useSearchParams).mockReturnValue(
        new URLSearchParams("page=3&name=rick"),
      );
      const replace = vi.fn();

      vi.mocked(useRouter).mockReturnValue({
        push: vi.fn(),
        replace,
        back: vi.fn(),
        prefetch: vi.fn(),
      });

      const { result } = renderHook(() => useUrlParam("name"));

      act(() => {
        result.current[1]("morty");
      });

      expect(replace).toHaveBeenCalledWith("/characters?page=3&name=morty");
    });
  });
});
