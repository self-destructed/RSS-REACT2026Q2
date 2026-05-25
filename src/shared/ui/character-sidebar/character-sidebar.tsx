interface Props {
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export function CharacterSidebar({
  onClose,
  title = "Details",
  children,
}: Props): React.JSX.Element {
  return (
    <div className="fixed top-0 right-0 z-50 h-full w-full max-w-md bg-white shadow-xl dark:bg-neutral-800">
      <div className="flex items-center justify-between border-b border-neutral-200 p-4 dark:border-neutral-700">
        <h2 className="text-xl font-semibold dark:text-white">{title}</h2>
        <button
          type="button"
          onClick={onClose}
          className="rounded p-2 text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-white"
          aria-label="Close"
        >
          ✕
        </button>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}
