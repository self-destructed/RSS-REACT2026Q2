import { Route, Routes } from 'react-router';
import { PATHS } from '../shared/constants/paths';
import CharactersPage from './pages/characters';
import ErrorPage from './pages/error';

export function AppRoutes() {
  return (
    <Routes>
      <Route path={PATHS.HOME} element={<CharactersPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}
