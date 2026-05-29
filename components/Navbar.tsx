"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, Home, Play, ScrollText, Settings } from "lucide-react";
import { buttonClassName } from "@/components/Button";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/rules", label: "Rules", icon: ScrollText },
  { href: "/profile", label: "Play", icon: Play },
  { href: "/settings", label: "Settings", icon: Settings },
  { href: "/leaderboard", label: "Leaderboard", icon: BarChart3 },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
      <Link className="flex items-center gap-3" href="/">
        <span className="grid size-10 place-items-center rounded-xl bg-amber-300 text-lg font-black text-stone-950 shadow-lg shadow-amber-950/25">
          T
        </span>
        <span className="hidden text-sm font-black uppercase tracking-[0.22em] text-white sm:block">TypeQuest</span>
      </Link>

      <nav className="flex max-w-full items-center gap-2 overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.08] p-1 backdrop-blur">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              className={buttonClassName(active ? "primary" : "ghost", "sm", "shrink-0 rounded-xl px-3")}
              href={item.href}
              key={item.href}
              title={item.label}
            >
              <Icon aria-hidden="true" className="size-4" />
              <span className="hidden md:inline">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
