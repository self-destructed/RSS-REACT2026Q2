// https://medium.com/@pf.souza15/unit-testing-with-vitest-and-react-from-zero-to-ci-cd-pipeline-77e6c328d756
import "@testing-library/jest-dom";
import { vi } from "vitest";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});

vi.mock("@shared/ui/header", () => ({
  Header: () => null,
}));
