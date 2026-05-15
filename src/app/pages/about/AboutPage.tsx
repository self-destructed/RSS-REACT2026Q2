import Layout from '../../../shared/ui/layout';
import Main from '../../../shared/ui/main';

export default function AboutPage() {
  const ATTEMPT_NUMBER = (() => Math.floor(Math.random() * 100) + 1)();

  return (
    <Layout>
      <Main>
        <article className="flex min-h-[60vh] flex-col items-center justify-center">
          <header className="mb-8 text-center">
            <h1 className="mb-2 text-4xl font-bold text-neutral-800 dark:text-white">
              About
            </h1>
            <p className="text-lg text-neutral-500 dark:text-neutral-400">
              RS React Course — 2026 Q2
            </p>
          </header>
          <section className="mb-8 text-center">
            <h2 className="sr-only">Fun facts</h2>
            <ul className="space-y-3">
              <li className="text-lg text-neutral-600 dark:text-neutral-400">
                I need to go touch some grass more often.
              </li>
              <li className="text-lg text-neutral-600 dark:text-neutral-400">
                If the code compiles on the first try, I get suspicious.
              </li>
              <li className="text-lg text-neutral-600 dark:text-neutral-400">
                I leave comments in code just in case I forget why it exists.
              </li>
              <li className="text-lg text-neutral-600 dark:text-neutral-400">
                This is attempt number {ATTEMPT_NUMBER} to pass this course.
              </li>
            </ul>
          </section>
          <footer className="flex flex-col gap-3">
            <a
              href="https://rs.school/courses/reactjs"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700"
            >
              RS School React
            </a>
          </footer>
        </article>
      </Main>
    </Layout>
  );
}
