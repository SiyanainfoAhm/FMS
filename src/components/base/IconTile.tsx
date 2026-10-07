import type { Tone } from "./toneStyles";
import { toneTile } from "./toneStyles";

interface IconTileProps {
  icon: string;
  tone?: Tone;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap: Record<NonNullable<IconTileProps["size"]>, string> = {
  sm: "w-9 h-9 text-[16px]",
  md: "w-11 h-11 text-[20px]",
  lg: "w-14 h-14 text-[24px]",
};

export default function IconTile({
  icon,
  tone = "primary",
  size = "md",
  className = "",
}: IconTileProps) {
  return (
    <span
      className={`flex items-center justify-center rounded-lg backdrop-blur-md ${toneTile[tone]} ${sizeMap[size]} ${className}`}
    >
      <i className={`${icon} leading-none`} />
    </span>
  );
}