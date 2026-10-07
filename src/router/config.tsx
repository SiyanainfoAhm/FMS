import type { RouteObject } from "react-router-dom";
import NotFound from "@/pages/NotFound";
import LoginPage from "@/pages/auth/login/page";
import ForgotPasswordPage from "@/pages/auth/forgot/page";
import AppShell from "@/components/feature/AppShell";
import HomePage from "@/pages/home/page";
import MapPage from "@/pages/map/page";
import TasksPage from "@/pages/tasks/page";
import TaskDetailPage from "@/pages/tasks/detail/page";
import TaskCompletePage from "@/pages/tasks/complete/page";
import MorePage from "@/pages/more/page";
import NotificationsPage from "@/pages/notifications/page";
import ChangePasswordPage from "@/pages/security/change-password/page";
import StartPatrolPage from "@/pages/patrol/start/page";
import ActivePatrolPage from "@/pages/patrol/active/page";
import AddObservationPage from "@/pages/patrol/observation/page";
import EndPatrolPage from "@/pages/patrol/end/page";
import PatrolHistoryPage from "@/pages/patrol/history/page";
import PatrolDetailPage from "@/pages/patrol/detail/page";
import JointPatrolListPage from "@/pages/joint-patrol/page";
import NewJointPatrolPage from "@/pages/joint-patrol/new/page";
import AssetsPage from "@/pages/assets/page";
import AssetDetailPage from "@/pages/assets/detail/page";
import AssetInspectPage from "@/pages/assets/inspect/page";
import AssetScanPage from "@/pages/assets/scan/page";
import IncidentsPage from "@/pages/incidents/page";
import HumanWildlifeIncidentPage from "@/pages/incidents/human-wildlife/page";
import ForestFireIncidentPage from "@/pages/incidents/forest-fire/page";
import MyEquipmentPage from "@/pages/equipment/page";
import EquipmentDetailPage from "@/pages/equipment/detail/page";
import EquipmentUpdatePage from "@/pages/equipment/update/page";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage />,
  },
  {
    element: <AppShell />,
    children: [
      {
        path: "/home",
        element: <HomePage />,
      },
      {
        path: "/map",
        element: <MapPage />,
      },
      {
        path: "/tasks",
        element: <TasksPage />,
      },
      {
        path: "/tasks/detail/:id",
        element: <TaskDetailPage />,
      },
      {
        path: "/tasks/complete/:id",
        element: <TaskCompletePage />,
      },
      {
        path: "/more",
        element: <MorePage />,
      },
      {
        path: "/notifications",
        element: <NotificationsPage />,
      },
      {
        path: "/change-password",
        element: <ChangePasswordPage />,
      },
      {
        path: "/patrol/start",
        element: <StartPatrolPage />,
      },
      {
        path: "/patrol/active",
        element: <ActivePatrolPage />,
      },
      {
        path: "/patrol/observation",
        element: <AddObservationPage />,
      },
      {
        path: "/patrol/end",
        element: <EndPatrolPage />,
      },
      {
        path: "/patrol/history",
        element: <PatrolHistoryPage />,
      },
      {
        path: "/patrol/detail/:id",
        element: <PatrolDetailPage />,
      },
      {
        path: "/joint-patrol",
        element: <JointPatrolListPage />,
      },
      {
        path: "/joint-patrol/new",
        element: <NewJointPatrolPage />,
      },
      {
        path: "/assets",
        element: <AssetsPage />,
      },
      {
        path: "/assets/detail/:id",
        element: <AssetDetailPage />,
      },
      {
        path: "/assets/inspect/:id",
        element: <AssetInspectPage />,
      },
      {
        path: "/assets/scan",
        element: <AssetScanPage />,
      },
      {
        path: "/incidents",
        element: <IncidentsPage />,
      },
      {
        path: "/incidents/human-wildlife",
        element: <HumanWildlifeIncidentPage />,
      },
      {
        path: "/incidents/forest-fire",
        element: <ForestFireIncidentPage />,
      },
      {
        path: "/equipment",
        element: <MyEquipmentPage />,
      },
      {
        path: "/equipment/detail/:id",
        element: <EquipmentDetailPage />,
      },
      {
        path: "/equipment/update/:id",
        element: <EquipmentUpdatePage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;