import type { ReactNode } from "react";
import { Navbar } from "@/components/Navbar";

interface PageShellProps {
  children: ReactNode;
  eyebrow?: string;
  title?: string;
  description?: string;
  compact?: boolean;
}

export function PageShell({ children, eyebrow, title, description, compact = false }: PageShellProps) {
  return (
    <main className="relative min-h-dvh overflow-hidden bg-stone-950 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.20),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(34,211,238,0.16),transparent_28%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:42px_42px] opacity-40" />
      <div className="relative z-10">
        <Navbar />
        <section className={compact ? "mx-auto w-full max-w-6xl px-4 pb-8 pt-4 sm:px-6" : "mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:py-12"}>
          {(eyebrow || title || description) && (
            <div className="mb-8 max-w-3xl">
              {eyebrow && <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-amber-200">{eyebrow}</p>}
              {title && <h1 className="text-3xl font-black text-white sm:text-5xl">{title}</h1>}
              {description && <p className="mt-4 text-base leading-7 text-stone-300 sm:text-lg">{description}</p>}
            </div>
          )}
          {children}
        </section>
      </div>
    </main>
  );
}
