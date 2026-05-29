"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { grounds } from "@/data/grounds";
import { GroundCard } from "@/components/GroundCard";
import { PageShell } from "@/components/PageShell";
import { getStoredGroundId, getStoredProfile, saveStoredGroundId } from "@/lib/localStorage";
import type { Ground } from "@/types";

export default function GroundsPage() {
  const router = useRouter();
  const [selectedGroundId, setSelectedGroundId] = useState("");

  useEffect(() => {
    const profile = getStoredProfile();
    if (!profile.name || !profile.username) {
      router.replace("/profile");
      return;
    }

    setSelectedGroundId(getStoredGroundId());
  }, [router]);

  function handleSelect(ground: Ground) {
    saveStoredGroundId(ground.id);
    setSelectedGroundId(ground.id);
    router.push("/difficulty");
  }

  return (
    <PageShell
      description="Pick the mood for your typing run. The selected ground appears in your game screen and saved result."
      eyebrow="Playing Grounds"
      title="Choose your arena"
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {grounds.map((ground) => (
          <GroundCard ground={ground} key={ground.id} onSelect={handleSelect} selected={selectedGroundId === ground.id} />
        ))}
      </div>
    </PageShell>
  );
}
