import { profile } from "@/lib/content";

/** MZF badge with a slow light sweep across it. */
export function LogoMark({ className = "h-8 w-11 text-[12px] sm:h-9 sm:w-12 sm:text-[13px]" }: { className?: string }) {
  return (
    <span className={`logo-shine relative grid place-items-center overflow-hidden rounded-xl bg-gradient-to-br from-accent via-accent2 to-accent3 font-extrabold tracking-tight text-bg shadow-[0_0_18px_-4px_var(--accent)] ${className}`} aria-hidden="true">
      <span className="relative z-10">MZF</span>
    </span>
  );
}

/** Badge plus the full name. */
export default function Logo() {
  return (
    <span className="flex items-center gap-2">
      <LogoMark />
      <span className="whitespace-nowrap font-display text-[14px] font-semibold leading-none tracking-tight sm:text-lg">
        <span className="logo-text">M Zeeshan Fayyaz</span>
        <span className="sr-only"> - {profile.title}</span>
      </span>
    </span>
  );
}
