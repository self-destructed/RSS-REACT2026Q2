import { ErrorBoundary, ErrorFallback, ErrorTrigger } from '../shared/ui/error';
import { BrowserRouter } from 'react-router';
import { AppRoutes } from './AppRoutes';

export default function App(): React.JSX.Element {
  return (
    <ErrorBoundary fallback={(reset) => <ErrorFallback reset={reset} />}>
      <BrowserRouter basename="/RSS-REACT2026Q2/">
        <AppRoutes />
      </BrowserRouter>
      <div className="fixed right-4 bottom-4 z-50">
        <ErrorTrigger />
      </div>
    </ErrorBoundary>
  );
}
