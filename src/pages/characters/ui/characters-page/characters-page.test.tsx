import { describe, it } from "vitest";

describe.skip("render", () => {
  it("should render search and main elements", () => {});
  it("should render spinner on loading", () => {});
  it("should render nothing on idle state", () => {});
  it("should render list after successful load", () => {});
  it("should render error after failed load", () => {});
  it("should render pagination on success", () => {});
});

describe.skip("behavior", () => {
  it("should not call onPrev on first page", () => {});
  it("should call onPrev when page is not first", () => {});
  it("should call onNext when next button clicked", () => {});
});
