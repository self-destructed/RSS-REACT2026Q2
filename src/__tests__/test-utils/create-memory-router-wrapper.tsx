import { type ReactNode } from "react";
import { MemoryRouter, Route, Routes } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LocationSpy } from "./location-spy";

export interface MemoryRouterWrapperOptions {
  initialEntries?: string[];
  withLocationSpy?: boolean;
  routePath?: string;
  fallbackPath?: string;
}

export function createMemoryRouterWrapper(
  options: MemoryRouterWrapperOptions = {},
): ({ children }: { children: ReactNode }) => React.JSX.Element {
  const {
    initialEntries = ["/"],
    withLocationSpy = false,
    routePath,
    fallbackPath = "*",
  } = options;

  return function Wrapper({ children }: { children: ReactNode }) {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

    return (
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={initialEntries}>
          {withLocationSpy && <LocationSpy />}
          {routePath ? (
            <Routes>
              <Route path={routePath} element={children} />
              <Route path={fallbackPath} element={children} />
            </Routes>
          ) : (
            children
          )}
        </MemoryRouter>
      </QueryClientProvider>
    );
  };
}
