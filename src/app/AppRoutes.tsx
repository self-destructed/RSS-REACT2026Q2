import { Navigate, Outlet, Route, Routes } from "react-router";
import { PATHS } from "@shared/constants";
import { CharactersPage } from "@app/pages/characters";
import { AboutPage } from "@app/pages/about";
import { ErrorPage } from "@app/pages/error";
import { CharacterSidebar } from "@features/characters";
import { Layout } from "@shared/ui";

function RootLayout(): React.JSX.Element {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}

export function AppRoutes(): React.JSX.Element {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<Navigate to={PATHS.CHARACTERS} replace />} />
        <Route path={PATHS.CHARACTERS} element={<CharactersPage />}>
          <Route index element={null} />
          <Route path=":id" element={<CharacterSidebar />} />
        </Route>
        <Route path={PATHS.ABOUT} element={<AboutPage />} />
        <Route path={PATHS.ERROR} element={<ErrorPage />} />
      </Route>
      <Route path="*" element={<Navigate to={PATHS.ERROR} replace />} />
    </Routes>
  );
}
