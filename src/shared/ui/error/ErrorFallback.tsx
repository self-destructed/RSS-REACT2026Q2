import { Component, type ReactNode } from 'react';

interface Props {
  reset: () => void;
}

class ErrorFallback extends Component<Props> {
  public render(): ReactNode {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-200 p-4 dark:bg-neutral-950">
        <div className="rounded-lg bg-white p-8 text-center shadow-lg dark:bg-neutral-900">
          <h1 className="mb-4 text-2xl font-bold text-red-600">
            Oops! Something went wrong
          </h1>
          <p className="mb-6 text-gray-600 dark:text-gray-400">
            The application encountered an unexpected error.
          </p>
          <button
            onClick={this.props.reset}
            className="rounded-md bg-blue-600 px-6 py-2.5 text-white transition-colors hover:cursor-pointer hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }
}

export default ErrorFallback;
