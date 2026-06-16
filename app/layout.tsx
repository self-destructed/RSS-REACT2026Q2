import type { JSX, ReactNode } from "react";
import "../src/app/styles/index.css";
import { Layout } from "@app/layout";
import { QueryProvider } from "@app/providers";

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  return (
    <html lang="en" data-theme="dark">
      <body>
        <QueryProvider>
          <Layout>{children}</Layout>
        </QueryProvider>
      </body>
    </html>
  );
}
