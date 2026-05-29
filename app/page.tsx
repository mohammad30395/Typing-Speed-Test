import Link from "next/link";
import { BarChart3, BookOpen, Play, Settings, Sparkles } from "lucide-react";
import { buttonClassName } from "@/components/Button";
import { Card } from "@/components/Card";
import { PageShell } from "@/components/PageShell";

const actions = [
  { href: "/profile", label: "Play", icon: Play, variant: "primary" as const },
  { href: "/rules", label: "Rules", icon: BookOpen, variant: "ghost" as const },
  { href: "/settings", label: "Settings", icon: Settings, variant: "ghost" as const },
  { href: "/leaderboard", label: "Leaderboard", icon: BarChart3, variant: "secondary" as const },
];

export default function Home() {
  return (
    <PageShell compact>
      <section className="grid min-h-[calc(100dvh-8rem)] items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-200/20 bg-amber-200/10 px-4 py-2 text-sm font-semibold text-amber-100">
            <Sparkles className="size-4" aria-hidden="true" />
            Frontend-only speed challenge
          </div>
          <h1 className="max-w-3xl text-4xl font-black leading-tight text-white sm:text-6xl lg:text-7xl">
            TypeQuest
            <span className="block bg-gradient-to-r from-amber-200 via-cyan-200 to-emerald-200 bg-clip-text text-transparent">
              Speed Test
            </span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-stone-300 sm:text-lg">
            Choose a story ground, set your difficulty, and race the timer with exact typing. Your profile and scores stay in this browser using localStorage.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
            {actions.map((action) => {
              const Icon = action.icon;
              return (
                <Link className={buttonClassName(action.variant, "lg", "w-full sm:w-auto")} href={action.href} key={action.href}>
                  <Icon className="size-5" aria-hidden="true" />
                  {action.label}
                </Link>
              );
            })}
          </div>
        </div>

        <Card className="relative overflow-hidden p-4 sm:p-6">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_20%,rgba(251,191,36,0.22),transparent_28%),radial-gradient(circle_at_80%_70%,rgba(34,211,238,0.18),transparent_32%)]" />
          <div className="relative rounded-3xl border border-white/10 bg-black/25 p-4 sm:p-6">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-stone-400">Today&apos;s run</p>
                <h2 className="mt-1 text-2xl font-black text-white">Classic Library</h2>
              </div>
              <span className="rounded-full bg-amber-300 px-3 py-1 text-sm font-black text-stone-950">45s</span>
            </div>
            <div className="space-y-3 text-sm leading-7 text-stone-300">
              <p>
                <span className="rounded bg-emerald-400/20 px-1 text-emerald-100">The old archive</span>{" "}
                <span className="rounded bg-rose-400/20 px-1 text-rose-100">revealed</span>{" "}
                a secret route through the palace garden.
              </p>
              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-amber-300 to-cyan-300" />
              </div>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-3">
              {[
                ["WPM", "62"],
                ["Accuracy", "98%"],
                ["Mistakes", "2"],
              ].map(([label, value]) => (
                <div className="rounded-2xl border border-white/10 bg-white/[0.08] p-3" key={label}>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-400">{label}</p>
                  <p className="mt-1 text-2xl font-black text-white">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </section>
    </PageShell>
  );
}
