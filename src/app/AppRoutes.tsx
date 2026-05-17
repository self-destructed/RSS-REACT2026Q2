import { Navigate, Route, Routes } from 'react-router';
import { PATHS } from '../shared/constants/paths';
import CharactersPage from './pages/characters';
import AboutPage from './pages/about';
import ErrorPage from './pages/error';
import CharacterSidebar from '../features/characters/widgets';

export function AppRoutes() {
  return (
    <Routes>
      <Route index element={<Navigate to={PATHS.CHARACTERS} replace />} />
      <Route path={PATHS.CHARACTERS} element={<CharactersPage />}>
        <Route index element={null} />
        <Route path=":id" element={<CharacterSidebar />} />
      </Route>
      <Route path={PATHS.ABOUT} element={<AboutPage />} />
      <Route path={PATHS.ERROR} element={<ErrorPage />} />
      <Route path="*" element={<Navigate to={PATHS.ERROR} replace />} />
    </Routes>
  );
}
