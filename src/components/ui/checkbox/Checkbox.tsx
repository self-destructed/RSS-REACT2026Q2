import type { JSX } from "react";

interface CheckboxProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type"
> {
  label: string;
  id: string;
}

export default function Checkbox({
  label,
  id,
  className,
  ...props
}: CheckboxProps): JSX.Element {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        id={id}
        className={`h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600 ${className ?? ""}`}
        {...props}
      />
      <label htmlFor={id} className="ml-2 text-sm text-gray-700">
        {label}
      </label>
    </div>
  );
}
