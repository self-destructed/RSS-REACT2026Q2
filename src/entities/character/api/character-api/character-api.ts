import type { CharacterId } from "../../model";
import { API_BASE_URL } from "@shared/api";

export const CHARACTER_API = {
  list: `${API_BASE_URL}/character` as const,
  byId: (id: CharacterId) => `${API_BASE_URL}/character/${String(id)}`,
} as const;
