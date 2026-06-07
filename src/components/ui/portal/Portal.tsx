import { type JSX, useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
  children: React.ReactNode;
}

export default function Portal({ children }: PortalProps): JSX.Element {
  const [container] = useState(() => document.createElement("div"));

  useEffect(() => {
    const modalRoot = document.getElementById("modal-root");

    if (modalRoot) {
      modalRoot.appendChild(container);
    }

    return () => {
      if (modalRoot && container.parentNode === modalRoot) {
        modalRoot.removeChild(container);
      }
    };
  }, [container]);

  return createPortal(children, container);
}
