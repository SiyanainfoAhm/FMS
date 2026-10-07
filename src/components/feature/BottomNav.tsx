import { NavLink } from "react-router-dom";
import { useAppSession } from "@/context/AppSessionContext";

const items = [
  { to: "/home", labelKey: "nav.home", icon: "ri-home-5-line", activeIcon: "ri-home-5-fill" },
  { to: "/map", labelKey: "nav.map", icon: "ri-map-2-line", activeIcon: "ri-map-2-fill" },
  { to: "/tasks", labelKey: "nav.tasks", icon: "ri-clipboard-line", activeIcon: "ri-clipboard-fill" },
  { to: "/more", labelKey: "nav.more", icon: "ri-apps-2-line", activeIcon: "ri-apps-2-fill" },
];

export default function BottomNav() {
  const { t } = useAppSession();

  return (
    <nav className="glass-bar sticky bottom-0 z-30 border-t">
      <ul className="grid grid-cols-4">
        {items.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                `flex cursor-pointer flex-col items-center justify-center gap-1 py-2.5 transition-colors ${
                  isActive ? "text-primary-800" : "text-foreground-500"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`flex h-7 w-7 items-center justify-center rounded-lg text-[21px] ${
                      isActive ? "bg-primary-500/20" : ""
                    }`}
                  >
                    <i className={`${isActive ? item.activeIcon : item.icon} leading-none`} />
                  </span>
                  <span className="font-label text-[11px] font-medium tracking-wide">
                    {t(item.labelKey)}
                  </span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}