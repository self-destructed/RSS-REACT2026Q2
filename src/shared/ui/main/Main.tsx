import { type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function Main({ children }: Props) {
  return (
    <main>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        {children}
      </div>
    </main>
  );
}
