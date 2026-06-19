import type { JSX } from "react";
import { Spinner } from "@shared/ui";

export default function CharactersLoading(): JSX.Element {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <Spinner />
    </div>
  );
}
