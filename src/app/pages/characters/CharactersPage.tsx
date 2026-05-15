import { useCallback, useEffect, useState } from 'react';
import Search from '../../../shared/ui/search';
import type { Character } from '../../../shared/api/types';
import { APIService } from '../../../shared/api/api';
import useLocalStorage from '../../../shared/hooks/useLocalStorage';
import { Spinner } from '../../../shared/ui/spinner';
import { ErrorDisplay } from '../../../shared/ui/error';
import { CharactersList } from '../../../features/characters/ui';
import { Pagination } from '../../../shared/ui/pagination';
import Main from '../../../shared/ui/main';
import Layout from '../../../shared/ui/layout';

const STORAGE_KEY = 'lastSearchQuery';

type LoadingState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error };

type PaginationState = {
  currentPage: number;
  totalPages: number;
};

type CharactersPageState = LoadingState<Character[]> & {
  characterNameQuery: string;
  pagination: PaginationState;
};

export default function CharactersPage() {
  const [searchQuery, setSearchQuery] = useLocalStorage(STORAGE_KEY, '');
  const [state, setState] = useState<CharactersPageState>(() => ({
    status: 'idle',
    characterNameQuery: searchQuery,
    pagination: { currentPage: 1, totalPages: 1 },
  }));

  const loadCharacters = useCallback(async () => {
    setState((prev) => ({ ...prev, status: 'loading' }));

    try {
      const data = await APIService.fetchCharacters({
        name: state.characterNameQuery,
        page: state.pagination.currentPage,
      });

      setState((prev) => ({
        ...prev,
        status: 'success',
        data: data.results || [],
        pagination: {
          ...prev.pagination,
          totalPages: data.info?.pages ?? 1,
        },
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        status: 'error',
        error: error instanceof Error ? error : new Error('Unknown error'),
      }));
    }
  }, [state.characterNameQuery, state.pagination.currentPage]);

  useEffect(() => {
    loadCharacters();
  }, [loadCharacters]);

  const handleSearchSubmit = (query: string) => {
    if (query === state.characterNameQuery && state.status !== 'error') {
      return;
    }

    setSearchQuery(query);
    setState((prev) => ({
      ...prev,
      characterNameQuery: query,
      pagination: { ...prev.pagination, currentPage: 1 },
    }));
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
          {state.status === 'success' && (
            <div className="mt-4 flex justify-center">
              <Pagination
                currentPage={state.pagination.currentPage}
                totalPages={state.pagination.totalPages}
                onPrev={() =>
                  setState((prev) => ({
                    ...prev,
                    pagination: {
                      ...prev.pagination,
                      currentPage: prev.pagination.currentPage - 1,
                    },
                  }))
                }
                onNext={() =>
                  setState((prev) => ({
                    ...prev,
                    pagination: {
                      ...prev.pagination,
                      currentPage: prev.pagination.currentPage + 1,
                    },
                  }))
                }
              />
            </div>
          )}
        </section>
      </Main>
    </Layout>
  );
}
