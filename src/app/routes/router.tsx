import { Navigate, Outlet, Route, Routes } from "react-router";
import { ROUTES } from "@shared/routes";
import { Layout } from "../layout";
import { AboutPage } from "@pages/about";
import { CharacterDetailPage, CharactersPage } from "@pages/characters";
import { ErrorPage } from "@pages/error";

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
        <Route index element={<Navigate to={ROUTES.CHARACTERS} replace />} />
        <Route path={ROUTES.CHARACTERS} element={<CharactersPage />}>
          <Route index element={null} />
          <Route
            path={ROUTES.CHARACTERS_DETAILS_ROUTE}
            element={<CharacterDetailPage />}
          />
        </Route>
        <Route path={ROUTES.ABOUT} element={<AboutPage />} />
        <Route path={ROUTES.ERROR} element={<ErrorPage />} />
      </Route>
      <Route path="*" element={<Navigate to={ROUTES.ERROR} replace />} />
    </Routes>
  );
}
