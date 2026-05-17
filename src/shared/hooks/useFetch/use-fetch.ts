import { useEffect, useState } from 'react';

type LoadingState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error };

export default function useFetch<T>(url: string | null) {
  const [state, setState] = useState<LoadingState<T>>({ status: 'idle' });

  useEffect(() => {
    if (!url) {
      (() => {
        setState({ status: 'idle' });
      })();
      return;
    }

    const abortController = new AbortController();
    let isMounted = true;

    const fetchData = async () => {
      setState({ status: 'loading' });
      let response: Response;
      try {
        response = await fetch(url, { signal: abortController.signal });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data: T = await response.json();
        if (isMounted) setState({ status: 'success', data });
      } catch (error) {
        if (
          isMounted &&
          !(error instanceof DOMException && error.name === 'AbortError')
        ) {
          setState({
            status: 'error',
            error: error instanceof Error ? error : new Error('Unknown'),
          });
        }
      }
    };

    fetchData();
    return () => {
      isMounted = false;
      abortController.abort();
    };
  }, [url]);

  return state;
}
