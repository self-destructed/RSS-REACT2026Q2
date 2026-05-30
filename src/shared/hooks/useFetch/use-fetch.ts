import { useEffect, useState } from "react";

type LoadingState<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; error: Error };

export default function useFetch<T>(url: string | null): LoadingState<T> {
  const [state, setState] = useState<LoadingState<T>>({ status: "idle" });

  useEffect(() => {
    if (!url) {
      (() => {
        setState({ status: "idle" });
      })();
      return;
    }

    const abortController = new AbortController();
    let isMounted = true;

    const fetchData = async () => {
      setState({ status: "loading" });
      let response: Response;
      try {
        response = await fetch(url, { signal: abortController.signal });
        if (!response.ok) throw new Error(`HTTP ${String(response.status)}`);
        const data = (await response.json()) as T;
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
