import { Component, type ReactNode } from 'react';
import { ErrorBoundary, ErrorFallback, ErrorTrigger } from '../shared/ui/error';
import CharactersPage from './pages/characters';

class App extends Component {
  render(): ReactNode {
    return (
      <ErrorBoundary fallback={(reset) => <ErrorFallback reset={reset} />}>
        <CharactersPage />
        <div className="fixed right-4 bottom-4 z-50">
          <ErrorTrigger />
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;
