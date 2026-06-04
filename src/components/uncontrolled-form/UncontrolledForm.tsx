import type { JSX } from "react";
import Fieldset from "../ui/fieldset/Fieldset";
import Input from "../ui/input/Input";
import Select from "../ui/select/Select";
import Checkbox from "../ui/checkbox/Checkbox";

interface UncontrolledFormProps {
  onSubmit?: (event: React.SubmitEvent<HTMLFormElement>) => void;
}

export default function UncontrolledForm({
  onSubmit,
}: UncontrolledFormProps): JSX.Element {
  return (
    <form name="uncontrolled" noValidate onSubmit={onSubmit}>
      <Fieldset title="Personal Information" className="flex flex-col gap-4">
        <Input label="Name" id="name" type="text" />
        <Input label="Age" id="age" type="number" />
        <Input label="Email" id="email" type="email" />

        <Select
          label="Gender"
          id="gender"
          defaultValue=""
          options={[
            { value: "", label: "Select gender", disabled: true },
            { value: "male", label: "Male" },
            { value: "female", label: "Female" },
            { value: "other", label: "Other" },
          ]}
        />

        <Checkbox label="I agree to the Terms & Conditions" id="terms" />

        <button
          type="submit"
          className="w-full rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none"
        >
          Submit
        </button>
      </Fieldset>
    </form>
  );
}
