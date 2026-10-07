import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "@/components/base/PageHeader";
import IconTile from "@/components/base/IconTile";
import type { Tone } from "@/components/base/toneStyles";
import { notifications as initialNotifications } from "@/mocks/notifications";

export default function NotificationsPage() {
  const navigate = useNavigate();
  const [items, setItems] = useState(initialNotifications);

  const unreadCount = items.filter((item) => item.unread).length;

  const markRead = (id: string) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, unread: false } : item)));
  };

  const markAllRead = () => {
    setItems((prev) => prev.map((item) => ({ ...item, unread: false })));
  };

  const openItem = (id: string, to?: string) => {
    markRead(id);
    if (to) navigate(to);
  };

  return (
    <div className="animate-fade-in pb-8">
      <PageHeader
        title="Notifications"
        onBack={() => navigate("/home")}
        actions={
          unreadCount > 0 ? (
            <button
              type="button"
              onClick={markAllRead}
              className="cursor-pointer whitespace-nowrap rounded-md px-2 py-1.5 text-[11px] font-semibold text-primary-700 hover:text-primary-800"
            >
              Mark all read
            </button>
          ) : null
        }
      />

      <div className="space-y-2.5 px-4 pt-4">
        {items.length === 0 ? (
          <div className="glass-panel rounded-lg px-6 py-10 text-center">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-primary-500/25 bg-primary-500/15 text-[26px] text-primary-800">
              <i className="ri-notification-off-line leading-none" />
            </span>
            <p className="mt-4 font-heading text-base font-semibold text-foreground-950">
              No notifications
            </p>
            <p className="mt-1.5 text-xs text-foreground-600">
              Task and incident updates will appear here.
            </p>
          </div>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className={`glass-panel overflow-hidden rounded-lg transition-colors ${
                item.unread ? "border-primary-500/30" : ""
              }`}
            >
              <button
                type="button"
                onClick={() => openItem(item.id, item.to)}
                className="flex w-full cursor-pointer items-start gap-3 p-3.5 text-left"
              >
                <IconTile icon={item.icon} tone={item.tone as Tone} size="sm" className="shrink-0 rounded-md" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-semibold text-foreground-950">{item.title}</p>
                    {item.unread ? (
                      <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary-600" />
                    ) : null}
                  </div>
                  <p className="mt-0.5 text-[11.5px] leading-relaxed text-foreground-600">
                    {item.detail}
                  </p>
                  <p className="mt-1 text-[10.5px] text-foreground-400">{item.time}</p>
                </div>
              </button>
              {item.unread ? (
                <div className="flex justify-end border-t border-foreground-500/10 px-3.5 py-1.5">
                  <button
                    type="button"
                    onClick={() => markRead(item.id)}
                    className="cursor-pointer text-[11px] font-semibold text-primary-700 hover:text-primary-800"
                  >
                    Mark as read
                  </button>
                </div>
              ) : null}
            </div>
          ))
        )}
      </div>
    </div>
  );
}