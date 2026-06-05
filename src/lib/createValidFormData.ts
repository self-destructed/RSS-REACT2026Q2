import type { FormValues } from "./validationSchemas";

export function createValidFormData(
  overrides?: Partial<FormValues>,
): FormValues {
  return {
    name: "Rick",
    age: 35,
    email: "rick@example.com",
    gender: "male",
    terms: true,
    password: "Test1@abc",
    confirmPassword: "Test1@abc",
    country: "Russia",
    image: undefined,
    ...overrides,
  };
}
