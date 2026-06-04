import type { JSX } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
}

export default function Input({
  label,
  id,
  className,
  ...props
}: InputProps): JSX.Element {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1 block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <input
        id={id}
        className={`block w-full rounded border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-600 ${className ?? ""}`}
        {...props}
      />
    </div>
  );
}
