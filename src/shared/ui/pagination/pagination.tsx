interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
}

const BTN_STYLES = {
  btn: 'relative block rounded px-3 py-1.5 text-sm transition duration-300 cursor-pointer select-none',
  base: 'text-surface bg-transparent hover:bg-neutral-100 focus:bg-neutral-100 focus:outline-none active:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:active:bg-neutral-700',
  disabled:
    'text-surface/50 pointer-events-none cursor-default dark:text-neutral-400',
  counter: 'text-surface text-sm font-medium dark:text-white select-none',
};

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
        <li>
          <button
            type="button"
            onClick={onPrev}
            disabled={isFirstPage}
            className={`${BTN_STYLES.btn} ${BTN_STYLES.base} ${isFirstPage ? BTN_STYLES.disabled : ''}`}
          >
            Prev
          </button>
        </li>
        <li>
          <span className={BTN_STYLES.counter}>
            {currentPage}/{totalPages}
          </span>
        </li>
        <li>
          <button
            type="button"
            onClick={onNext}
            disabled={isLastPage}
            className={`${BTN_STYLES.btn} ${BTN_STYLES.base} ${isLastPage ? BTN_STYLES.disabled : ''}`}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
}
