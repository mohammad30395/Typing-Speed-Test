import type { ReactNode } from "react";

interface TypingStatsProps {
  stats: Array<{
    label: string;
    value: string | number;
    icon?: ReactNode;
  }>;
}

export function TypingStats({ stats }: TypingStatsProps) {
  return (
    <div className="grid grid-cols-3 gap-1.5 sm:grid-cols-6 sm:gap-2">
      {stats.map((stat) => (
        <div className="rounded-xl border border-white/10 bg-black/20 p-2 sm:p-2.5" key={stat.label}>
          <div className="flex items-center gap-1 text-[0.58rem] font-semibold uppercase tracking-[0.1em] text-stone-400 sm:text-[0.65rem]">
            {stat.icon}
            {stat.label}
          </div>
          <div className="mt-0.5 text-base font-black text-white sm:text-xl">{stat.value}</div>
        </div>
      ))}
    </div>
  );
}
