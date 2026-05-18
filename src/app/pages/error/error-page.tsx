import { Link } from "react-router";
import { PATHS } from "../../../shared/constants/paths";
import Layout from "../../../shared/ui/layout";
import Main from "../../../shared/ui/main";

export default function ErrorPage(): React.JSX.Element {
  return (
    <Layout>
      <Main>
        <div className="flex min-h-[60vh] flex-col items-center justify-center">
          <h1 className="mb-4 text-6xl font-bold text-red-600">
            Page not found.
          </h1>
          <p className="mb-8 text-xl text-gray-600 dark:text-gray-400">Oops!</p>
          <Link
            to={PATHS.HOME}
            className="rounded-md bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700"
          >
            Go to Home
          </Link>
        </div>
      </Main>
    </Layout>
  );
}
