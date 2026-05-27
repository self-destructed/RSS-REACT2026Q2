import type { ReactNode } from "react";
import type { UseQueryResult } from "@tanstack/react-query";

interface Props<T> {
  query: UseQueryResult<T>;
  loading?: ReactNode;
  error?: (error: Error) => ReactNode;
  children: (data: T) => ReactNode;
}

export function QueryMatch<T>({
  query,
  loading,
  error,
  children,
}: Props<T>): React.ReactNode {
  if (query.status === "pending") return loading ?? null;
  if (query.status === "error") return error?.(query.error) ?? null;
  return children(query.data);
}
