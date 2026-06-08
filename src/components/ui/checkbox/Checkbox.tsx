import type { JSX } from "react";
import FieldError from "../field-error/FieldError";

interface CheckboxProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type"
> {
  label: string;
  id: string;
  error?: string;
}

export default function Checkbox({
  label,
  id,
  className,
  error,
  ...props
}: CheckboxProps): JSX.Element {
  return (
    <div>
      <div className="flex items-center">
        <input
          type="checkbox"
          id={id}
          className={`h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600 ${error ? "border-red-500" : ""} ${className ?? ""}`}
          {...props}
        />
        <label htmlFor={id} className="ml-2 text-sm text-gray-200">
          {label}
        </label>
      </div>
      <FieldError message={error} />
    </div>
  );
}
