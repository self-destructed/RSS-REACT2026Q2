import type { JSX, ReactNode } from "react";
import "./styles/index.css";
import { Providers } from "@app/providers";
import { Header } from "@widgets/header";

const themeScript = `
  (function() {
    try {
      var raw = localStorage.getItem("theme");
      var theme = raw ? JSON.parse(raw) : "dark";
      document.documentElement.dataset.theme = theme;
    } catch (_) {}
  })();
`;

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* https://nextjs.org/docs/app/guides/preventing-flash-before-hydration#themes */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <Providers>
          <div className="grid min-h-screen grid-rows-[min-content_1fr_auto] bg-slate-200 dark:bg-neutral-950">
            <Header />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
