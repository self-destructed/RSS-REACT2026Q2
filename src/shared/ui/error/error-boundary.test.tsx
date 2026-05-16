import { describe, it, expect, afterEach, beforeEach, vi } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import ErrorBoundary from './error-boundary';
import userEvent from '@testing-library/user-event';

afterEach(cleanup);

const ThrowError = ({ shouldThrow = true }: { shouldThrow?: boolean }) => {
  if (shouldThrow) {
    throw new Error('Test');
  }
  return <></>;
};

const createCustomFallback = (reset: () => void) => (
  <div>
    <p>Custom error message</p>
    <button onClick={reset}>Custom Reset</button>
  </div>
);

const realError = console.error;
let user: ReturnType<typeof userEvent.setup>;

describe('ErrorBoundary', () => {
  beforeEach(() => {
    console.error = vi.fn();
    user = userEvent.setup();
  });
  afterEach(() => {
    console.error = realError;
  });

  describe('render', () => {
    it('should render children when no error', () => {
      render(
        <ErrorBoundary>
          <p>Everything is fine</p>
        </ErrorBoundary>
      );
      expect(screen.getByText(/Everything is fine/i)).toBeInTheDocument();
    });

    it('should render fallback when error occurs', () => {
      render(
        <ErrorBoundary>
          <ThrowError />
          <p>Everything is fine</p>
        </ErrorBoundary>
      );

      expect(screen.queryByText(/Everything is fine/i)).not.toBeInTheDocument();
    });

    it('should render default error message when no fallback provided', () => {
      render(
        <ErrorBoundary>
          <ThrowError />
        </ErrorBoundary>
      );
      expect(
        screen.getByRole('heading', { name: /Sorry, something went wrong/i })
      ).toBeInTheDocument();
    });

    it('should render default reset button when no fallback provided', () => {
      render(
        <ErrorBoundary>
          <ThrowError />
        </ErrorBoundary>
      );
      expect(
        screen.getByRole('button', { name: /try again/i })
      ).toBeInTheDocument();
    });

    it('should render custom fallback when provided', () => {
      render(
        <ErrorBoundary fallback={createCustomFallback}>
          <ThrowError />
        </ErrorBoundary>
      );

      expect(screen.getByText('Custom error message')).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /Custom Reset/i })
      ).toBeInTheDocument();
    });

    it('should call reset on custom fallback button click', async () => {
      render(
        <ErrorBoundary fallback={createCustomFallback}>
          <ThrowError />
          <p>Original content</p>
        </ErrorBoundary>
      );

      expect(screen.getByText('Custom error message')).toBeInTheDocument();

      const button = screen.getByRole('button', { name: /Custom Reset/i });
      await user.click(button);
    });
  });

  describe('behavior', () => {
    it('should reset error when reset function is called (default fallback)', async () => {
      let shouldThrowError = true;

      const { rerender } = render(
        <ErrorBoundary>
          <ThrowError shouldThrow={shouldThrowError} />
          <p>Everything is fine</p>
        </ErrorBoundary>
      );

      expect(
        screen.getByText(/Sorry, something went wrong/i)
      ).toBeInTheDocument();

      shouldThrowError = false;
      rerender(
        <ErrorBoundary>
          <ThrowError shouldThrow={shouldThrowError} />
          <p>Everything is fine</p>
        </ErrorBoundary>
      );
      await user.click(screen.getByRole('button', { name: /try again/i }));

      expect(screen.getByText(/Everything is fine/i)).toBeInTheDocument();
    });

    it('should reset error when reset function is called (custom fallback)', async () => {
      let shouldThrowError = true;

      const { rerender } = render(
        <ErrorBoundary fallback={createCustomFallback}>
          <ThrowError shouldThrow={shouldThrowError} />
          <p>Content restored after reset</p>
        </ErrorBoundary>
      );

      expect(screen.getByText('Custom error message')).toBeInTheDocument();

      shouldThrowError = false;
      rerender(
        <ErrorBoundary fallback={createCustomFallback}>
          <ThrowError shouldThrow={shouldThrowError} />
          <p>Content restored after reset</p>
        </ErrorBoundary>
      );

      await user.click(screen.getByRole('button', { name: /Custom Reset/i }));

      expect(
        screen.queryByText('Custom error message')
      ).not.toBeInTheDocument();
      expect(
        screen.getByText('Content restored after reset')
      ).toBeInTheDocument();
    });
  });
});
