interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
}

const BTN_STYLES = {
  btn: "relative block rounded px-3 py-1.5 text-sm transition duration-300 cursor-pointer select-none",
  base: "text-surface bg-transparent hover:bg-neutral-100 focus:bg-neutral-100 focus:outline-none active:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:active:bg-neutral-700",
  disabled:
    "text-surface/50 pointer-events-none cursor-default dark:text-neutral-400",
  counter: "text-surface text-sm font-medium dark:text-white select-none",
};

function renderNavButton(
  label: string,
  disabled: boolean,
  onClick: () => void,
): React.JSX.Element {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`${BTN_STYLES.btn} ${BTN_STYLES.base} ${disabled ? BTN_STYLES.disabled : ""}`}
    >
      {label}
    </button>
  );
}

export function Pagination({
  currentPage,
  totalPages,
  onPrev,
  onNext,
}: PaginationProps): React.JSX.Element {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <nav aria-label="Pagination">
      <ul className="list-style-none flex items-center gap-4">
        <li>{renderNavButton("Prev", isFirstPage, onPrev)}</li>
        <li>
          <span className={BTN_STYLES.counter}>
            {currentPage}/{totalPages}
          </span>
        </li>
        <li>{renderNavButton("Next", isLastPage, onNext)}</li>
      </ul>
    </nav>
  );
}
