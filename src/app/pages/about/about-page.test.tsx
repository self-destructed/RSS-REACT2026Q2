import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import AboutPage from "./about-page";

const renderWithRouter = () => {
  return render(
    <BrowserRouter>
      <AboutPage />
    </BrowserRouter>,
  );
};

describe("AboutPage", () => {
  it("renders About heading", () => {
    const { getByRole } = renderWithRouter();
    const heading = getByRole("heading", { name: /about/i });

    expect(heading).toBeInTheDocument();
  });

  it("renders RS School info", () => {
    const { getByText } = renderWithRouter();
    const infoText = getByText(/touch some grass/i);

    expect(infoText).toBeInTheDocument();
  });

  it("renders link to RS School course", () => {
    const { getByRole } = renderWithRouter();
    const link = getByRole("link", { name: /rs school/i });

    expect(link).toBeInTheDocument();
  });

  it("has correct link href", () => {
    const { getByRole } = renderWithRouter();
    const link = getByRole("link", { name: /rs school/i });

    expect(link).toHaveAttribute("href", "https://rs.school/courses/reactjs");
  });
});
