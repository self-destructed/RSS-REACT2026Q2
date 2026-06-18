"use client";

import type { ReactNode } from "react";
import { ThemeProvider } from "@shared/context/theme";

interface Props {
  children: ReactNode;
}

export function Providers({ children }: Props): React.JSX.Element {
  return <ThemeProvider>{children}</ThemeProvider>;
}
