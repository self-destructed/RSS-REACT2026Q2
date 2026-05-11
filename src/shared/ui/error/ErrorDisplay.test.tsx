import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import ErrorDisplay from './ErrorDisplay';

afterEach(cleanup);

describe('ErrorDisplay', () => {
  describe('render', () => {
    it('should render error message', () => {
      render(<ErrorDisplay message="Something went wrong" />);

      expect(
        screen.getByText('Error: Something went wrong')
      ).toBeInTheDocument();
    });
  });
});
