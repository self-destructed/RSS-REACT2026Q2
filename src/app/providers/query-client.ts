import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  // defaultOptions: {
  //   queries: {
  //     staleTime: Number(import.meta.env.VITE_CACHE_TTL) || 5 * 60 * 1000,
  //     retry: 1,
  //     refetchOnWindowFocus: false,
  //   },
  // },
});

declare global {
  interface Window {
    __TANSTACK_QUERY_CLIENT__: typeof queryClient;
  }
}

window.__TANSTACK_QUERY_CLIENT__ = queryClient;
