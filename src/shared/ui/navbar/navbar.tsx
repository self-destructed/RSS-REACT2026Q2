"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINK_STYLES = {
  base: "lg:px-2 text-black/60 transition duration-200 hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80 motion-reduce:transition-none dark:text-white/60 dark:hover:text-white/80 dark:focus:text-white/80 dark:active:text-white/80",
  active: "lg:px-2 font-semibold text-black dark:text-white",
};

interface NavItem {
  to: string;
  label: string;
}

const NAV_ITEMS: NavItem[] = [
  { to: "/", label: "Home" },
  { to: "/characters", label: "Characters" },
  { to: "/about", label: "About" },
];

export function Navbar(): React.JSX.Element {
  const pathname = usePathname();

  return (
    <nav>
      <ul className="list-style-none flex flex-col gap-y-4 md:flex-row md:gap-x-2 md:gap-y-0">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.to;

          return (
            <li key={item.to}>
              <Link
                href={item.to}
                className={
                  isActive ? NAV_LINK_STYLES.active : NAV_LINK_STYLES.base
                }
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
