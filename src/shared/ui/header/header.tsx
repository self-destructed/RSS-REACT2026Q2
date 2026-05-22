import { Navbar } from "@shared/ui/navbar";
import { ThemeToggle } from "@shared/ui/theme-toggle";
import { useTheme } from "@shared/hooks";

export default function Header(): React.JSX.Element {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="shadow-dark-mild relative flex w-full flex-wrap items-center justify-between bg-zinc-50 py-2 lg:py-4 dark:bg-neutral-700">
      <div className="flex w-full flex-wrap items-center justify-between px-3">
        <div className="basis-full md:basis-auto">
          <Navbar />
        </div>
        <ThemeToggle theme={theme} onToggle={toggleTheme} />
      </div>
    </header>
  );
}
