import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSession } from "@/context/AppSessionContext";

interface PageHeaderProps {
  title: string;
  onBack?: () => void;
  actions?: ReactNode;
}

export default function PageHeader({ title, onBack, actions }: PageHeaderProps) {
  const navigate = useNavigate();
  const { user, language, setLanguage } = useAppSession();

  const initials = user
    ? user.name
        .split(" ")
        .map((part) => part[0])
        .slice(0, 2)
        .join("")
    : "";

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "od" : "en");
  };

  return (
    <header className="glass-bar sticky top-0 z-30 border-b px-4 py-3">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          {onBack ? (
            <button
              type="button"
              aria-label="Back"
              onClick={onBack}
              className="glass-input flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-md text-foreground-700 transition-colors hover:bg-background-50/70"
            >
              <i className="ri-arrow-left-line text-[18px]" />
            </button>
          ) : null}
          <h1 className="truncate font-heading text-lg font-semibold leading-tight text-foreground-950">
            {title}
          </h1>
        </div>

        <div className="flex shrink-0 items-center gap-1.5">
          {actions}
          <button
            type="button"
            onClick={toggleLanguage}
            aria-label="Switch language (English / Odia)"
            title={language === "en" ? "Switch to Odia" : "Switch to English"}
            className="glass-input flex h-9 cursor-pointer items-center justify-center gap-1 rounded-md px-2.5 font-label text-[11px] font-semibold text-foreground-700 transition-colors hover:bg-background-50/70"
          >
            <i className="ri-translate-2 text-[15px]" />
            {language === "en" ? "EN" : "ଓଡ଼"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/notifications")}
            aria-label="Notifications"
            className="glass-input relative flex h-9 w-9 cursor-pointer items-center justify-center rounded-md text-foreground-700 transition-colors hover:bg-background-50/70"
          >
            <i className="ri-notification-3-line text-[18px]" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-secondary-600" />
          </button>
          <button
            type="button"
            onClick={() => navigate("/more")}
            aria-label="Profile"
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-primary-700 font-heading text-[12px] font-bold text-background-50"
          >
            {initials}
          </button>
        </div>
      </div>
    </header>
  );
}