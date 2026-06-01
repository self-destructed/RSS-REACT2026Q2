import { screen } from "@testing-library/react";

export function getSearchParams(): URLSearchParams {
  const search = screen.getByTestId("location").textContent || "";
  return new URLSearchParams(search);
}
