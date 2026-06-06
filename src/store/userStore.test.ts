import { describe, it, expect, beforeEach } from "vitest";
import { act, renderHook } from "@testing-library/react";
import {
  useUserStore,
  useSubmissions,
  useAddSubmission,
  type Submission,
} from "./userStore";

const mockSubmission = (overrides?: Partial<Submission>): Submission => ({
  id: "1",
  createdAt: "2024-01-01T00:00:00.000Z",
  name: "Rick",
  age: 35,
  email: "rick@example.com",
  gender: "male",
  terms: true,
  password: "Test1@abc",
  country: "Russia",
  ...overrides,
});

beforeEach(() => {
  act(() => {
    useUserStore.setState({ submissions: [] });
  });
});

describe("UserStore", () => {
  it("initial submissions are empty", () => {
    const { result } = renderHook(() => useUserStore((s) => s.submissions));

    expect(result.current).toEqual([]);
  });

  it("addSubmission adds a submission to the list", () => {
    const { result } = renderHook(() => useUserStore());

    act(() => {
      result.current.addSubmission(mockSubmission());
    });

    expect(result.current.submissions).toHaveLength(1);
    expect(result.current.submissions[0]).toEqual(mockSubmission());
  });

  it("addSubmission appends to existing submissions", () => {
    const { result } = renderHook(() => useUserStore());

    act(() => {
      result.current.addSubmission(mockSubmission({ id: "1" }));
    });

    act(() => {
      result.current.addSubmission(mockSubmission({ id: "2" }));
    });

    expect(result.current.submissions).toHaveLength(2);
    expect(result.current.submissions[0].id).toBe("1");
    expect(result.current.submissions[1].id).toBe("2");
  });

  it("submissions persist across re-renders", () => {
    const submission = mockSubmission();

    act(() => {
      useUserStore.getState().addSubmission(submission);
    });

    const { result } = renderHook(() => useUserStore((s) => s.submissions));

    expect(result.current).toHaveLength(1);
  });
});

describe("hooks", () => {
  it("useSubmissions returns submissions from store", () => {
    const submission = mockSubmission();

    act(() => {
      useUserStore.getState().addSubmission(submission);
    });

    const { result } = renderHook(() => useSubmissions());

    expect(result.current).toEqual([submission]);
  });

  it("useAddSubmission returns addSubmission action", () => {
    const { result } = renderHook(() => useAddSubmission());

    act(() => {
      result.current(mockSubmission());
    });

    const submissions = useUserStore.getState().submissions;

    expect(submissions).toHaveLength(1);
  });
});
