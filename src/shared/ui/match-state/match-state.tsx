import type { ReactNode } from "react";
import type { LoadingState } from "@shared/lib";

interface Props<T> {
  state: LoadingState<T>;
  loading: ReactNode;
  error: (error: Error) => ReactNode;
  children: (data: T) => ReactNode;
}

export function MatchState<T>({
  state,
  loading,
  error,
  children,
}: Props<T>): React.JSX.Element {
  switch (state.status) {
    case "loading":
      return <>{loading}</>;
    case "error":
      return <>{error(state.error)}</>;
    case "success":
      return <>{children(state.data)}</>;
    case "idle":
      return null;
  }
}
