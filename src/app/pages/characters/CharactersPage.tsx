import { Component } from 'react';
import Search from '../../../shared/ui/search';
import type { Character } from '../../../shared/api/types';
import { APIService } from '../../../shared/api/api';
import { LocaltorageService } from '../../../shared/api/local-storage';
import { Spinner } from '../../../shared/ui/spinner';
import { ErrorDisplay } from '../../../shared/ui/error';
import { CharactersList } from '../../../features/characters/ui';
import Main from '../../../shared/ui/main';
import Layout from '../../../shared/ui/layout';

interface State {
  characterNameQuery: string;
  characters: Character[];
  loading: boolean;
  error: string | null;
  storageKey: string;
}

class CharactersPage extends Component<object, State> {
  state: State = {
    characterNameQuery: '',
    characters: [],
    loading: false,
    error: null,
    storageKey: 'lastSearchQuery',
  };

  constructor(props: object) {
    super(props);
    this.setCharacterNameQuery = this.setCharacterNameQuery.bind(this);
  }

  public setCharacterNameQuery(searchQuery: string): void {
    const trimmed = searchQuery.trim();
    if (trimmed === this.state.characterNameQuery) return;

    LocaltorageService.set(this.state.storageKey, trimmed);
    this.setState({ characterNameQuery: trimmed }, () => {
      this.loadCharacters(trimmed);
    });
  }

  public componentDidMount(): void {
    const lastQuery = LocaltorageService.get<string>(this.state.storageKey, '');
    if (lastQuery) {
      this.setState({ characterNameQuery: lastQuery }, () => {
        this.loadCharacters(lastQuery);
      });
      return;
    }

    this.loadCharacters();
  }

  private async loadCharacters(query?: string): Promise<void> {
    const searchQuery = query ?? this.state.characterNameQuery;
    this.setState({ loading: true, error: null });
    try {
      let data;

      if (searchQuery) {
        data = await APIService.fetchCharacters({
          name: searchQuery,
        });
      } else {
        data = await APIService.fetchCharacters();
      }
      this.setState({ characters: data.results || [], loading: false });
    } catch (error) {
      this.setState({
        error: error instanceof Error ? error.message : 'Unknown error',
        loading: false,
        characters: [],
      });
    }
  }

  public render(): React.ReactNode {
    const { loading, error } = this.state;
    return (
      <Layout>
        <Main>
          <section className="mb-6 rounded-lg bg-white sm:mb-8 dark:bg-neutral-900">
            <div className="p-4 sm:p-5 lg:p-6">
              <Search
                onSubmit={this.setCharacterNameQuery}
                query={this.state.characterNameQuery}
              />
            </div>
          </section>
          <section className="rounded-lg bg-white/80 dark:bg-neutral-800/60">
            <div className="p-4 sm:p-5 lg:p-6">
              {loading && (
                <div className="flex justify-center py-6">
                  <Spinner />
                </div>
              )}
              {error && <ErrorDisplay message={error} />}
              <CharactersList data={this.state.characters} />
            </div>
          </section>
        </Main>
      </Layout>
    );
  }
}

export default CharactersPage;
