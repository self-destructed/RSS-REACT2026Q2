import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import Layout from "./layout";

afterEach(cleanup);

const MockChild = () => <div>Mock Child Content</div>;

describe("Layout", () => {
  describe("render", () => {
    it("should render children", () => {
      render(
        <BrowserRouter>
          <Layout>
            <MockChild />
          </Layout>
        </BrowserRouter>,
      );

      expect(screen.getByText("Mock Child Content")).toBeInTheDocument();
    });
  });
});
