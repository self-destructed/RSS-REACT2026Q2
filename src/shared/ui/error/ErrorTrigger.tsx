import { Component, type ReactNode } from 'react';

class ErrorTrigger extends Component<object, { shouldError: boolean }> {
  state = { shouldError: false };

  private handleClick = (): void => {
    this.setState({ shouldError: true });
  };

  public render(): ReactNode {
    if (this.state.shouldError) {
      throw new Error('💣 Boom! Error triggered by user');
    }

    return (
      <button
        onClick={this.handleClick}
        className="rounded-md bg-red-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:cursor-pointer hover:bg-red-700"
      >
        💣 Trigger Error
      </button>
    );
  }
}

export default ErrorTrigger;
