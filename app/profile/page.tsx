"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, UserRound } from "lucide-react";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { PageShell } from "@/components/PageShell";
import { getStoredProfile, saveStoredProfile } from "@/lib/localStorage";

export default function ProfilePage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const profile = getStoredProfile();
    setName(profile.name);
    setUsername(profile.username);
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextName = name.trim();
    const nextUsername = username.trim();

    if (!nextName || !nextUsername) {
      setError("Name and username are required before playing.");
      return;
    }

    saveStoredProfile({ name: nextName, username: nextUsername });
    router.push("/grounds");
  }

  return (
    <PageShell
      description="Confirm who is playing before choosing a themed typing ground."
      eyebrow="Player Check"
      title="Ready your profile"
    >
      <Card className="max-w-2xl">
        <div className="mb-6 flex items-center gap-4">
          <div className="grid size-12 place-items-center rounded-2xl bg-cyan-300 text-slate-950">
            <UserRound className="size-6" aria-hidden="true" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white">Player details</h2>
            <p className="mt-1 text-sm text-stone-400">These values appear in your final result and leaderboard.</p>
          </div>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <label className="block">
            <span className="text-sm font-semibold uppercase tracking-[0.16em] text-stone-400">Name</span>
            <input
              className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition placeholder:text-stone-500 focus:border-cyan-200/60 focus:ring-2 focus:ring-cyan-200/20"
              onChange={(event) => setName(event.target.value)}
              placeholder="Your name"
              value={name}
            />
          </label>

          <label className="block">
            <span className="text-sm font-semibold uppercase tracking-[0.16em] text-stone-400">Username</span>
            <input
              className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition placeholder:text-stone-500 focus:border-cyan-200/60 focus:ring-2 focus:ring-cyan-200/20"
              onChange={(event) => setUsername(event.target.value)}
              placeholder="speedrunner"
              value={username}
            />
          </label>

          {error && <p className="rounded-2xl bg-rose-400/[0.15] px-4 py-3 text-sm text-rose-100">{error}</p>}

          <Button type="submit">
            Continue
            <ArrowRight className="size-4" aria-hidden="true" />
          </Button>
        </form>
      </Card>
    </PageShell>
  );
}
