import { Navigate, Route, Routes } from 'react-router';
import { PATHS } from '../shared/constants/paths';
import CharactersPage from './pages/characters';
import AboutPage from './pages/about';
import ErrorPage from './pages/error';

export function AppRoutes() {
  return (
    <Routes>
      <Route index element={<Navigate to={PATHS.CHARACTERS} replace />} />
      <Route path={PATHS.CHARACTERS} element={<CharactersPage />} />
      <Route path={PATHS.ABOUT} element={<AboutPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}
