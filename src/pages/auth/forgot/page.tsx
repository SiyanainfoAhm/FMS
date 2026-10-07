import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "@/pages/auth/components/AuthLayout";

type Step = 1 | 2 | 3;

const steps = [
  { id: 1, label: "Identify" },
  { id: 2, label: "Verify" },
  { id: 3, label: "Reset" },
];

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>(1);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [done, setDone] = useState(false);

  const passwordMismatch = confirmPassword.length > 0 && password !== confirmPassword;
  const canReset = password.length >= 6 && password === confirmPassword;

  return (
    <AuthLayout>
      <div className="animate-fade-in-up">
        <Link
          to="/"
          className="mb-4 inline-flex cursor-pointer items-center gap-1.5 text-xs font-medium text-foreground-600 hover:text-foreground-900"
        >
          <i className="ri-arrow-left-line text-[15px]" />
          Back to Login
        </Link>

        <h2 className="font-heading text-xl font-semibold text-foreground-950">Reset Password</h2>
        <p className="mt-1 text-sm text-foreground-600">
          Verify your identity to set a new password.
        </p>

        <ol className="mt-5 flex items-center gap-2">
          {steps.map((item, index) => {
            const isActive = step === item.id;
            const isDone = step > item.id || done;
            return (
              <li key={item.id} className="flex flex-1 items-center gap-2">
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[12px] font-semibold ${
                    isDone
                      ? "bg-primary-600 text-background-50"
                      : isActive
                        ? "bg-primary-100 text-primary-800 ring-1 ring-primary-400"
                        : "bg-background-200 text-foreground-500"
                  }`}
                >
                  {isDone ? <i className="ri-check-line" /> : item.id}
                </span>
                <span
                  className={`text-[11px] font-medium ${
                    isActive ? "text-foreground-900" : "text-foreground-500"
                  }`}
                >
                  {item.label}
                </span>
                {index < steps.length - 1 ? (
                  <span className="h-px flex-1 bg-background-300" />
                ) : null}
              </li>
            );
          })}
        </ol>

        <div className="mt-6">
          {done ? (
            <div className="rounded-lg border border-primary-200 bg-primary-50 p-5 text-center">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary-600 text-[24px] text-background-50">
                <i className="ri-check-line" />
              </span>
              <p className="mt-3 font-heading text-base font-semibold text-foreground-950">
                Password reset successful
              </p>
              <p className="mt-1 text-xs text-foreground-600">
                You can now sign in with your new password.
              </p>
              <button
                type="button"
                onClick={() => navigate("/")}
                className="mt-5 w-full cursor-pointer whitespace-nowrap rounded-md bg-primary-600 py-3 font-label text-sm font-semibold text-background-50 transition-colors hover:bg-primary-700"
              >
                Back to Login
              </button>
            </div>
          ) : null}

          {!done && step === 1 ? (
            <div className="space-y-4">
              <div>
                <label htmlFor="identifier" className="mb-1.5 block text-xs font-semibold text-foreground-700">
                  User ID / Mobile / Username
                </label>
                <div className="relative">
                  <span className="pointer-events-none absolute left-3 top-1/2 flex h-5 w-5 -translate-y-1/2 items-center justify-center text-foreground-400">
                    <i className="ri-fingerprint-line text-[17px]" />
                  </span>
                  <input
                    id="identifier"
                    name="identifier"
                    type="text"
                    value={identifier}
                    onChange={(event) => setIdentifier(event.target.value)}
                    placeholder="Enter your registered identifier"
                    className="w-full rounded-md glass-input py-2.5 pl-10 pr-3 text-sm text-foreground-900 outline-none transition-colors placeholder:text-foreground-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
                  />
                </div>
                <p className="mt-2 text-[11px] leading-relaxed text-foreground-500">
                  Verification uses the identity method configured by the Department. No SMS or
                  email OTP is invented.
                </p>
              </div>
              <button
                type="button"
                disabled={!identifier.trim()}
                onClick={() => setStep(2)}
                className="w-full cursor-pointer whitespace-nowrap rounded-md bg-primary-600 py-3 font-label text-sm font-semibold text-background-50 transition-colors hover:bg-primary-700 disabled:cursor-not-allowed disabled:bg-background-300 disabled:text-foreground-500"
              >
                Verify Identity
              </button>
            </div>
          ) : null}

          {!done && step === 2 ? (
            <div className="space-y-4">
              <div className="flex items-start gap-3 rounded-lg border border-primary-200 bg-primary-50 p-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-600 text-[18px] text-background-50">
                  <i className="ri-shield-check-line" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground-950">Identity verified</p>
                  <p className="mt-0.5 text-xs text-foreground-600">
                    {identifier || "Your identifier"} has been confirmed by the Department
                    identity service.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="w-full cursor-pointer whitespace-nowrap rounded-md bg-primary-600 py-3 font-label text-sm font-semibold text-background-50 transition-colors hover:bg-primary-700"
              >
                Continue
              </button>
            </div>
          ) : null}

          {!done && step === 3 ? (
            <div className="space-y-4">
              <div>
                <label htmlFor="newPassword" className="mb-1.5 block text-xs font-semibold text-foreground-700">
                  New Password
                </label>
                <input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full rounded-md glass-input px-3 py-2.5 text-sm text-foreground-900 outline-none transition-colors placeholder:text-foreground-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="mb-1.5 block text-xs font-semibold text-foreground-700">
                  Confirm New Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  placeholder="Re-enter new password"
                  className="w-full rounded-md glass-input px-3 py-2.5 text-sm text-foreground-900 outline-none transition-colors placeholder:text-foreground-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
                />
                {passwordMismatch ? (
                  <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-secondary-700">
                    <i className="ri-error-warning-line text-[15px]" />
                    Passwords do not match.
                  </p>
                ) : null}
              </div>
              <button
                type="button"
                disabled={!canReset}
                onClick={() => setDone(true)}
                className="w-full cursor-pointer whitespace-nowrap rounded-md bg-primary-600 py-3 font-label text-sm font-semibold text-background-50 transition-colors hover:bg-primary-700 disabled:cursor-not-allowed disabled:bg-background-300 disabled:text-foreground-500"
              >
                Reset Password
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </AuthLayout>
  );
}