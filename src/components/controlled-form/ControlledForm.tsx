import type { JSX, BaseSyntheticEvent } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema, type FormValues } from "@shared/lib/validation-schemas";
import { useCountries } from "@/store/countriesStore";
import { Fieldset, Input, Select, Checkbox } from "@/components/ui";

interface ControlledFormProps {
  onSubmit?: (data: FormValues) => void;
}

export default function ControlledForm({
  onSubmit,
}: ControlledFormProps): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitted },
  } = useForm<FormValues>({ mode: "onChange", resolver: yupResolver(schema) });

  const onValid = (data: FormValues) => {
    onSubmit?.(data);
  };

  const onSubmitForm = (e: BaseSyntheticEvent) => {
    void handleSubmit(onValid)(e);
  };

  const countries = useCountries();

  return (
    <form name="rhf" noValidate onSubmit={onSubmitForm}>
      <Fieldset title="Personal Information" className="flex flex-col gap-4">
        <Input
          label="Name"
          id="rhf-name"
          error={errors.name?.message}
          {...register("name")}
        />
        <Input
          label="Email"
          id="rhf-email"
          type="email"
          error={errors.email?.message}
          {...register("email")}
        />
        <Input
          label="Age"
          id="rhf-age"
          type="number"
          className="[-moz-appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          error={errors.age?.message}
          {...register("age")}
        />
        <Select
          label="Gender"
          id="rhf-gender"
          defaultValue=""
          options={[
            { value: "", label: "Select gender", disabled: true },
            { value: "male", label: "Male" },
            { value: "female", label: "Female" },
            { value: "other", label: "Other" },
          ]}
          error={errors.gender?.message}
          {...register("gender")}
        />
        <Input
          label="Country"
          id="rhf-country"
          type="text"
          list="countries"
          error={errors.country?.message}
          {...register("country")}
        />
        <Input
          label="Image"
          id="rhf-image"
          type="file"
          error={errors.image?.message}
          {...register("image")}
        />
        <Input
          label="Password"
          id="rhf-password"
          type="text"
          error={errors.password?.message}
          {...register("password")}
        />
        <Input
          label="Confirm Password"
          id="rhf-confirmPassword"
          type="text"
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />
        <Checkbox
          label="I agree to the Terms & Conditions"
          id="rhf-terms"
          error={errors.terms?.message}
          {...register("terms")}
        />
        <button
          type="submit"
          disabled={isSubmitted && !isValid}
          className="w-full rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
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
