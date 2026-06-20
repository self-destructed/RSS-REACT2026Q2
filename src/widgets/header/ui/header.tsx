import { Navbar } from "@shared/ui/navbar";
import { ErrorTrigger } from "@shared/ui/error";

export function Header(): React.JSX.Element {
  return (
    <header className="shadow-dark-mild relative flex w-full flex-wrap items-center justify-between bg-zinc-50 py-2 lg:py-4 dark:bg-neutral-700">
      <div className="flex w-full flex-wrap items-center justify-between px-3">
        <div className="basis-full md:basis-auto">
          <Navbar />
        </div>
        <div className="flex items-center gap-2">
          <ErrorTrigger />
        </div>
      </div>
    </header>
  );
}
