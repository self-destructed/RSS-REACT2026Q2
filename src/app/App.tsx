import { Component } from 'react';
import { Search } from '../features/search';
import './App.css';
import type { Info, Character } from './API_interfaces';

const API_URL = 'https://rickandmortyapi.com/api';

interface Props {
  onSubmit?: (searchTerm: string) => void;
}

interface State {
  searchTerm: string;
  characters: Character[];
}

class App extends Component<Props, State> {
  state: State = { searchTerm: '', characters: [] };

  constructor(props: Props) {
    super(props);
    this.setSearchTerm = this.setSearchTerm.bind(this);
  }

  public setSearchTerm(searchTerm: string) {
    if (searchTerm === this.state.searchTerm) return;
    this.setState({ ...this.state, searchTerm }, () => {
      console.log('update');
      this.searchCharacters();
    });
  }

  public componentDidMount(): void {
    this.fetchCharacters();
  }

  public async fetchCharacters() {
    const res = await fetch(`${API_URL}/character`);
    const data = (await res.json()) as Info<Character[]>;
    this.setState({ characters: data.results || [] });
  }

  public async searchCharacters() {
    const res = await fetch(
      `${API_URL}/character/?name=${this.state.searchTerm}`
    );
    const data = (await res.json()) as Info<Character[]>;
    this.setState({ characters: data.results || [] });
  }

  public render() {
    return (
      <>
        <Search onSubmit={this.setSearchTerm} />
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
