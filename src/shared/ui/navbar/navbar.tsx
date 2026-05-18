import { NavLink } from "react-router";
import { PATHS } from "../../constants/paths";

const NAV_LINK_STYLES = {
  base: "lg:px-2 text-black/60 transition duration-200 hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80 motion-reduce:transition-none dark:text-white/60 dark:hover:text-white/80 dark:focus:text-white/80 dark:active:text-white/80",
  active: "lg:px-2 font-semibold text-black dark:text-white",
};

export default function Navbar(): React.JSX.Element {
  return (
    <nav className="shadow-dark-mild relative flex w-full flex-nowrap items-center justify-between bg-zinc-50 py-2 text-neutral-500 hover:text-neutral-700 focus:text-neutral-700 lg:flex-wrap lg:justify-start lg:py-4 dark:bg-neutral-700">
      <div className="flex w-full flex-wrap items-center justify-between px-3">
        <div className="mt-2 flex-grow basis-[100%] items-center md:!flex lg:mt-0 lg:basis-auto">
          <ul className="list-style-none me-auto flex flex-col ps-0 md:mt-1 md:flex-row">
            <li className="my-4 ps-2 md:my-0 md:mb-4 lg:my-0 lg:ps-2 lg:pe-1">
              <NavLink
                to={PATHS.HOME}
                end
                className={({ isActive }) =>
                  isActive ? NAV_LINK_STYLES.active : NAV_LINK_STYLES.base
                }
              >
                Home
              </NavLink>
            </li>
            <li className="mb-4 ps-2 lg:mb-0 lg:ps-0 lg:pe-1">
              <NavLink
                to={PATHS.CHARACTERS}
                className={({ isActive }) =>
                  isActive ? NAV_LINK_STYLES.active : NAV_LINK_STYLES.base
                }
              >
                Characters
              </NavLink>
            </li>
            <li className="mb-4 ps-2 lg:mb-0 lg:ps-0 lg:pe-1">
              <NavLink
                to={PATHS.ABOUT}
                className={({ isActive }) =>
                  isActive ? NAV_LINK_STYLES.active : NAV_LINK_STYLES.base
                }
              >
                About
              </NavLink>
            </li>
            <li className="mb-4 ps-2 lg:mb-0 lg:ps-0 lg:pe-1">
              <NavLink
                to={PATHS.ERROR}
                className={({ isActive }) =>
                  isActive ? NAV_LINK_STYLES.active : NAV_LINK_STYLES.base
                }
              >
                Error
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
