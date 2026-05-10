import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import Main from './Main';

afterEach(cleanup);

const MockChild = () => <div>Mock Child Content</div>;

describe('Main', () => {
  describe('render', () => {
    it('should render children', () => {
      render(
        <Main>
          <MockChild />
        </Main>
      );

      expect(screen.getByText('Mock Child Content')).toBeInTheDocument();
    });

    it('should render main element', () => {
      render(
        <Main>
          <MockChild />
        </Main>
      );

      expect(screen.getByRole('main')).toBeInTheDocument();
    });
  });
});
