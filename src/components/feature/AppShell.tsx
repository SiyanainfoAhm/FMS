import { Navigate, Outlet } from "react-router-dom";
import AppBackground from "@/components/feature/AppBackground";
import BottomNav from "@/components/feature/BottomNav";
import { useAppSession } from "@/context/AppSessionContext";

export default function AppShell() {
  const { isAuthenticated } = useAppSession();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <AppBackground>
      <main className="flex-1">
        <Outlet />
      </main>
      <BottomNav />
    </AppBackground>
  );
}