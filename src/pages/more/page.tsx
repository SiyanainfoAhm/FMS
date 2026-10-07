import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PageHeader from "@/components/base/PageHeader";
import IconTile from "@/components/base/IconTile";
import { useAppSession } from "@/context/AppSessionContext";
import type { Language } from "@/i18n/translations";

function AccountRow({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 px-3.5 py-3">
      <IconTile icon={icon} tone="secondary" size="sm" className="rounded-md" />
      <div className="min-w-0 flex-1">
        <p className="text-[11px] uppercase tracking-wide text-foreground-500">{label}</p>
        <p className="truncate text-[13px] font-medium text-foreground-900">{value}</p>
      </div>
    </div>
  );
}

export default function MorePage() {
  const navigate = useNavigate();
  const { user, language, setLanguage, t, logout } = useAppSession();
  const [confirmSignOut, setConfirmSignOut] = useState(false);

  if (!user) return null;

  const initials = user.name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");

  const languageOptions: { value: Language; label: string }[] = [
    { value: "en", label: "English" },
    { value: "od", label: "Odia" },
  ];

  return (
    <div className="animate-fade-in pb-8">
      <PageHeader title={t("profile.title")} />

      <div className="space-y-5 px-4 pt-5">
        <div className="glass-panel rounded-lg p-4">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-700 font-heading text-base font-bold text-background-50">
              {initials}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-base font-semibold text-foreground-950">{user.name}</p>
              <p className="text-[11px] text-foreground-600">{user.roleLabel}</p>
            </div>
          </div>
        </div>

        <div>
          <p className="mb-2 px-1 font-heading text-[13px] font-semibold uppercase tracking-[0.12em] text-foreground-600">
            {t("profile.user")}
          </p>
          <div className="divide-y divide-background-200 overflow-hidden glass-panel rounded-lg">
            <AccountRow icon="ri-user-line" label={t("profile.name")} value={user.name} />
            <AccountRow icon="ri-user-star-line" label={t("profile.role")} value={user.roleLabel} />
            <AccountRow icon="ri-id-card-line" label={t("profile.userId")} value={user.id} />
            <AccountRow icon="ri-map-2-line" label={t("profile.range")} value={user.range} />
            <AccountRow icon="ri-road-map-line" label={t("profile.section")} value={user.section} />
            <AccountRow icon="ri-map-pin-line" label={t("profile.beat")} value={user.beat} />
          </div>
        </div>

        <div>
          <p className="mb-2 px-1 font-heading text-[13px] font-semibold uppercase tracking-[0.12em] text-foreground-600">
            {t("profile.language")}
          </p>
          <div className="glass-panel rounded-lg p-3.5">
            <div className="flex rounded-full border border-background-300 bg-background-100 p-1">
              {languageOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setLanguage(option.value)}
                  className={`flex-1 cursor-pointer whitespace-nowrap rounded-full px-3 py-2 text-xs font-semibold transition-colors ${
                    language === option.value
                      ? "bg-primary-600 text-background-50"
                      : "text-foreground-600 hover:text-foreground-900"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
            <p className="mt-2 text-[10.5px] leading-relaxed text-foreground-500">
              {t("profile.languageNote")}
            </p>
          </div>
        </div>

        <div>
          <p className="mb-2 px-1 font-heading text-[13px] font-semibold uppercase tracking-[0.12em] text-foreground-600">
            {t("profile.security")}
          </p>
          <Link
            to="/change-password"
            className="flex w-full cursor-pointer items-center gap-3 glass-panel rounded-lg px-3.5 py-3.5 text-left transition-colors hover:bg-background-50/70"
          >
            <IconTile icon="ri-lock-password-line" tone="primary" size="sm" className="rounded-md" />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-foreground-900">
                {t("profile.changePassword")}
              </p>
              <p className="truncate text-[11px] text-foreground-500">
                {t("profile.changePasswordNote")}
              </p>
            </div>
            <i className="ri-arrow-right-s-line text-[18px] text-foreground-400" />
          </Link>
        </div>

        <div>
          <p className="mb-2 px-1 font-heading text-[13px] font-semibold uppercase tracking-[0.12em] text-foreground-600">
            {t("profile.accountActions")}
          </p>
          <button
            type="button"
            onClick={() => setConfirmSignOut(true)}
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-md border border-secondary-500/40 bg-secondary-100 py-3 text-sm font-semibold text-secondary-900 transition-colors hover:bg-secondary-200"
          >
            <i className="ri-logout-box-r-line text-[16px]" />
            {t("profile.signOut")}
          </button>
        </div>
      </div>

      {confirmSignOut ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
          <button
            type="button"
            aria-label="Cancel"
            onClick={() => setConfirmSignOut(false)}
            className="absolute inset-0 cursor-pointer bg-foreground-950/40 backdrop-blur-sm"
          />
          <div className="glass-strong animate-fade-in-up relative w-full max-w-app rounded-2xl border p-5">
            <p className="font-heading text-base font-semibold text-foreground-950">
              {t("profile.signOutConfirm")}
            </p>
            <p className="mt-1 text-xs text-foreground-600">
              You will return to the login screen.
            </p>
            <div className="mt-5 flex gap-2.5">
              <button
                type="button"
                onClick={() => setConfirmSignOut(false)}
                className="glass-input flex-1 cursor-pointer whitespace-nowrap rounded-md py-2.5 text-sm font-medium text-foreground-700 transition-colors hover:bg-background-50/70"
              >
                {t("common.cancel")}
              </button>
              <button
                type="button"
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                className="flex-1 cursor-pointer whitespace-nowrap rounded-md bg-secondary-700 py-2.5 text-sm font-semibold text-background-50 transition-colors hover:bg-secondary-800"
              >
                {t("profile.signOut")}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}