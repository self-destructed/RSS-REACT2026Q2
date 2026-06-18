import { useEffect, useRef } from "react";

function focusElement(el: HTMLElement): void {
  el.setAttribute("tabIndex", "-1");
  el.focus();
  setTimeout(() => {
    el.removeAttribute("tabIndex");
  }, 1000);
}

export function useFocusRestore(
  isEnabled: boolean,
): (elementId: string) => void {
  const focusRef = useRef<string | null>(null);

  useEffect(() => {
    if (!isEnabled) return;
    const id = focusRef.current;

    if (id === null) return;
    const el = document.getElementById(id);

    if (!el) return;

    focusElement(el);

    focusRef.current = null;
  }, [isEnabled]);

  return (elementId: string) => {
    focusRef.current = elementId;
  };
}
