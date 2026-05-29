"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { DifficultyCard } from "@/components/DifficultyCard";
import { PageShell } from "@/components/PageShell";
import { getStoredGroundId, getStoredProfile, saveStoredDifficulty } from "@/lib/localStorage";
import type { Difficulty } from "@/types";

const difficulties: Difficulty[] = ["easy", "medium", "hard"];

export default function DifficultyPage() {
  const router = useRouter();

  useEffect(() => {
    const profile = getStoredProfile();
    if (!profile.name || !profile.username) {
      router.replace("/profile");
      return;
    }

    if (!getStoredGroundId()) {
      router.replace("/grounds");
    }
  }, [router]);

  function handleSelect(difficulty: Difficulty) {
    saveStoredDifficulty(difficulty);
    router.push("/game");
  }

  return (
    <PageShell
      description="Each difficulty uses a different timer and paragraph length. Choose the pace that fits your run."
      eyebrow="Difficulty"
      title="Set the timer"
    >
      <div className="grid gap-4 lg:grid-cols-3">
        {difficulties.map((difficulty) => (
          <DifficultyCard difficulty={difficulty} key={difficulty} onSelect={handleSelect} />
        ))}
      </div>
    </PageShell>
  );
}
