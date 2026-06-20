"use client";

import type { ReactNode } from "react";
import { ThemeProvider } from "@shared/context/theme";
import { ErrorBoundary } from "@shared/ui/error";

interface Props {
  children: ReactNode;
}

export function Providers({ children }: Props): React.JSX.Element {
  return (
    <ErrorBoundary>
      <ThemeProvider>{children}</ThemeProvider>
    </ErrorBoundary>
  );
}
