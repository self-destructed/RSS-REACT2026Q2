import { Navigate, Outlet, Route, Routes } from "react-router";
import { PATHS } from "@shared/routes";
import { Layout } from "../layout";
import { AboutPage } from "@pages/about/about-page";
import { CharacterDetailPage } from "@pages/characters/character-detail";
import { CharactersPage } from "@pages/characters/characters-page";
import { ErrorPage } from "@pages/error/error-page";

export function Router(): React.JSX.Element {
  return (
    <Routes>
      <Route
        element={
          <Layout>
            <Outlet />
          </Layout>
        }
      >
        <Route index element={<Navigate to={PATHS.CHARACTERS} replace />} />
        <Route path={PATHS.CHARACTERS} element={<CharactersPage />}>
          <Route index element={null} />
          <Route
            path={PATHS.CHARACTERS_DETAILS_ROUTE}
            element={<CharacterDetailPage />}
          />
        </Route>
        <Route path={PATHS.ABOUT} element={<AboutPage />} />
        <Route path={PATHS.ERROR} element={<ErrorPage />} />
      </Route>
      <Route path="*" element={<Navigate to={PATHS.ERROR} replace />} />
    </Routes>
  );
}
