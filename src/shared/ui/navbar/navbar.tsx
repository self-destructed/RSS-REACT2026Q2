import { Link } from 'react-router';
import { PATHS } from '../../constants/paths';

export default function Navbar() {
  return (
    <nav
      className="shadow-dark-mild relative flex w-full flex-nowrap items-center justify-between bg-zinc-50 py-2 text-neutral-500 hover:text-neutral-700 focus:text-neutral-700 lg:flex-wrap lg:justify-start lg:py-4 dark:bg-neutral-700"
      data-twe-navbar-ref
    >
      <div className="flex w-full flex-wrap items-center justify-between px-3">
        <div className="mt-2 flex-grow basis-[100%] items-center md:!flex lg:mt-0 lg:basis-auto">
          <ul className="list-style-none me-auto flex flex-col ps-0 md:mt-1 md:flex-row">
            <li className="my-4 ps-2 md:my-0 md:mb-4 lg:my-0 lg:ps-2 lg:pe-1">
              <Link
                className="text-black lg:px-2 dark:text-white"
                aria-current="page"
                to={PATHS.HOME}
              >
                Home
              </Link>
            </li>
            <li className="mb-4 ps-2 lg:mb-0 lg:ps-0 lg:pe-1">
              <Link
                className="p-0 text-black/60 transition duration-200 hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80 motion-reduce:transition-none lg:px-2 dark:text-white/60 dark:hover:text-white/80 dark:focus:text-white/80 dark:active:text-white/80"
                to={PATHS.ABOUT}
              >
                About
              </Link>
            </li>
            <li className="mb-4 ps-2 lg:mb-0 lg:ps-0 lg:pe-1">
              <Link
                className="p-0 text-black/60 transition duration-200 hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80 motion-reduce:transition-none lg:px-2 dark:text-white/60 dark:hover:text-white/80 dark:focus:text-white/80 dark:active:text-white/80"
                to={PATHS.ERROR}
              >
                Error
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
