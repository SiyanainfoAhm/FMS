export interface NotificationRecord {
  id: string;
  title: string;
  detail: string;
  time: string;
  icon: string;
  tone: string;
  unread: boolean;
  to?: string;
}

export const notifications: NotificationRecord[] = [
  {
    id: "n-1",
    title: "New task assigned",
    detail: "Fire line clearance — Compartment 12",
    time: "Today · 09:10",
    icon: "ri-clipboard-line",
    tone: "primary",
    unread: true,
    to: "/tasks/detail/TSK-RKH-2041",
  },
  {
    id: "n-2",
    title: "Task due today",
    detail: "Boundary pillar repair verification",
    time: "Today · 07:00",
    icon: "ri-time-line",
    tone: "accent",
    unread: true,
    to: "/tasks/detail/TSK-RKH-2038",
  },
  {
    id: "n-3",
    title: "Task overdue",
    detail: "Water tank condition report",
    time: "Yesterday · 18:30",
    icon: "ri-alarm-warning-line",
    tone: "secondary",
    unread: false,
    to: "/tasks/detail/TSK-RKH-2025",
  },
  {
    id: "n-4",
    title: "Task reassigned to you",
    detail: "Elephant corridor watch — night beat",
    time: "Yesterday · 11:05",
    icon: "ri-user-received-line",
    tone: "primary",
    unread: false,
    to: "/tasks/detail/TSK-RKH-2010",
  },
];