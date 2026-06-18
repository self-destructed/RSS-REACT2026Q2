import type { ReactNode } from "react";

interface MasterDetailLayoutProps {
  master: ReactNode;
  detail?: ReactNode;
}

export function MasterDetailLayout({
  master,
  detail,
}: MasterDetailLayoutProps): React.JSX.Element {
  return (
    <>
      {master}
      {detail}
    </>
  );
}
