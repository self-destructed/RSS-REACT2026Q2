import { type ReactNode } from "react";
import { Header } from "../header";

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props): React.JSX.Element {
  return (
    <div className="min-h-screen bg-slate-200 dark:bg-neutral-950">
      <Header />
      {children}
    </div>
  );
}
