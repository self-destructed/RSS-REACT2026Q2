import React from 'react';

export default function ErrorTrigger() {
  const [shouldError, setShouldError] = React.useState(false);

  if (shouldError) {
    throw new Error('💣 Boom! Error triggered by user');
  }
  return (
    <button
      onClick={() => setShouldError(true)}
      className="rounded-md bg-red-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:cursor-pointer hover:bg-red-700"
    >
      💣 Trigger Error
    </button>
  );
}
