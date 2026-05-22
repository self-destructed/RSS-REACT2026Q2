import { useEffect } from "react";
import { ThemeContext, type Theme } from "./theme-context";
import useLocalStorage from "@shared/hooks/use-local-storage/use-local-storage";

const initialTheme: Theme = window.matchMedia("(prefers-color-scheme: dark)")
  .matches
  ? "dark"
  : "light";

export function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  const [theme, setTheme] = useLocalStorage<Theme>("theme", initialTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
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
