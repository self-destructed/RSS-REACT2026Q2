import type { JSX } from "react";

interface FieldErrorProps {
  message?: string;
}

export default function FieldError({ message }: FieldErrorProps): JSX.Element {
  return (
    <p
      className={`text-sm text-red-500 ${!message ? "invisible" : ""}`}
      aria-live="polite"
    >
      {message ?? "\u00A0"}
    </p>
  );
}
