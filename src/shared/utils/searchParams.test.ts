import { describe, it, expect } from 'vitest';
import { updateSearchParams } from './searchParams';

describe('updateSearchParams', () => {
  it('sets a new param', () => {
    const current = new URLSearchParams();

    const result = updateSearchParams(current, { page: '2' });

    expect(result.get('page')).toBe('2');
  });

  it('overwrites existing param', () => {
    const current = new URLSearchParams('page=1&name=rick');

    const result = updateSearchParams(current, { page: '3' });

    expect(result.get('page')).toBe('3');
    expect(result.get('name')).toBe('rick');
  });

  it('deletes param when value is null', () => {
    const current = new URLSearchParams('page=1&name=rick');

    const result = updateSearchParams(current, { name: null });

    expect(result.get('name')).toBeNull();
    expect(result.get('page')).toBe('1');
  });

  it('does not mutate original params', () => {
    const current = new URLSearchParams('page=1');

    updateSearchParams(current, { name: 'rick' });

    expect(current.get('name')).toBeNull();
  });

  it('handles empty updates', () => {
    const current = new URLSearchParams('page=1');

    const result = updateSearchParams(current, {});

    expect(result.get('page')).toBe('1');
  });

  it('sets multiple params at once', () => {
    const current = new URLSearchParams();

    const result = updateSearchParams(current, {
      page: '2',
      name: 'morty',
    });

    expect(result.get('page')).toBe('2');
    expect(result.get('name')).toBe('morty');
  });
});
