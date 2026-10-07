import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "@/components/base/PageHeader";
import FormField from "@/components/base/FormField";
import TextInput from "@/components/base/TextInput";
import FormActions from "@/components/feature/FormActions";
import { useAppSession } from "@/context/AppSessionContext";

const MIN_LENGTH = 8;

function policyError(password: string): string | null {
  if (password.length < MIN_LENGTH) return `New Password must be at least ${MIN_LENGTH} characters.`;
  if (!/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) {
    return "New Password must include both letters and numbers.";
  }
  return null;
}

export default function ChangePasswordPage() {
  const navigate = useNavigate();
  const { t } = useAppSession();

  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  const handleSubmit = () => {
    const nextErrors: Record<string, string> = {};
    if (!current.trim()) nextErrors.current = "Current Password is required.";
    if (!next.trim()) {
      nextErrors.next = "New Password is required.";
    } else {
      const policy = policyError(next);
      if (policy) nextErrors.next = policy;
    }
    if (!confirm.trim()) {
      nextErrors.confirm = "Confirm New Password is required.";
    } else if (next && confirm !== next) {
      nextErrors.confirm = "New Password and Confirm New Password must match.";
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    setDone(true);
  };

  if (done) {
    return (
      <div className="animate-fade-in pb-8">
        <PageHeader title={t("profile.changePassword")} onBack={() => navigate("/more")} />
        <div className="px-4 pt-6">
          <div className="glass-panel rounded-lg p-6 text-center">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary-600 text-[26px] text-background-50">
              <i className="ri-shield-check-line leading-none" />
            </span>
            <p className="mt-4 font-heading text-base font-semibold text-foreground-950">
              Password changed successfully.
            </p>
            <p className="mt-1.5 text-xs leading-relaxed text-foreground-600">
              Your field account password has been updated.
            </p>
            <button
              type="button"
              onClick={() => navigate("/more")}
              className="mt-5 w-full cursor-pointer whitespace-nowrap rounded-md bg-primary-600 py-3 font-label text-sm font-semibold text-background-50 transition-colors hover:bg-primary-700"
            >
              Back to Profile
            </button>
          </div>
        </div>
      </div>
    );
  }

  const inputType = show ? "text" : "password";

  return (
    <div className="animate-fade-in pb-8">
      <PageHeader title={t("profile.changePassword")} onBack={() => navigate("/more")} />

      <div className="space-y-4 px-4 pt-4">
        <div className="glass-panel rounded-lg p-4">
          <div className="mb-3 flex items-center justify-between">
            <p className="font-heading text-[13px] font-semibold uppercase tracking-[0.12em] text-foreground-600">
              Security
            </p>
            <button
              type="button"
              onClick={() => setShow((prev) => !prev)}
              className="flex cursor-pointer items-center gap-1 whitespace-nowrap text-[11px] font-semibold text-primary-700 hover:text-primary-800"
            >
              <i className={`${show ? "ri-eye-off-line" : "ri-eye-line"} text-[14px]`} />
              {show ? "Hide" : "Show"}
            </button>
          </div>

          <div className="space-y-4">
            <FormField label="Current Password" htmlFor="currentPassword" required error={errors.current}>
              <TextInput
                id="currentPassword"
                name="currentPassword"
                type={inputType}
                icon="ri-lock-line"
                autoComplete="current-password"
                value={current}
                onChange={(event) => setCurrent(event.target.value)}
                invalid={Boolean(errors.current)}
                placeholder="Enter current password"
              />
            </FormField>

            <FormField
              label="New Password"
              htmlFor="newPassword"
              required
              error={errors.next}
              help="At least 8 characters, including letters and numbers."
            >
              <TextInput
                id="newPassword"
                name="newPassword"
                type={inputType}
                icon="ri-lock-password-line"
                autoComplete="new-password"
                value={next}
                onChange={(event) => setNext(event.target.value)}
                invalid={Boolean(errors.next)}
                placeholder="Enter new password"
              />
            </FormField>

            <FormField
              label="Confirm New Password"
              htmlFor="confirmPassword"
              required
              error={errors.confirm}
            >
              <TextInput
                id="confirmPassword"
                name="confirmPassword"
                type={inputType}
                icon="ri-lock-password-line"
                autoComplete="new-password"
                value={confirm}
                onChange={(event) => setConfirm(event.target.value)}
                invalid={Boolean(errors.confirm)}
                placeholder="Re-enter new password"
              />
            </FormField>
          </div>
        </div>

        <FormActions>
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full cursor-pointer whitespace-nowrap rounded-md bg-primary-600 py-3 font-label text-sm font-semibold text-background-50 transition-colors hover:bg-primary-700"
          >
            Change Password
          </button>
        </FormActions>
      </div>
    </div>
  );
}