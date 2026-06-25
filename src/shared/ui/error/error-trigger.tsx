"use client";

import { useState } from "react";
import type { JSX } from "react";

export function ErrorTrigger(): JSX.Element {
  const [shouldError, setShouldError] = useState(false);

  if (shouldError) {
    throw new Error("💣 Boom! Error triggered by user");
  }
  return (
    <button
      onClick={() => {
        setShouldError(true);
      }}
      className="rounded-md bg-red-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:cursor-pointer hover:bg-red-700"
    >
      💣 Trigger Error
    </button>
  );
}
