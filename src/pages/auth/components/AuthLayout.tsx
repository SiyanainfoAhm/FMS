import type { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen w-full justify-center bg-background-200">
      <div className="app-canvas relative flex min-h-screen w-full max-w-app flex-col overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-20 -top-16 h-64 w-64 rounded-full bg-primary-400/35 blur-3xl" />
          <div className="absolute -right-16 top-40 h-56 w-56 rounded-full bg-accent-400/35 blur-3xl" />
        </div>

        <div className="relative h-48 overflow-hidden">
          <img
            src="https://readdy.ai/api/search-image?query=stylized%20aerial%20top%20down%20view%20of%20dense%20green%20tropical%20forest%20canopy%20with%20a%20winding%20river%20and%20subtle%20mist%2C%20deep%20forest%20green%20and%20earthy%20tones%2C%20soft%20painterly%20texture%2C%20calm%20and%20abstract%20nature%20pattern%2C%20high%20contrast%20for%20white%20text%20overlay&width=960&height=560&seq=fms-auth-forest&orientation=landscape"
            alt="Aerial view of Redhakhol reserve forest canopy"
            title="Redhakhol Forest Division reserve forest"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary-950/50 via-primary-900/55 to-primary-900/90" />
          <div className="relative flex h-full flex-col justify-end px-5 pb-5">
            <span className="glass-accent inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 font-label text-[10px] font-semibold uppercase tracking-[0.14em] text-accent-950">
              <i className="ri-shield-check-line text-[12px]" />
              Odisha Forest Department
            </span>
            <h1 className="mt-3 font-heading text-2xl font-bold leading-none text-background-50">
              FMS Field
            </h1>
            <p className="mt-1 text-xs text-background-100/85">
              Redhakhol Forest Division · Field Mobile Application
            </p>
          </div>
        </div>

        <div className="relative flex-1 px-5 py-6">{children}</div>
      </div>
    </div>
  );
}