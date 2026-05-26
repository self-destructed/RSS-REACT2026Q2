type ParamUpdates = Record<string, string | null>;

export function buildQueryString(params: object | undefined | null): string {
  if (!params) return "";

  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.set(key, String(value));
    }
  }

  return searchParams.toString();
}

export function updateSearchParams(
  current: URLSearchParams,
  updates: ParamUpdates,
): URLSearchParams {
  const next = new URLSearchParams(current);
  Object.entries(updates).forEach(([key, value]) => {
    if (value !== null) {
      next.set(key, value);
    } else {
      next.delete(key);
    }
  });
  return next;
}
