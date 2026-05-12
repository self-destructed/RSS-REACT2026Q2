import { type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div className="min-h-screen bg-slate-200 dark:bg-neutral-950">
      {children}
    </div>
  );
}
