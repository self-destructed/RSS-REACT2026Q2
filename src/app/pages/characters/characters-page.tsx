import { Outlet, useNavigate, useParams, useSearchParams } from 'react-router';
import Search from '../../../shared/ui/search';
import useLocalStorage from '../../../shared/hooks/use-local-storage';
import { Spinner } from '../../../shared/ui/spinner';
import { ErrorDisplay } from '../../../shared/ui/error';
import { CharacterList } from '../../../features/characters/ui';
import { Pagination } from '../../../shared/ui/pagination';
import { updateSearchParams, buildQueryString } from '../../../shared/utils';
import { useCharacters } from '../../../features/characters/hooks';
import Main from '../../../shared/ui/main';
import Layout from '../../../shared/ui/layout';

const CHARACTER_QUERY_STORAGE_KEY = 'characterQuery';

export default function CharactersPage() {
  const [params, setParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useLocalStorage(
    CHARACTER_QUERY_STORAGE_KEY,
    ''
  );
  const navigate = useNavigate();
  const { id } = useParams();

  const name = params.get('name') || searchQuery;
  const page = Number(params.get('page')) || 1;

  const state = useCharacters({ name, page });

  const handlePrev = () => {
    const newPage = page - 1;
    setParams((prev) => updateSearchParams(prev, { page: String(newPage) }));
  };

  const handleNext = () => {
    const newPage = page + 1;
    setParams((prev) => updateSearchParams(prev, { page: String(newPage) }));
  };

  const handleSearch = (query: string) => {
    if (query === name && state.status !== 'error') {
      return;
    }
    setParams((prev) =>
      updateSearchParams(prev, {
        name: query || null,
        page: '1',
      })
    );

    setSearchQuery(query);
  };

  const handleCharacterSelect = (characterId: number) => {
    const query = buildQueryString({
      name: params.get('name') ?? undefined,
      page: Number(params.get('page')) || undefined,
    });
    navigate(`/characters/${characterId}${query ? `?${query}` : ''}`);
  };

  const handleSidebarClose = () => {
    const query = buildQueryString({
      name: params.get('name') ?? undefined,
      page: Number(params.get('page')) || undefined,
    });
    navigate(`/characters${query ? `?${query}` : ''}`);
  };

  return (
    <Layout>
      <Main>
        <section className="mb-6 rounded-lg bg-white sm:mb-8 dark:bg-neutral-900">
          <div className="p-4 sm:p-5 lg:p-6">
            <Search onSubmit={handleSearch} query={name} />
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
              <ErrorDisplay message={state.error?.message ?? 'Unknown error'} />
            )}
            {state.status === 'success' && (
              <CharacterList
                data={state.data?.results ?? []}
                onSelect={handleCharacterSelect}
              />
            )}
          </div>
          {state.status === 'success' && (
            <div className="mt-4 flex justify-center">
              <Pagination
                currentPage={page}
                totalPages={state.data?.info?.pages ?? 1}
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
