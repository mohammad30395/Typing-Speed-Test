import { getStoredLeaderboard, saveStoredLeaderboard } from "@/lib/localStorage";
import type { LeaderboardResult } from "@/types";

export function sortLeaderboard(results: LeaderboardResult[]): LeaderboardResult[] {
  return [...results].sort((a, b) => {
    if (a.status !== b.status) {
      return a.status === "win" ? -1 : 1;
    }

    if (a.wpm !== b.wpm) {
      return b.wpm - a.wpm;
    }

    if (a.accuracy !== b.accuracy) {
      return b.accuracy - a.accuracy;
    }

    if (a.mistakes !== b.mistakes) {
      return a.mistakes - b.mistakes;
    }

    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
}

export function saveLeaderboardResult(result: LeaderboardResult): LeaderboardResult[] {
  const nextResults = sortLeaderboard([...getStoredLeaderboard(), result]);
  saveStoredLeaderboard(nextResults);
  return nextResults;
}

export function getSortedLeaderboard(): LeaderboardResult[] {
  return sortLeaderboard(getStoredLeaderboard());
}
