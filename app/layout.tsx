import type { JSX, ReactNode } from "react";
import "../src/app/styles/index.css";
import { Layout } from "@app/layout";

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  return (
    <html lang="en" data-theme="dark">
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
