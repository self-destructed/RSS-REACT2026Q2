import { expect, afterEach, describe, test, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { cleanup } from '@testing-library/react';
import CharacterCard from './character-card';
import type { Character } from '../../../shared/api/types';

beforeEach(() => {
  const mockCharacter: Character = {
    id: 1,
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Male',
    origin: {
      name: '',
      url: '',
    },
    location: {
      name: 'Citadel of Ricks',
      url: '',
    },
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    episode: [],
    url: '',
    created: '',
  };
  render(<CharacterCard data={mockCharacter} />);
});

afterEach(cleanup);

describe('CharacterCard', () => {
  test('renders with name', () => {
    expect(
      screen.getByRole('heading', { name: /Rick Sanchez/ })
    ).toBeInTheDocument();
  });
  test('renders with status', () => {
    expect(screen.getByText('Alive')).toBeInTheDocument();
  });
  test('renders with gender', () => {
    expect(screen.getByText(/Male/)).toBeInTheDocument();
  });
  test('renders with location', () => {
    expect(screen.getByText('Citadel of Ricks')).toBeInTheDocument();
  });
});
