import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ErrorBoundary, ErrorFallback, ErrorTrigger } from "@shared/ui";
import { BrowserRouter } from "react-router";
import { ThemeProvider } from "@shared/context";
import "../styles/index.css";
import { Router } from "../routes";
import { QueryProvider } from "../providers";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found");
}

createRoot(rootElement).render(
  <StrictMode>
    <QueryProvider>
      <ThemeProvider>
        <ErrorBoundary fallback={(reset) => <ErrorFallback reset={reset} />}>
          <BrowserRouter basename="/RSS-REACT2026Q2/">
            <Router />
          </BrowserRouter>
          <div className="fixed left-0 top-1/2 z-50 origin-top-left -translate-y-1/2 -rotate-90">
            <ErrorTrigger />
          </div>
        </ErrorBoundary>
      </ThemeProvider>
    </QueryProvider>
  </StrictMode>,
);
