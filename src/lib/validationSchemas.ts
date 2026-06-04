import * as yup from "yup";

export interface FormValues {
  name: string;
  age: number;
  email: string;
  gender: string;
  terms: boolean;
}

export const schema: yup.ObjectSchema<FormValues> = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .test(
      "uppercase-start",
      "Name must start with an uppercase letter",
      (value) => value.at(0)?.toLocaleUpperCase() === value.at(0),
    ),
  age: yup
    .number()
    .required("Age is required")
    .min(0, "Age cannot be negative"),
  email: yup
    .string()
    .required("Email is required")
    .test("basic-email", "Invalid email format", (value) => {
      if (!value) return false;
      const parts = value.split("@");
      if (parts.length !== 2) return false;
      const [local, domain] = parts;
      return local.length > 0 && domain.includes(".");
    }),
  gender: yup
    .string()
    .required("Gender is required")
    .oneOf(["male", "female", "other"], "Gender must be male, female or other"),
  terms: yup
    .boolean()
    .required("You must accept the terms")
    .isTrue("You must accept the terms"),
});
