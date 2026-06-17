"use client";

import { useEffect } from "react";
import { ThemeContext, type Theme } from "./theme-context";
import { useLocalStorage } from "@shared/lib/hooks/use-local-storage";
import { DEFAULT_THEME } from "@shared/config/theme";

export function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  const [theme, setTheme] = useLocalStorage<Theme>("theme", DEFAULT_THEME);

  useEffect(() => {
    if (document.documentElement.dataset.theme === theme) {
      return;
    }
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
