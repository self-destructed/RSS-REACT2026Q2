import { useEffect, useState } from "react";
import { http } from "@shared/api";

export type LoadingState<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; error: Error };

export function useFetch<T>(url: string | null): LoadingState<T> {
  const [state, setState] = useState<LoadingState<T>>({ status: "idle" });

  useEffect(() => {
    if (!url) return;

    const abortController = new AbortController();
    let isMounted = true;

    const fetchData = async () => {
      setState({ status: "loading" });
      try {
        const data = await http.get<T>(url, abortController.signal);
        if (isMounted) setState({ status: "success", data });
      } catch (error) {
        if (
          isMounted &&
          !(error instanceof DOMException && error.name === "AbortError")
        ) {
          setState({
            status: "error",
            error: error instanceof Error ? error : new Error("Unknown"),
          });
        }
      }
    };

    void fetchData();
    return () => {
      isMounted = false;
      abortController.abort();
    };
  }, [url]);

  return state;
}
