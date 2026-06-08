import { type JSX, useEffect, useRef } from "react";
import Portal from "../portal/Portal";
import { useFocusTrap } from "@shared/hooks/use-focus-trap";
import { useKeydown } from "@shared/hooks/use-keydown";
import { useBodyScroll } from "@shared/hooks/use-body-scroll";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({
  open,
  onClose,
  children,
}: ModalProps): JSX.Element | null {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => closeButtonRef.current?.focus());
    }
  }, [open]);

  useBodyScroll(open);
  useFocusTrap(containerRef, open);
  useKeydown("Escape", onClose, open);

  if (!open) return null;

  return (
    <Portal>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions -- overlay with close on backdrop click only */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
      >
        <div
          ref={containerRef}
          role="dialog"
          aria-modal="true"
          className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800 flex flex-col"
        >
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="self-end mb-2 flex size-8 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200"
          >
            ✕
          </button>
          {children}
        </div>
      </div>
    </Portal>
  );
}
