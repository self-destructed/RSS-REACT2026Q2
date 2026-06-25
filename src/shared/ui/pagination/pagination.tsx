import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  prevHref: string | null;
  nextHref: string | null;
}

const BTN_STYLES = {
  btn: "relative block rounded px-3 py-1.5 text-sm transition duration-300 cursor-pointer select-none",
  base: "text-surface bg-transparent hover:bg-neutral-100 focus:bg-neutral-100 focus:outline-none active:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:active:bg-neutral-700",
  disabled:
    "text-surface/50 pointer-events-none cursor-default dark:text-neutral-400",
  counter: "text-surface text-sm font-medium dark:text-white select-none",
  link: "no-underline",
};

function renderNavLink(label: string, href: string | null): React.JSX.Element {
  if (href === null) {
    return (
      <button
        type="button"
        disabled
        className={`${BTN_STYLES.btn} ${BTN_STYLES.disabled}`}
      >
        {label}
      </button>
    );
  }

  return (
    <Link
      href={href}
      className={`${BTN_STYLES.btn} ${BTN_STYLES.base} ${BTN_STYLES.link}`}
    >
      {label}
    </Link>
  );
}

export function Pagination({
  currentPage,
  totalPages,
  prevHref,
  nextHref,
}: PaginationProps): React.JSX.Element {
  return (
    <nav aria-label="Pagination">
      <ul className="list-style-none flex items-center gap-4">
        <li>{renderNavLink("Prev", prevHref)}</li>
        <li>
          <span className={BTN_STYLES.counter}>
            {currentPage}/{totalPages}
          </span>
        </li>
        <li>{renderNavLink("Next", nextHref)}</li>
      </ul>
    </nav>
  );
}
