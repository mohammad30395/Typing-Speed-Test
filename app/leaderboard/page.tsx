"use client";

import Link from "next/link";
import { Trash2, Trophy } from "lucide-react";
import { useEffect, useState } from "react";
import { Button, buttonClassName } from "@/components/Button";
import { LeaderboardTable } from "@/components/LeaderboardTable";
import { PageShell } from "@/components/PageShell";
import { clearStoredLeaderboard } from "@/lib/localStorage";
import { getSortedLeaderboard } from "@/lib/leaderboardUtils";
import type { LeaderboardResult } from "@/types";

export default function LeaderboardPage() {
  const [results, setResults] = useState<LeaderboardResult[]>([]);

  useEffect(() => {
    setResults(getSortedLeaderboard());
  }, []);

  function handleClear() {
    const confirmed = window.confirm("Clear all saved leaderboard results from this browser?");
    if (!confirmed) {
      return;
    }

    clearStoredLeaderboard();
    setResults([]);
  }

  return (
    <PageShell
      description="Results are sorted by wins first, then WPM, accuracy, mistakes, and recency."
      eyebrow="Local Leaderboard"
      title="Best runs on this browser"
    >
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Link className={buttonClassName("primary")} href="/profile">
          <Trophy className="size-4" aria-hidden="true" />
          Play New Round
        </Link>
        <Button disabled={results.length === 0} onClick={handleClear} variant="danger">
          <Trash2 className="size-4" aria-hidden="true" />
          Clear Leaderboard
        </Button>
      </div>

      <LeaderboardTable results={results} />
    </PageShell>
  );
}
