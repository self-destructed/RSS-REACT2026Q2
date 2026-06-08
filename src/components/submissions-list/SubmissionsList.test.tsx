import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import SubmissionsList from "./SubmissionsList";
import { useUserStore, type Submission } from "@/store/userStore";

function createMockSubmission(overrides: Partial<Submission> = {}): Submission {
  return {
    id: "test-id-1",
    name: "Rick Sanchez",
    age: 35,
    email: "rick@example.com",
    gender: "male",
    terms: true,
    password: "Test1@abc",
    country: "Russia",
    imageBase64: undefined,
    ...overrides,
  };
}

beforeEach(() => {
  useUserStore.setState({ submissions: [] });
});

describe("SubmissionsList", () => {
  it("shows 'No submissions yet' when store is empty", () => {
    render(<SubmissionsList />);

    expect(screen.getByText("No submissions yet")).toBeInTheDocument();
  });

  it("renders submission cards with name, age, email, gender, country", () => {
    const submission = createMockSubmission();
    useUserStore.setState({ submissions: [submission] });

    render(<SubmissionsList />);

    expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
    expect(screen.getByText("35")).toBeInTheDocument();
    expect(screen.getByText("rick@example.com")).toBeInTheDocument();
    expect(screen.getByText("male")).toBeInTheDocument();
    expect(screen.getByText("Russia")).toBeInTheDocument();
  });

  it("renders image when imageBase64 is present", () => {
    const submission = createMockSubmission({
      imageBase64: "data:image/png;base64,fakebase64data",
    });
    useUserStore.setState({ submissions: [submission] });

    render(<SubmissionsList />);

    const img = screen.getByAltText("");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "data:image/png;base64,fakebase64data");
  });
});
