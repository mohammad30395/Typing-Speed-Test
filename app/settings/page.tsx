"use client";

import { FormEvent, useEffect, useState } from "react";
import { Save } from "lucide-react";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { PageShell } from "@/components/PageShell";
import { getStoredProfile, saveStoredProfile } from "@/lib/localStorage";

export default function SettingsPage() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");

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
      setMessage("Please enter both name and username.");
      return;
    }

    saveStoredProfile({ name: nextName, username: nextUsername });
    setMessage("Profile saved in localStorage.");
  }

  return (
    <PageShell
      description="Update the player details used in new games and leaderboard results on this browser."
      eyebrow="Settings"
      title="Player profile"
    >
      <Card className="max-w-2xl">
        <form className="space-y-5" onSubmit={handleSubmit}>
          <label className="block">
            <span className="text-sm font-semibold uppercase tracking-[0.16em] text-stone-400">Name</span>
            <input
              className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition placeholder:text-stone-500 focus:border-amber-200/60 focus:ring-2 focus:ring-amber-200/20"
              onChange={(event) => setName(event.target.value)}
              placeholder="Your name"
              value={name}
            />
          </label>

          <label className="block">
            <span className="text-sm font-semibold uppercase tracking-[0.16em] text-stone-400">Username</span>
            <input
              className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition placeholder:text-stone-500 focus:border-amber-200/60 focus:ring-2 focus:ring-amber-200/20"
              onChange={(event) => setUsername(event.target.value)}
              placeholder="speedrunner"
              value={username}
            />
          </label>

          {message && (
            <p className={`rounded-2xl px-4 py-3 text-sm ${message.includes("saved") ? "bg-emerald-400/[0.15] text-emerald-100" : "bg-rose-400/[0.15] text-rose-100"}`}>
              {message}
            </p>
          )}

          <Button type="submit">
            <Save className="size-4" aria-hidden="true" />
            Save Settings
          </Button>
        </form>
      </Card>
    </PageShell>
  );
}
