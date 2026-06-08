import { describe, it, expect, beforeEach } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { useUserStore, useSubmissions, useAddSubmission } from "./userStore";

const mockSubmission = () => ({
  name: "Rick",
  age: 35,
  email: "rick@example.com",
  gender: "male",
  terms: true,
  password: "Test1@abc",
  country: "Russia",
});

beforeEach(() => {
  useUserStore.setState({ submissions: [] });
});

describe("UserStore", () => {
  it("initial submissions are empty", () => {
    const { result } = renderHook(() => useUserStore((s) => s.submissions));

    expect(result.current).toEqual([]);
  });

  it("addSubmission adds a submission to the list", async () => {
    const { result } = renderHook(() => useUserStore());

    await act(async () => {
      await result.current.addSubmission(mockSubmission());
    });

    expect(result.current.submissions).toHaveLength(1);
  });

  it("addSubmission appends to existing submissions", async () => {
    const { result } = renderHook(() => useUserStore());

    await act(async () => {
      await result.current.addSubmission(mockSubmission());
    });

    await act(async () => {
      await result.current.addSubmission(mockSubmission());
    });

    expect(result.current.submissions).toHaveLength(2);
  });

  it("submissions persist across re-renders", async () => {
    const submission = mockSubmission();

    await act(async () => {
      await useUserStore.getState().addSubmission(submission);
    });

    const { result } = renderHook(() => useUserStore((s) => s.submissions));

    expect(result.current).toHaveLength(1);
  });
});

describe("hooks", () => {
  it("useSubmissions returns submissions from store", async () => {
    const submission = mockSubmission();

    await act(async () => {
      await useUserStore.getState().addSubmission(submission);
    });

    const { result } = renderHook(() => useSubmissions());

    expect(result.current).toHaveLength(1);
    expect(result.current[0].name).toBe("Rick");
  });

  it("useAddSubmission returns addSubmission action", async () => {
    const { result } = renderHook(() => useAddSubmission());

    await act(async () => {
      await result.current(mockSubmission());
    });

    const submissions = useUserStore.getState().submissions;

    expect(submissions).toHaveLength(1);
  });
});
