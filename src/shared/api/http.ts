export class HttpError extends Error {
  status: number;

  constructor(status: number, message?: string) {
    super(message ?? `HTTP ${String(status)}`);
    this.name = "HttpError";
    this.status = status;
  }
}

export const http = {
  get: async <T>(url: string, signal?: AbortSignal): Promise<T> => {
    const response = await fetch(url, signal ? { signal } : undefined);

    if (!response.ok) {
      throw new HttpError(response.status);
    }

    return response.json() as Promise<T>;
  },
};
