import { ErrorBoundary, ErrorFallback, ErrorTrigger } from "@shared/ui";
import { BrowserRouter } from "react-router";
import { AppRoutes } from "./AppRoutes";
import { ThemeProvider } from "@shared/context";

export function App(): React.JSX.Element {
  return (
    <ThemeProvider>
      <ErrorBoundary fallback={(reset) => <ErrorFallback reset={reset} />}>
        <BrowserRouter basename="/RSS-REACT2026Q2/">
          <AppRoutes />
        </BrowserRouter>
        <div className="fixed left-0 top-1/2 z-50 origin-top-left -translate-y-1/2 -rotate-90">
          <ErrorTrigger />
        </div>
      </ErrorBoundary>
    </ThemeProvider>
  );
}
