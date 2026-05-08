import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import Layout from './Layout';

afterEach(cleanup);

const MockChild = () => <div>Mock Child Content</div>;

describe('Layout', () => {
  describe('render', () => {
    it('should render children', () => {
      render(
        <Layout>
          <MockChild />
        </Layout>
      );

      expect(screen.getByText('Mock Child Content')).toBeInTheDocument();
    });
  });
});
