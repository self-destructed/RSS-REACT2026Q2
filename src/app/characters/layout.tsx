import type { ReactNode } from "react";
import { MasterDetailLayout } from "@shared/ui/master-detail-layout";

export default function CharactersLayout({
  children,
  details,
}: {
  children: ReactNode;
  details: ReactNode;
}): React.JSX.Element {
  return <MasterDetailLayout master={children} detail={details} />;
}
