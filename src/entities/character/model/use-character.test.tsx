import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";
import { http } from "@shared/api";
import type { Character } from "./types";
import { useCharacterQuery } from "./queries";

const getSpy = vi.spyOn(http, "get");
const mockCharacter: Character = {
  id: 1,
  name: "Rick Sanchez",
  status: "Alive",
  species: "Human",
  gender: "Male",
  origin: { name: "Earth", url: "" },
  location: { name: "Earth", url: "" },
  image: "",
  episode: [],
  url: "",
  created: "",
  type: "",
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

describe("useCharacterQuery", () => {
  beforeAll(() => {});
  afterEach(() => {
    getSpy.mockReset();
  });
  it("returns correct state structure", async () => {
    getSpy.mockResolvedValue(mockCharacter);

    const { result } = renderHook(() => useCharacterQuery(1), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockCharacter);
    expect(getSpy).toHaveBeenCalledWith(
      expect.stringContaining("/character/1"),
      expect.any(AbortSignal),
    );
  });
  it("returns error state when http.get fails", async () => {
    getSpy.mockRejectedValue(new Error("Network error"));

    const { result } = renderHook(() => useCharacterQuery(1), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error!.message).toBe("Network error");
    expect(result.current.data).toBeUndefined();
  });
  it("returns idle state when id is undefined", () => {
    const { result } = renderHook(() => useCharacterQuery(undefined), {
      wrapper: createWrapper(),
    });

    expect(result.current.isPending).toBe(true);
    expect(result.current.fetchStatus).toBe("idle");
    expect(result.current.data).toBeUndefined();
    expect(getSpy).not.toHaveBeenCalled();
  });
});
