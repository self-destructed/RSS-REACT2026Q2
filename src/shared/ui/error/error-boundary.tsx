import { Component, type ReactNode } from 'react';

interface Props {
  children?: ReactNode;
  fallback?: (reset: () => void) => ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  private reset = (): void => {
    this.setState({ hasError: false });
  };

  public render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback(this.reset);
      }
      return (
        <div className="flex flex-col items-center justify-center p-8">
          <h1 className="mb-4 text-2xl font-bold text-red-600">
            Sorry, something went wrong
          </h1>
          <button
            onClick={this.reset}
            className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
