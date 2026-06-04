import type { JSX } from "react";
import FieldError from "../field-error/FieldError";

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  id: string;
  options: SelectOption[];
  error?: string;
}

export default function Select({
  label,
  id,
  options,
  className,
  error,
  ...props
}: SelectProps): JSX.Element {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1 block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <select
        id={id}
        className={`block w-full rounded border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-600 ${error ? "border-red-500" : ""} ${className ?? ""}`}
        {...props}
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </select>
      <FieldError message={error} />
    </div>
  );
}
