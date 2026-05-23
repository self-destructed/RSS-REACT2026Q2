import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { AboutPage } from "./about-page";

const renderComponent = () => {
  return render(<AboutPage />);
};

describe("AboutPage", () => {
  it("renders About heading", () => {
    const { getByRole } = renderComponent();
    const heading = getByRole("heading", { name: /about/i });

    expect(heading).toBeInTheDocument();
  });

  it("renders RS School info", () => {
    const { getByText } = renderComponent();
    const infoText = getByText(/touch some grass/i);

    expect(infoText).toBeInTheDocument();
  });

  it("renders link to RS School course", () => {
    const { getByRole } = renderComponent();
    const link = getByRole("link", { name: /rs school/i });

    expect(link).toBeInTheDocument();
  });

  it("has correct link href", () => {
    const { getByRole } = renderComponent();
    const link = getByRole("link", { name: /rs school/i });

    expect(link).toHaveAttribute("href", "https://rs.school/courses/reactjs");
  });
});
