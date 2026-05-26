export const ROUTES = {
  HOME: "/",
  CHARACTERS: "/characters",
  CHARACTERS_DETAILS: (id: string) => `/characters/details/${id}`,
  CHARACTERS_DETAILS_ROUTE: "details/:id",
  ABOUT: "/about",
  ERROR: "/error",
} as const;
