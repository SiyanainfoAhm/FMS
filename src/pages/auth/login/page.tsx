import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "@/pages/auth/components/AuthLayout";
import { useAppSession, type AppRole } from "@/context/AppSessionContext";
import { demoAccounts, webOnlyUserIds } from "@/mocks/session";

const DEMO_PASSWORD = "field@123";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAppSession();

  const defaultAccount = demoAccounts[0];
  const [accountKey, setAccountKey] = useState(defaultAccount.key);
  const [userId, setUserId] = useState(defaultAccount.userId);
  const [password, setPassword] = useState(DEMO_PASSWORD);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showFieldError, setShowFieldError] = useState(false);

  const selectAccount = (key: string) => {
    const account = demoAccounts.find((item) => item.key === key);
    if (!account) return;
    setAccountKey(account.key);
    setUserId(account.userId);
    setPassword(DEMO_PASSWORD);
    setError(null);
    setShowFieldError(false);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setError(null);

    if (!userId.trim() || !password.trim()) {
      setShowFieldError(true);
      return;
    }
    setShowFieldError(false);

    if (webOnlyUserIds.includes(userId.trim().toUpperCase())) {
      setError("This account is configured for the Web Management Portal.");
      return;
    }

    const account = demoAccounts.find((item) => item.key === accountKey);
    if (!account) return;

    login(account.role as AppRole);
    navigate("/home");
  };

  return (
    <AuthLayout>
      <div className="animate-fade-in-up">
        <h2 className="font-heading text-xl font-semibold text-foreground-950">Sign in</h2>
        <p className="mt-1 text-sm text-foreground-600">
          Use your field credentials issued by the Division.
        </p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit} noValidate>
          <div>
            <label htmlFor="userId" className="mb-1.5 block text-xs font-semibold text-foreground-700">
              User ID / Username
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 flex h-5 w-5 -translate-y-1/2 items-center justify-center text-foreground-400">
                <i className="ri-user-line text-[17px]" />
              </span>
              <input
                id="userId"
                name="userId"
                type="text"
                autoComplete="username"
                value={userId}
                onChange={(event) => setUserId(event.target.value)}
                placeholder="Enter your User ID"
                className="glass-input w-full rounded-md py-2.5 pl-10 pr-3 text-sm text-foreground-900 outline-none transition-colors placeholder:text-foreground-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
              />
            </div>
          </div>

          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label htmlFor="password" className="block text-xs font-semibold text-foreground-700">
                Password
              </label>
              <Link
                to="/forgot-password"
                className="cursor-pointer text-xs font-medium text-primary-700 hover:text-primary-800"
              >
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 flex h-5 w-5 -translate-y-1/2 items-center justify-center text-foreground-400">
                <i className="ri-lock-line text-[17px]" />
              </span>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter your password"
                className="glass-input w-full rounded-md py-2.5 pl-10 pr-11 text-sm text-foreground-900 outline-none transition-colors placeholder:text-foreground-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-md text-foreground-500 hover:bg-background-100"
              >
                <i className={`${showPassword ? "ri-eye-off-line" : "ri-eye-line"} text-[17px]`} />
              </button>
            </div>
          </div>

          {showFieldError ? (
            <p className="flex items-center gap-1.5 text-xs font-medium text-secondary-700">
              <i className="ri-error-warning-line text-[15px]" />
              Please enter both User ID and Password.
            </p>
          ) : null}

          {error ? (
            <div className="glass-accent flex items-start gap-2.5 rounded-md p-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-500 text-background-50">
                <i className="ri-information-line text-[14px]" />
              </span>
              <p className="text-xs leading-relaxed text-accent-900">{error}</p>
            </div>
          ) : null}

          <button
            type="submit"
            className="w-full cursor-pointer whitespace-nowrap rounded-md bg-primary-600 py-3 font-label text-sm font-semibold text-background-50 transition-colors hover:bg-primary-700 active:bg-primary-800"
          >
            Login
          </button>
        </form>

        <div className="mt-7 border-t border-background-200 pt-5">
          <p className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-foreground-500">
            <i className="ri-test-tube-line text-[14px]" />
            Prototype account
          </p>
          <div className="grid grid-cols-2 gap-2">
            {demoAccounts.map((account) => {
              const isActive = account.key === accountKey;
              return (
                <button
                  key={account.key}
                  type="button"
                  onClick={() => selectAccount(account.key)}
                  className={`cursor-pointer whitespace-nowrap rounded-md border px-2 py-2 text-[11px] font-medium transition-colors ${
                    isActive
                      ? "border-primary-500 bg-primary-50 text-primary-800"
                      : "border-background-300 bg-background-50 text-foreground-600 hover:bg-background-100"
                  }`}
                >
                  {account.label}
                </button>
              );
            })}
          </div>
          <p className="mt-2 text-[11px] leading-relaxed text-foreground-500">
            Tap an account to fill its credentials, then press Login. FMS Mobile operational roles
            are Forest Guard and Forester only.
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}