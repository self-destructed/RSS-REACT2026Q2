import React, { Component } from 'react';
import Search from '../shared/ui/search';
import type { Character } from '../services/api-interfaces';
import { APIService } from '../services/api-service';
import { LocaltorageService } from '../services/local-storage-service';
import { Spinner } from '../shared/ui/spinner';
import { CharactersList } from '../features/characters/ui';
import Layout from '../shared/ui/layout';
import Main from '../shared/ui/main';

interface State {
  characterNameQuery: string;
  characters: Character[];
  loading: boolean;
  error: string | null;
  storageKey: string;
}

class App extends Component<object, State> {
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
    if (searchQuery.trim() === this.state.characterNameQuery) return;

    LocaltorageService.set(this.state.storageKey, searchQuery.trim());
    this.setState({ characterNameQuery: searchQuery.trim() }, () => {
      this.loadCharacters();
    });
  }

  public componentDidMount(): void {
    const lastQuery = LocaltorageService.get<string>(this.state.storageKey, '');
    if (lastQuery) {
      this.setState({ characterNameQuery: lastQuery }, () => {
        this.loadCharacters();
      });
    }

    this.loadCharacters();
  }

  public async loadCharacters(): Promise<void> {
    this.setState({ loading: true, error: null });
    try {
      let data;

      if (this.state.characterNameQuery) {
        data = await APIService.fetchCharacters({
          name: this.state.characterNameQuery,
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
              {error && (
                <div className="rounded-lg bg-red-50 p-4 text-center text-red-700 dark:bg-red-950/40 dark:text-red-300">
                  Error: {error}
                </div>
              )}
              <CharactersList data={this.state.characters} />
            </div>
          </section>
        </Main>
      </Layout>
    );
  }
}

export default App;
