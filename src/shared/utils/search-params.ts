type ParamUpdates = Record<string, string | null>;

export function updateSearchParams(
  current: URLSearchParams,
  updates: ParamUpdates
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
