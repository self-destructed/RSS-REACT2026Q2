import type { JSX } from "react";
import { useRef, useState } from "react";
import { useCountries } from "../../store/countriesStore";
import Fieldset from "../ui/fieldset/Fieldset";
import Input from "../ui/input/Input";
import Select from "../ui/select/Select";
import Checkbox from "../ui/checkbox/Checkbox";
import { schema, type FormValues } from "../../lib/validationSchemas";
import * as yup from "yup";

interface UncontrolledFormProps {
  onSubmit?: (data: FormValues) => void;
}

type FieldErrors = Partial<Record<keyof FormValues, string>>;

export default function UncontrolledForm({
  onSubmit,
}: UncontrolledFormProps): JSX.Element {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [errors, setErrors] = useState<FieldErrors>({});
  const countries = useCountries();

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    if (!formRef.current) return;
    const formData = new FormData(formRef.current);
    const ageValue = formData.get("age");
    const rawData = {
      name: formData.get("name") as string,
      age: ageValue === "" ? undefined : ageValue,
      email: formData.get("email") as string,
      gender: formData.get("gender") as string,
      terms: formData.get("terms") === "on",
      password: formData.get("password") as string,
      confirmPassword: formData.get("confirmPassword") as string,
      country: formData.get("country") as string,
      image: formData.get("image"),
    };

    try {
      const data = schema.validateSync(rawData, { abortEarly: false });
      onSubmit?.(data);
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const fieldErrors: FieldErrors = {};

        err.inner.forEach((error) => {
          if (error.path) {
            fieldErrors[error.path as keyof FieldErrors] = error.message;
          }
        });

        setErrors(fieldErrors);
      }
    }
  };

  return (
    <form name="uncontrolled" noValidate ref={formRef} onSubmit={handleSubmit}>
      <Fieldset title="Personal Information" className="flex flex-col gap-4">
        <Input
          label="Name"
          id="name"
          name="name"
          type="text"
          error={errors.name}
        />
        <Input
          label="Age"
          id="age"
          name="age"
          type="number"
          error={errors.age}
        />
        <Input
          label="Email"
          id="email"
          name="email"
          type="email"
          error={errors.email}
        />
        <Select
          label="Gender"
          id="gender"
          name="gender"
          defaultValue=""
          options={[
            { value: "", label: "Select gender", disabled: true },
            { value: "male", label: "Male" },
            { value: "female", label: "Female" },
            { value: "other", label: "Other" },
          ]}
          error={errors.gender}
        />
        <Checkbox
          label="I agree to the Terms & Conditions"
          id="terms"
          name="terms"
          error={errors.terms}
        />
        <Input
          label="Password"
          id="password"
          name="password"
          type="password"
          error={errors.password}
        />
        <Input
          label="Confirm Password"
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          error={errors.confirmPassword}
        />
        <Input
          label="Country"
          id="country"
          name="country"
          type="text"
          list="countries"
          error={errors.country}
        />
        <Input
          label="Image"
          id="image"
          name="image"
          type="file"
          error={errors.image}
        />
        <button
          type="submit"
          className="w-full rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none"
        >
          Submit
        </button>
        <datalist id="countries">
          {countries.map((country) => (
            <option key={country} value={country} />
          ))}
        </datalist>
      </Fieldset>
    </form>
  );
}
