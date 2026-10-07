import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "@/components/base/PageHeader";
import SectionHeading from "@/components/base/SectionHeading";
import InfoBanner from "@/components/feature/InfoBanner";
import HomeHeader from "@/pages/home/components/HomeHeader";
import TodayWork from "@/pages/home/components/TodayWork";
import QuickActions, { type QuickActionItem } from "@/pages/home/components/QuickActions";
import { useAppSession } from "@/context/AppSessionContext";
import {
  foresterQuickActions,
  foresterTodayWork,
  guardQuickActions,
  guardTodayWork,
} from "@/mocks/home";

interface QuickActionSource {
  id: string;
  icon: string;
  tone: string;
  to?: string;
  notice?: string;
}

export default function HomePage() {
  const { user, t } = useAppSession();
  const [toast, setToast] = useState<string | null>(null);
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 3200);
    return () => clearTimeout(timer);
  }, [toast]);

  const isGuard = user?.role === "guard";

  const quickActions = useMemo<QuickActionItem[]>(() => {
    const source = (isGuard ? guardQuickActions : foresterQuickActions) as QuickActionSource[];
    return source.map((action) => ({
      id: action.id,
      label: t(`action.${action.id}`),
      icon: action.icon,
      tone: action.tone,
      to: action.to,
    }));
  }, [isGuard, t]);

  if (!user) return null;

  const work = isGuard ? guardTodayWork : foresterTodayWork;

  const handleSync = () => {
    if (syncing) return;
    setSyncing(true);
    setToast(null);
    setTimeout(() => {
      setSyncing(false);
      setToast(t("common.syncDone"));
    }, 1200);
  };

  const handleQuickAction = (id: string) => {
    if (id === "sync") {
      handleSync();
      return;
    }
    const source = (isGuard ? guardQuickActions : foresterQuickActions) as QuickActionSource[];
    const match = source.find((action) => action.id === id);
    if (match?.notice) {
      setToast(match.notice);
    }
  };

  return (
    <div className="animate-fade-in pb-8">
      <PageHeader title={t("nav.home")} />

      {syncing ? (
        <div className="px-4 pt-4">
          <InfoBanner tone="accent" icon="ri-loader-4-line">
            {t("common.syncing")}
          </InfoBanner>
        </div>
      ) : toast ? (
        <div className="px-4 pt-4">
          <InfoBanner tone="primary" icon="ri-checkbox-circle-line">
            {toast}
          </InfoBanner>
        </div>
      ) : null}

      <HomeHeader />

      <div className="space-y-7 px-4 pt-6">
        <section>
          <SectionHeading
            title={t("home.todayWork")}
            action={
              <Link
                to="/tasks"
                className="cursor-pointer text-xs font-medium text-primary-700 hover:text-primary-800"
              >
                {t("home.viewTasks")}
              </Link>
            }
          />
          <TodayWork items={work} />
        </section>

        <section>
          <SectionHeading title={t("home.quickActions")} />
          <QuickActions actions={quickActions} onAction={handleQuickAction} />
        </section>
      </div>
    </div>
  );
}