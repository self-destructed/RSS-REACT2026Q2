import { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

class Layout extends Component<Props> {
  render(): ReactNode {
    return (
      <div className="min-h-screen bg-slate-200 dark:bg-neutral-950">
        {this.props.children}
      </div>
    );
  }
}

export default Layout;
