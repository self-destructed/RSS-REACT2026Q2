import { useCallback, useEffect, useRef, useState } from 'react';
import { Outlet, useNavigate, useParams, useSearchParams } from 'react-router';
import Search from '../../../shared/ui/search';
import type { Character } from '../../../shared/api/types';
import { APIService } from '../../../shared/api/api';
import useLocalStorage from '../../../shared/hooks/use-local-storage';
import { Spinner } from '../../../shared/ui/spinner';
import { ErrorDisplay } from '../../../shared/ui/error';
import { CharacterList } from '../../../features/characters/ui';
import { Pagination } from '../../../shared/ui/pagination';
import { updateSearchParams } from '../../../shared/utils';
import Main from '../../../shared/ui/main';
import Layout from '../../../shared/ui/layout';

const CHARACTER_QUERY_STORAGE_KEY = 'characterQuery';

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
  const [params, setParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useLocalStorage(
    CHARACTER_QUERY_STORAGE_KEY,
    ''
  );
  const navigate = useNavigate();
  const { id } = useParams();

  const [state, setState] = useState<CharactersPageState>(() => ({
    status: 'idle',
    characterNameQuery: params.get('name') || searchQuery,
    pagination: {
      currentPage: Number(params.get('page')) || 1,
      totalPages: 1,
    },
  }));

  const fetchCharacters = useCallback(async () => {
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
    fetchCharacters();
  }, [fetchCharacters]);

  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      const urlPage = Number(params.get('page')) || 1;
      const urlName = params.get('name') || searchQuery;

      if (
        urlPage !== state.pagination.currentPage ||
        urlName !== state.characterNameQuery
      ) {
        setState((prev) => ({
          ...prev,
          characterNameQuery: urlName,
          pagination: { ...prev.pagination, currentPage: urlPage },
        }));
      }
    } else {
      isMounted.current = true;
    }
  }, [
    params,
    searchQuery,
    state.characterNameQuery,
    state.pagination.currentPage,
  ]);

  const handlePrev = () => {
    const newPage = state.pagination.currentPage - 1;
    setParams((prev) => updateSearchParams(prev, { page: String(newPage) }));
    setState((prev) => ({
      ...prev,
      pagination: { ...prev.pagination, currentPage: newPage },
    }));
  };

  const handleNext = () => {
    const newPage = state.pagination.currentPage + 1;
    setParams((prev) => updateSearchParams(prev, { page: String(newPage) }));
    setState((prev) => ({
      ...prev,
      pagination: { ...prev.pagination, currentPage: newPage },
    }));
  };

  const handleSearch = (query: string) => {
    if (query === state.characterNameQuery && state.status !== 'error') {
      return;
    }
    setParams((prev) =>
      updateSearchParams(prev, {
        name: query || null,
        page: '1',
      })
    );

    setSearchQuery(query);
    setState((prev) => ({
      ...prev,
      characterNameQuery: query,
      pagination: { ...prev.pagination, currentPage: 1 },
    }));
  };

  const handleCharacterSelect = (characterId: number) => {
    const page = params.get('page');
    const name = params.get('name');
    const query = new URLSearchParams();
    if (name) query.set('name', name);
    if (page) query.set('page', page);
    const queryString = query.toString();
    navigate(
      `/characters/${characterId}${queryString ? `?${queryString}` : ''}`
    );
  };

  const handleSidebarClose = () => {
    const page = params.get('page') || '';
    const name = params.get('name') || '';
    const query = new URLSearchParams();
    if (name) query.set('name', name);
    if (page) query.set('page', page);
    const queryString = query.toString();
    navigate(`/characters${queryString ? `?${queryString}` : ''}`);
  };

  return (
    <Layout>
      <Main>
        <section className="mb-6 rounded-lg bg-white sm:mb-8 dark:bg-neutral-900">
          <div className="p-4 sm:p-5 lg:p-6">
            <Search onSubmit={handleSearch} query={state.characterNameQuery} />
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
            {state.status === 'success' && (
              <CharacterList
                data={state.data}
                onSelect={handleCharacterSelect}
              />
            )}
          </div>
          {state.status === 'success' && (
            <div className="mt-4 flex justify-center">
              <Pagination
                currentPage={state.pagination.currentPage}
                totalPages={state.pagination.totalPages}
                onPrev={handlePrev}
                onNext={handleNext}
              />
            </div>
          )}
        </section>
      </Main>
      <Outlet
        context={{ characterId: id, onClose: handleSidebarClose }}
      ></Outlet>
    </Layout>
  );
}
