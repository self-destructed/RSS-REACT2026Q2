import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pagination } from './Pagination';

afterEach(cleanup);

describe('Pagination', () => {
  describe('rendering', () => {
    beforeEach(() => {
      render(
        <Pagination
          currentPage={5}
          totalPages={20}
          onPrev={vi.fn()}
          onNext={vi.fn()}
        />
      );
    });

    it('renders prev button', () => {
      expect(screen.getByRole('button', { name: /prev/i })).toBeInTheDocument();
    });

    it('renders next button', () => {
      expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
    });

    it('renders counter with correct page info', () => {
      expect(screen.getByText(/\d+\/\d+/)).toBeInTheDocument();
    });

    it('renders counter with 1/1', () => {
      cleanup();
      render(
        <Pagination
          currentPage={1}
          totalPages={1}
          onPrev={vi.fn()}
          onNext={vi.fn()}
        />
      );
      expect(screen.getByText('1/1')).toBeInTheDocument();
    });
  });

  describe('disabled state', () => {
    it('disables prev button on first page', () => {
      render(
        <Pagination
          currentPage={1}
          totalPages={20}
          onPrev={vi.fn()}
          onNext={vi.fn()}
        />
      );
      expect(screen.getByRole('button', { name: /prev/i })).toBeDisabled();
    });

    it('disables next button on last page', () => {
      render(
        <Pagination
          currentPage={20}
          totalPages={20}
          onPrev={vi.fn()}
          onNext={vi.fn()}
        />
      );
      expect(screen.getByRole('button', { name: /next/i })).toBeDisabled();
    });

    it('disables both buttons when only one page', () => {
      render(
        <Pagination
          currentPage={1}
          totalPages={1}
          onPrev={vi.fn()}
          onNext={vi.fn()}
        />
      );
      expect(screen.getByRole('button', { name: /prev/i })).toBeDisabled();
      expect(screen.getByRole('button', { name: /next/i })).toBeDisabled();
    });

    it('enables both buttons in the middle of pages', () => {
      render(
        <Pagination
          currentPage={5}
          totalPages={20}
          onPrev={vi.fn()}
          onNext={vi.fn()}
        />
      );
      expect(screen.getByRole('button', { name: /prev/i })).toBeEnabled();
      expect(screen.getByRole('button', { name: /next/i })).toBeEnabled();
    });
  });

  describe('callbacks', () => {
    it('calls onPrev when prev button is clicked', async () => {
      const user = userEvent.setup();
      const onPrev = vi.fn();
      render(
        <Pagination
          currentPage={5}
          totalPages={20}
          onPrev={onPrev}
          onNext={vi.fn()}
        />
      );
      await user.click(screen.getByRole('button', { name: /prev/i }));
      expect(onPrev).toHaveBeenCalledTimes(1);
    });

    it('calls onNext when next button is clicked', async () => {
      const user = userEvent.setup();
      const onNext = vi.fn();
      render(
        <Pagination
          currentPage={5}
          totalPages={20}
          onPrev={vi.fn()}
          onNext={onNext}
        />
      );
      await user.click(screen.getByRole('button', { name: /next/i }));
      expect(onNext).toHaveBeenCalledTimes(1);
    });

    it('does not call onPrev when prev button is disabled', async () => {
      const user = userEvent.setup();
      const onPrev = vi.fn();
      render(
        <Pagination
          currentPage={1}
          totalPages={20}
          onPrev={onPrev}
          onNext={vi.fn()}
        />
      );
      await user.click(screen.getByRole('button', { name: /prev/i }));
      expect(onPrev).not.toHaveBeenCalled();
    });

    it('does not call onNext when next button is disabled', async () => {
      const user = userEvent.setup();
      const onNext = vi.fn();
      render(
        <Pagination
          currentPage={20}
          totalPages={20}
          onPrev={vi.fn()}
          onNext={onNext}
        />
      );
      await user.click(screen.getByRole('button', { name: /next/i }));
      expect(onNext).not.toHaveBeenCalled();
    });
  });
});
