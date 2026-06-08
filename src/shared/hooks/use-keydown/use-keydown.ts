import { useEffect } from "react";

export function useKeydown(
  key: string,
  handler: () => void,
  isActive = true,
): void {
  useEffect(() => {
    if (!isActive) return;

    const onKeyDown = (e: KeyboardEvent): void => {
      if (e.key === key) {
        handler();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [key, handler, isActive]);
}
