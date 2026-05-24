import { type ReactNode } from "react";
import { Header } from "@shared/ui";

interface Props {
  children: ReactNode;
}

export function Layout({ children }: Props): React.JSX.Element {
  return (
    <div className="grid min-h-screen grid-rows-[min-content_1fr_auto] bg-slate-200 dark:bg-neutral-950">
      <Header />
      {children}
    </div>
  );
}
