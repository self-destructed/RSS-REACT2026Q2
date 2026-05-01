import { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

class Main extends Component<Props> {
  render(): ReactNode {
    return (
      <main className="min-h-screen bg-slate-200 px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12 dark:bg-neutral-950">
        <div className="mx-auto max-w-7xl">{this.props.children}</div>
      </main>
    );
  }
}

export default Main;
