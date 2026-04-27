import { Component } from 'react';
import { Search } from '../features/search';
import './App.css';
import type { Character } from '../services/api-interfaces';
import { APIService } from '../services/api-service';

interface State {
  characterName: string;
  characters: Character[];
  loading: boolean;
  error: string | null;
}

class App extends Component<object, State> {
  state: State = {
    characterName: '',
    characters: [],
    loading: false,
    error: null,
  };

  constructor(props: object) {
    super(props);
    this.setCharacterName = this.setCharacterName.bind(this);
  }

  public setCharacterName(searchTerm: string) {
    if (searchTerm === this.state.characterName) return;
    this.setState({ ...this.state, characterName: searchTerm.trim() }, () => {
      console.log('update');
      this.loadCharacters();
    });
  }

  public componentDidMount(): void {
    this.loadCharacters();
  }

  public async loadCharacters() {
    this.setState({ loading: true, error: null });
    try {
      let data;
      if (this.state.characterName) {
        data = await APIService.fetchCharacters({
          name: this.state.characterName,
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

  public render() {
    const { loading, error } = this.state;
    return (
      <>
        <Search onSubmit={this.setCharacterName} />
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
