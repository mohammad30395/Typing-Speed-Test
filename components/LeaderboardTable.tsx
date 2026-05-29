import { Trophy } from "lucide-react";
import type { LeaderboardResult } from "@/types";

interface LeaderboardTableProps {
  results: LeaderboardResult[];
}

export function LeaderboardTable({ results }: LeaderboardTableProps) {
  if (results.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-white/[0.15] bg-white/[0.08] p-10 text-center text-stone-300">
        <Trophy className="mx-auto mb-4 size-10 text-amber-200" aria-hidden="true" />
        <h2 className="text-2xl font-black text-white">No scores yet</h2>
        <p className="mt-2">Finish a typing round to add your first local leaderboard result.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.08] shadow-2xl shadow-black/20">
      <div className="overflow-x-auto">
        <table className="min-w-[920px] w-full text-left text-sm">
          <thead className="bg-white/10 text-xs uppercase tracking-[0.14em] text-stone-300">
            <tr>
              <th className="px-4 py-4">Rank</th>
              <th className="px-4 py-4">Name</th>
              <th className="px-4 py-4">Username</th>
              <th className="px-4 py-4">Difficulty</th>
              <th className="px-4 py-4">Ground</th>
              <th className="px-4 py-4">WPM</th>
              <th className="px-4 py-4">Accuracy</th>
              <th className="px-4 py-4">Result</th>
              <th className="px-4 py-4">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {results.map((result, index) => (
              <tr className="text-stone-200 transition hover:bg-white/[0.08]" key={result.id}>
                <td className="px-4 py-4 font-black text-amber-200">#{index + 1}</td>
                <td className="px-4 py-4 font-semibold text-white">{result.name}</td>
                <td className="px-4 py-4">{result.username}</td>
                <td className="px-4 py-4 capitalize">{result.difficulty}</td>
                <td className="px-4 py-4">{result.groundName}</td>
                <td className="px-4 py-4 font-black text-white">{result.wpm}</td>
                <td className="px-4 py-4">{result.accuracy}%</td>
                <td className="px-4 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-black uppercase tracking-[0.14em] ${
                      result.status === "win" ? "bg-emerald-300 text-emerald-950" : "bg-rose-400 text-rose-950"
                    }`}
                  >
                    {result.status === "win" ? "Win" : "Game Over"}
                  </span>
                </td>
                <td className="px-4 py-4 text-stone-300">{new Date(result.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
