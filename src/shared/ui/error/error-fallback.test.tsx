import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import ErrorFallback from './error-fallback';

afterEach(cleanup);

describe('ErrorFallback', () => {
  describe('render', () => {
    it('should render error heading', () => {
      render(<ErrorFallback reset={vi.fn()} />);

      expect(
        screen.getByText('Oops! Something went wrong')
      ).toBeInTheDocument();
    });

    it('should render error message', () => {
      render(<ErrorFallback reset={vi.fn()} />);

      expect(
        screen.getByText('The application encountered an unexpected error.')
      ).toBeInTheDocument();
    });

    it('should render try again button', () => {
      render(<ErrorFallback reset={vi.fn()} />);

      expect(
        screen.getByRole('button', { name: 'Try Again' })
      ).toBeInTheDocument();
    });
  });

  describe('behavior', () => {
    it('should call reset callback on button click', () => {
      const resetMock = vi.fn();
      render(<ErrorFallback reset={resetMock} />);

      const button = screen.getByRole('button', { name: 'Try Again' });
      fireEvent.click(button);

      expect(resetMock).toHaveBeenCalledTimes(1);
    });
  });
});
