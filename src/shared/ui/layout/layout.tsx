import { type ReactNode } from 'react';
import Navbar from '../navbar';

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props): React.JSX.Element {
  return (
    <div className="min-h-screen bg-slate-200 dark:bg-neutral-950">
      <Navbar />
      {children}
    </div>
  );
}
