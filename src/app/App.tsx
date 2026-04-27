import React, { Component } from 'react';
import { Search } from '../features/search';
import './App.css';
import type { Character } from '../services/api-interfaces';
import { APIService } from '../services/api-service';
import { LocaltorageService } from '../services/local-storage-service';

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
    this.setState(
      { ...this.state, characterNameQuery: searchQuery.trim() },
      () => {
        this.loadCharacters();
      }
    );
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
      <>
        <Search onSubmit={this.setCharacterNameQuery} />
        {loading && <div>Loading...</div>}

        {error && <div style={{ color: 'red' }}>Error: {error}</div>}

        {this.state.characters.map((c) => {
          return (
            <li>
              {c.id} {c.name}
            </li>
          );
        })}
      </>
    );
  }
}

export default App;
