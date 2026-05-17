import { describe, it, expect, afterEach, vi, beforeEach } from 'vitest';
import { render, screen, cleanup, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CharactersPage from './characters-page';
import type { Character } from '../../../shared/api/types';
import { createLocalStorageMock } from '../../../shared/api/__mocks__/local-storage';

afterEach(cleanup);

const mockCharacters: Character[] = [
  {
    id: 1,
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Male',
    origin: { name: 'Earth', url: '' },
    location: { name: 'Earth', url: '' },
    image: '',
    episode: [],
    url: '',
    created: '',
  },
  {
    id: 2,
    name: 'Morty Smith',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Male',
    origin: { name: 'Earth', url: '' },
    location: { name: 'Earth', url: '' },
    image: '',
    episode: [],
    url: '',
    created: '',
  },
  {
    id: 3,
    name: 'Summer Smith',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Female',
    origin: { name: 'Earth', url: '' },
    location: { name: 'Earth', url: '' },
    image: '',
    episode: [],
    url: '',
    created: '',
  },
  {
    id: 4,
    name: 'Beth Smith',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Female',
    origin: { name: 'Earth', url: '' },
    location: { name: 'Earth', url: '' },
    image: '',
    episode: [],
    url: '',
    created: '',
  },
  {
    id: 5,
    name: 'Jerry Smith',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Male',
    origin: { name: 'Earth', url: '' },
    location: { name: 'Earth', url: '' },
    image: '',
    episode: [],
    url: '',
    created: '',
  },
  {
    id: 6,
    name: 'Rickity Smith',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Male',
    origin: { name: 'Earth', url: '' },
    location: { name: 'Earth', url: '' },
    image: '',
    episode: [],
    url: '',
    created: '',
  },
  {
    id: 7,
    name: 'Evil Morty',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Male',
    origin: { name: 'The Citadel', url: '' },
    location: { name: 'The Citadel', url: '' },
    image: '',
    episode: [],
    url: '',
    created: '',
  },
  {
    id: 8,
    name: 'Birdperson',
    status: 'Dead',
    species: 'Bird-Person',
    type: '',
    gender: 'Male',
    origin: { name: 'Bird World', url: '' },
    location: { name: 'Earth', url: '' },
    image: '',
    episode: [],
    url: '',
    created: '',
  },
  {
    id: 9,
    name: 'Pickle Rick',
    status: 'Alive',
    species: 'Human',
    type: 'Pickle',
    gender: 'Male',
    origin: { name: 'Earth', url: '' },
    location: { name: 'Earth', url: '' },
    image: '',
    episode: [],
    url: '',
    created: '',
  },
  {
    id: 10,
    name: 'Mr. Meeseeks',
    status: 'Alive',
    species: 'Meeseeks',
    type: '',
    gender: 'Male',
    origin: { name: 'Meeseeks Box', url: '' },
    location: { name: 'Earth', url: '' },
    image: '',
    episode: [],
    url: '',
    created: '',
  },
];

const renderComponent = () => render(<CharactersPage />);

describe.skip('render', () => {
  beforeEach(() => {
    vi.stubGlobal('localStorage', createLocalStorageMock());
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it('should render search and main elements', () => {
    vi.spyOn(globalThis, 'fetch').mockImplementation(
      () => new Promise(() => {})
    );

    renderComponent();

    expect(screen.getByRole('search')).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('should render spinner on loading', () => {
    vi.spyOn(globalThis, 'fetch').mockImplementation(
      () => new Promise(() => {})
    );

    renderComponent();

    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.queryByText(/error/i)).not.toBeInTheDocument();
    expect(screen.queryByText('Rick Sanchez')).not.toBeInTheDocument();
  });

  it('should render list after successful load', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ results: mockCharacters }),
    } as Response);

    renderComponent();

    await waitFor(() => {
      expect(screen.getByRole('list')).toBeInTheDocument();
    });

    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Morty Smith')).toBeInTheDocument();
  });

  it('should render error after failed load', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: false,
      json: () => Promise.resolve({ error: 'Not found' }),
    } as Response);

    renderComponent();

    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });
  });
});

describe.skip('behavior', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it('should load characters from localStorage on mount', async () => {
    const mockLocalStorage = createLocalStorageMock() as unknown as {
      getItem: ReturnType<typeof vi.fn>;
    };
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify('rick'));
    vi.stubGlobal('localStorage', mockLocalStorage);

    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ results: [mockCharacters[0]] }),
    } as Response);

    renderComponent();

    await waitFor(() => {
      expect(globalThis.fetch).toHaveBeenCalledWith(
        expect.stringContaining('name=rick')
      );
    });

    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
  });

  it('should call fetch and render filtered results on search', async () => {
    vi.stubGlobal('localStorage', createLocalStorageMock());

    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ results: [mockCharacters[1]] }),
    } as Response);

    renderComponent();

    const input = screen.getByLabelText('Search', { selector: 'input' });
    await userEvent.type(input, 'morty{Enter}');

    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalledWith(
        expect.stringContaining('name=morty')
      );
    });

    expect(screen.getByText('Morty Smith')).toBeInTheDocument();
  });

  it('should render correct number of filtered results', async () => {
    vi.stubGlobal('localStorage', createLocalStorageMock());

    const filteredCharacters = mockCharacters.filter((char) =>
      char.name.toLowerCase().includes('rick')
    );

    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ results: filteredCharacters }),
    } as Response);

    renderComponent();

    const input = screen.getByLabelText('Search', { selector: 'input' });
    await userEvent.type(input, 'rick{Enter}');

    await waitFor(() => {
      expect(screen.getAllByRole('listitem')).toHaveLength(
        filteredCharacters.length
      );
    });
  });
});
