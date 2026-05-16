import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import ErrorTrigger from './error-trigger';
import userEvent from '@testing-library/user-event';

afterEach(cleanup);

describe('ErrorTrigger', () => {
  describe('render', () => {
    it('should render button', () => {
      render(<ErrorTrigger />);

      expect(
        screen.getByRole('button', { name: /trigger error/i })
      ).toBeInTheDocument();
    });
  });

  describe('behavior', () => {
    it('throws an error on button click', async () => {
      render(<ErrorTrigger />);
      const user = userEvent.setup();

      await expect(user.click(screen.getByRole('button'))).rejects.toThrow(
        '💣 Boom! Error triggered by user'
      );
    });
  });
});
