import { NavLink } from "react-router";
import { PATHS } from "@shared/routes";

const NAV_LINK_STYLES = {
  base: "lg:px-2 text-black/60 transition duration-200 hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80 motion-reduce:transition-none dark:text-white/60 dark:hover:text-white/80 dark:focus:text-white/80 dark:active:text-white/80",
  active: "lg:px-2 font-semibold text-black dark:text-white",
};

interface NavItem {
  to: string;
  label: string;
  end?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { to: PATHS.HOME, label: "Home", end: true },
  { to: PATHS.CHARACTERS, label: "Characters" },
  { to: PATHS.ABOUT, label: "About" },
  { to: PATHS.ERROR, label: "Error" },
];

export function Navbar(): React.JSX.Element {
  return (
    <nav>
      <ul className="list-style-none flex flex-col gap-y-4 md:flex-row md:gap-x-2 md:gap-y-0">
        {NAV_ITEMS.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                isActive ? NAV_LINK_STYLES.active : NAV_LINK_STYLES.base
              }
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
