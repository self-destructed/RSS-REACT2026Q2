"use server";

import { buildQueryString } from "@shared/lib/url-params";
import { redirect } from "next/navigation";

// eslint-disable-next-line @typescript-eslint/require-await -- Next.js server action requires async
export async function searchCharacters(formData: FormData): Promise<void> {
  const name = formData.get("name") ?? "";
  const qs = buildQueryString({ name, page: 1 });

  redirect(`/characters?${qs}`);
}
