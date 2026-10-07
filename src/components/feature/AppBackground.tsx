import type { ReactNode } from "react";

interface AppBackgroundProps {
  children: ReactNode;
}

/**
 * Shared soft-glass backdrop. Rendered as a fixed layer behind the app column so
 * frosted panels have something to blur, while page scrolling stays native.
 */
export default function AppBackground({ children }: AppBackgroundProps) {
  return (
    <div className="flex min-h-screen w-full justify-center bg-background-200">
      <div className="pointer-events-none fixed inset-0 z-0 flex justify-center">
        <div className="app-canvas relative h-full w-full max-w-app overflow-hidden">
          <div className="absolute -left-20 -top-24 h-72 w-72 rounded-full bg-primary-400/35 blur-3xl" />
          <div className="absolute -right-16 top-32 h-64 w-64 rounded-full bg-accent-400/35 blur-3xl" />
          <div className="absolute bottom-24 -left-10 h-64 w-64 rounded-full bg-secondary-400/25 blur-3xl" />
          <div className="absolute -bottom-20 right-0 h-64 w-64 rounded-full bg-primary-300/30 blur-3xl" />
        </div>
      </div>
      <div className="relative z-10 flex w-full max-w-app flex-col">{children}</div>
    </div>
  );
}