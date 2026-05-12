import { describe, it, expect, afterEach, beforeEach, vi } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Search from './Search';

afterEach(cleanup);

describe('Search', () => {
  describe('render', () => {
    beforeEach(() => {
      render(<Search />);
    });

    it('should render without crashing', () => {
      expect(screen.getByRole('searchbox')).toBeInTheDocument();
    });

    it('should render form', () => {
      expect(screen.getByRole('search')).toBeInTheDocument();
    });

    it('should render input', () => {
      expect(
        screen.getByLabelText('Search', { selector: 'input' })
      ).toBeInTheDocument();
    });

    it('should render submit button', () => {
      expect(
        screen.getByRole('button', { name: /search/i })
      ).toBeInTheDocument();
    });
  });

  describe('state', () => {
    it('should update state on input change', async () => {
      render(<Search />);
      const input = screen.getByLabelText('Search', { selector: 'input' });

      await userEvent.type(input, 'rick');

      expect(input).toHaveValue('rick');
    });

    it('should trim whitespaces on submit', async () => {
      render(<Search />);
      const input = screen.getByLabelText('Search', { selector: 'input' });
      const button = screen.getByRole('button', { name: /search/i });

      await userEvent.type(input, ' rick ');
      await userEvent.click(button);

      expect(input).toHaveValue('rick');
    });

    it('should submit on Enter key press', async () => {
      const onSubmit = vi.fn();
      render(<Search onSubmit={onSubmit} />);
      const input = screen.getByLabelText('Search', { selector: 'input' });

      await userEvent.type(input, 'rick{Enter}');

      expect(onSubmit).toHaveBeenCalledWith('rick');
    });
  });

  describe('props', () => {
    it('should set initial value from query prop', () => {
      render(<Search query="initial" />);
      const input = screen.getByLabelText('Search', { selector: 'input' });

      expect(input).toHaveValue('initial');
    });

    it('should call onSubmit with trimmed value on form submit', async () => {
      const onSubmit = vi.fn();
      render(<Search onSubmit={onSubmit} />);
      const input = screen.getByLabelText('Search', { selector: 'input' });
      const button = screen.getByRole('button', { name: /search/i });

      await userEvent.type(input, '  rick  ');
      await userEvent.click(button);

      expect(onSubmit).toHaveBeenCalledWith('rick');
    });

    it.skip('should update state when query prop changes', async () => {
      const { rerender } = render(<Search query="old" />);
      const input = screen.getByLabelText('Search', { selector: 'input' });
      expect(input).toHaveValue('old');

      rerender(<Search query="new" />);

      expect(input).toHaveValue('new');
    });
  });
});
