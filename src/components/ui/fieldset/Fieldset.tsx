import type { JSX } from "react";

interface FieldsetProps extends React.FieldsetHTMLAttributes<HTMLFieldSetElement> {
  title?: string;
  children: React.ReactNode;
}

export default function Fieldset({
  title,
  children,
  className,
  ...props
}: FieldsetProps): JSX.Element {
  return (
    <fieldset
      className={`border p-4 rounded ${className ?? ""}`.trim()}
      {...props}
    >
      {title && <legend>{title}</legend>}
      {children}
    </fieldset>
  );
}
