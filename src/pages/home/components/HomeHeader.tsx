import { useAppSession } from "@/context/AppSessionContext";

function greetingKey() {
  const hour = new Date().getHours();
  if (hour < 12) return "home.goodMorning";
  if (hour < 17) return "home.goodAfternoon";
  return "home.goodEvening";
}

export default function HomeHeader() {
  const { user, t } = useAppSession();

  if (!user) return null;

  return (
    <div className="px-4 pt-5">
      <p className="font-heading text-[22px] font-semibold leading-tight text-foreground-950">
        {t(greetingKey())},
      </p>
      <p className="mt-0.5 font-heading text-2xl font-bold leading-tight text-primary-800">
        {user.name}
      </p>
    </div>
  );
}