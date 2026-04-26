import { Component } from 'react';

const localStorageKey = 'searchHistory';

interface Props {
  onSubmit?: (searchTerm: string) => void;
}

interface State {
  searchTerm: string;
}

class Search extends Component<Props, State> {
  state: State = { searchTerm: '' };

  constructor(props: Props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  public handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: event.target.value.trim() });
  };

  public handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      window.localStorage.setItem(
        localStorageKey,
        JSON.stringify(this.state.searchTerm)
      );
    } catch {
      window.localStorage.setItem(localStorageKey, '');
    }

    this.props.onSubmit?.(this.state.searchTerm);
  };

  public componentDidMount(): void {
    this.restoreSearchTerm();
  }

  public render() {
    return (
      <form
        onSubmit={this.handleSubmit}
        className="mx-auto mt-4 max-w-xs"
        role="search"
      >
        <div className="relative flex items-center gap-2.5 rounded-md bg-white px-3 py-2.5 outline-1 -outline-offset-1 outline-slate-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-blue-600 dark:bg-neutral-800 dark:outline-neutral-700">
          <label htmlFor="search" className="sr-only">
            Search
          </label>
          <input
            type="search"
            id="search"
            onChange={this.handleInputChange}
            placeholder="Search..."
            required
            className="w-full pr-10 text-sm text-slate-900 outline-none dark:text-slate-50"
            value={this.state.searchTerm}
          />

          <button
            type="submit"
            aria-label="Search"
            className="absolute right-0 flex h-full cursor-pointer items-center justify-center rounded-r-md bg-blue-600 px-3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 192.904 192.904"
              className="size-4 fill-white"
              aria-hidden="true"
            >
              <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
            </svg>
          </button>
        </div>
      </form>
    );
  }

  private restoreSearchTerm() {
    let query = '';
    try {
      const restoredQuery = window.localStorage.getItem(localStorageKey);
      if (restoredQuery) {
        query = JSON.parse(restoredQuery);
      }
    } catch {
      query = '';
    }
    this.setState({ searchTerm: query });
  }
}

export default Search;
