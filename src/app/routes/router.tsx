import { Navigate, Outlet, Route, Routes } from "react-router";
import { PATHS } from "@shared/constants";
import { Layout } from "../layout";
import {
  AboutPage,
  CharacterDetailPage,
  CharactersPage,
  ErrorPage,
} from "@pages";

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
          <Route path="details/:id" element={<CharacterDetailPage />} />
        </Route>
        <Route path={PATHS.ABOUT} element={<AboutPage />} />
        <Route path={PATHS.ERROR} element={<ErrorPage />} />
      </Route>
      <Route path="*" element={<Navigate to={PATHS.ERROR} replace />} />
    </Routes>
  );
}
