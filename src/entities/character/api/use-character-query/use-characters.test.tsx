import { afterEach, describe, expect, it, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";
import { http } from "@shared/api";
import type { Info } from "@shared/api";
import type { Character } from "../../model";
import { useCharactersQuery } from "./use-characters-query";

const getSpy = vi.spyOn(http, "get");
const mockInfoResponse: Info<Character[]> = {
  info: { count: 2, pages: 1, next: null, prev: null },
  results: [
    {
      id: 1,
      name: "Rick Sanchez",
      status: "Alive",
      species: "Human",
      gender: "Male",
      type: "",
      origin: { name: "Earth", url: "" },
      location: { name: "Earth", url: "" },
      image: "",
      episode: [],
      url: "",
      created: "",
    },
    {
      id: 2,
      name: "Morty Smith",
      status: "Alive",
      species: "Human",
      gender: "Male",
      type: "",
      origin: { name: "Earth", url: "" },
      location: { name: "Earth", url: "" },
      image: "",
      episode: [],
      url: "",
      created: "",
    },
  ],
};
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return function Wrapper({ children }: PropsWithChildren) {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  };
};

describe("useCharacters", () => {
  afterEach(() => {
    getSpy.mockReset();
  });

  it("returns correct state structure", async () => {
    getSpy.mockResolvedValue(mockInfoResponse);

    const { result } = renderHook(() => useCharactersQuery(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data?.info).toEqual(mockInfoResponse.info);
    expect(result.current.data?.results).toHaveLength(2);
  });

  it("accepts name filter", async () => {
    getSpy.mockResolvedValue(mockInfoResponse);

    const { result } = renderHook(() => useCharactersQuery({ name: "Rick" }), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(getSpy).toHaveBeenCalledWith(
      expect.stringContaining("name=Rick"),
      expect.any(AbortSignal),
    );
  });

  it("accepts page filter", async () => {
    getSpy.mockResolvedValue(mockInfoResponse);

    const { result } = renderHook(() => useCharactersQuery({ page: 2 }), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(getSpy).toHaveBeenCalledWith(
      expect.stringContaining("page=2"),
      expect.any(AbortSignal),
    );
  });

  it("accepts both name and page filters", async () => {
    getSpy.mockResolvedValue(mockInfoResponse);

    const { result } = renderHook(
      () => useCharactersQuery({ name: "Rick", page: 2 }),
      {
        wrapper: createWrapper(),
      },
    );

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(getSpy).toHaveBeenCalledWith(
      expect.stringContaining("name=Rick"),
      expect.any(AbortSignal),
    );
    expect(getSpy).toHaveBeenCalledWith(
      expect.stringContaining("page=2"),
      expect.any(AbortSignal),
    );
  });
});
