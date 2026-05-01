import { Component, type ReactNode } from 'react';

interface Props {
  message: string;
}

class ErrorDisplay extends Component<Props> {
  render(): ReactNode {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-center text-red-700 dark:bg-red-950/40 dark:text-red-300">
        Error: {this.props.message}
      </div>
    );
  }
}

export default ErrorDisplay;
