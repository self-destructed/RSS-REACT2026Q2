import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Number(process.env.NEXT_PUBLIC_CACHE_TTL ?? 5 * 60 * 1000),
    },
  },
});
