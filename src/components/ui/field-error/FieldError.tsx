import type { JSX } from "react";

interface FieldErrorProps {
  message?: string;
}

export default function FieldError({
  message,
}: FieldErrorProps): JSX.Element | null {
  if (!message) return null;

  return <p className="text-sm text-red-500">{message}</p>;
}
