import { useCallback, useEffect, useState } from 'react';
import Search from '../../../shared/ui/search';
import type { Character } from '../../../shared/api/types';
import { APIService } from '../../../shared/api/api';
import useLocalStorage from '../../../shared/hooks/useLocalStorage';
import { Spinner } from '../../../shared/ui/spinner';
import { ErrorDisplay } from '../../../shared/ui/error';
import { CharactersList } from '../../../features/characters/ui';
import Main from '../../../shared/ui/main';
import Layout from '../../../shared/ui/layout';

const STORAGE_KEY = 'lastSearchQuery';

type LoadingState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error };

type CharactersPageState = LoadingState<Character[]> & {
  characterNameQuery: string;
};

export default function CharactersPage() {
  const [searchQuery, setSearchQuery] = useLocalStorage(STORAGE_KEY, '');
  const [state, setState] = useState<CharactersPageState>(() => ({
    status: 'idle',
    characterNameQuery: searchQuery,
  }));

  const loadCharacters = useCallback(
    async (query?: string) => {
      const searchQuery = query ?? state.characterNameQuery;
      setState((prev) => ({ ...prev, status: 'loading' }));

      try {
        const data = searchQuery
          ? await APIService.fetchCharacters({ name: searchQuery })
          : await APIService.fetchCharacters();

        setState((prev) => ({
          ...prev,
          status: 'success',
          data: data.results || [],
        }));
      } catch (error) {
        setState((prev) => ({
          ...prev,
          status: 'error',
          error: error instanceof Error ? error : new Error('Unknown error'),
        }));
      }
    },
    [state.characterNameQuery]
  );

  useEffect(() => {
    loadCharacters();
  }, [loadCharacters]);

  const handleSearchSubmit = (searchQuery: string) => {
    if (searchQuery === state.characterNameQuery && state.status !== 'error') {
      return;
    }

    setSearchQuery(searchQuery);
    setState((prev) => ({ ...prev, characterNameQuery: searchQuery }));
  };

  return (
    <Layout>
      <Main>
        <section className="mb-6 rounded-lg bg-white sm:mb-8 dark:bg-neutral-900">
          <div className="p-4 sm:p-5 lg:p-6">
            <Search
              onSubmit={handleSearchSubmit}
              query={state.characterNameQuery}
            />
          </div>
        </section>
        <section className="rounded-lg bg-white/80 dark:bg-neutral-800/60">
          <div className="p-4 sm:p-5 lg:p-6">
            {state.status === 'loading' && (
              <div className="flex justify-center py-6">
                <Spinner />
              </div>
            )}
            {state.status === 'error' && (
              <ErrorDisplay message={state.error.message} />
            )}
            {state.status === 'success' && <CharactersList data={state.data} />}
          </div>
        </section>
      </Main>
    </Layout>
  );
}
