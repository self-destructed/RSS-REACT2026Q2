import type { JSX } from "react";

interface FieldErrorProps {
  message?: string;
}

export default function FieldError({ message }: FieldErrorProps): JSX.Element {
  return (
    <div className="min-h-5" aria-live="polite">
      {message && <p className="text-sm text-red-500">{message}</p>}
    </div>
  );
}
