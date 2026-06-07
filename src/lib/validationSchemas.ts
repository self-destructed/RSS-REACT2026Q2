import * as yup from "yup";
import { ref } from "yup";
import { COUNTRIES } from "@shared/countries";

export interface FormValues {
  name: string;
  age: number;
  email: string;
  gender: string;
  terms: boolean;
  password: string;
  confirmPassword: string;
  country: string;
  image?: File | undefined;
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
    .transform((value: number, originalValue: string) =>
      originalValue === "" ? undefined : value,
    )
    .required("Age is required")
    .min(0, "Age cannot be negative"),
  email: yup
    .string()
    .transform((value: string, originalValue: string) =>
      originalValue === "" ? undefined : value,
    )
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
    .transform((value: string, originalValue: string) =>
      originalValue === "" ? undefined : value,
    )
    .required("Gender is required")
    .oneOf(["male", "female", "other"], "Gender must be male, female or other"),
  terms: yup.boolean().required().isTrue("You must accept the terms"),
  password: yup.string().required("Password is required"),
  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([ref("password")], "Passwords must match"),
  country: yup
    .string()
    .required("Country is required")
    .oneOf(COUNTRIES, "Please select a valid country"),
  image: yup
    .mixed<File>()
    .transform((value) => {
      // RHF stores FileList for <input type="file"> via register()
      // Extract the first file if present, otherwise return undefined
      if (value instanceof FileList) {
        return value.length > 0 ? value[0] : undefined;
      }
      return value instanceof File && value.size > 0 ? value : undefined;
    })
    .test("file-type", "Only PNG and JPEG files are allowed", (value) => {
      if (!value) return true;
      return ["image/png", "image/jpeg"].includes(value.type);
    })
    .test("file-size", "File must be less than 2MB", (value) => {
      if (!value) return true;
      return value.size <= 2 * 1024 * 1024;
    })
    .optional(),
});
