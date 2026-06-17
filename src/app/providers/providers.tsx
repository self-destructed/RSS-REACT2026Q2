"use client";

import type { ReactNode } from "react";
import { QueryProvider } from "./query-provider";
import { ThemeProvider } from "@shared/context/theme";

interface Props {
  children: ReactNode;
}

export function Providers({ children }: Props): React.JSX.Element {
  return (
    <QueryProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </QueryProvider>
  );
}
