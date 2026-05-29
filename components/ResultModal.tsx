import { Award, Home, ListRestart, RotateCcw, Trophy } from "lucide-react";
import { Button } from "@/components/Button";
import type { LeaderboardResult } from "@/types";

interface ResultModalProps {
  result: LeaderboardResult | null;
  onPlayAgain: () => void;
  onChangeDifficulty: () => void;
  onHome: () => void;
  onLeaderboard: () => void;
}

export function ResultModal({ result, onPlayAgain, onChangeDifficulty, onHome, onLeaderboard }: ResultModalProps) {
  if (!result) {
    return null;
  }

  const won = result.status === "win";
  const details = [
    ["Name", result.name],
    ["Username", result.username],
    ["Difficulty", result.difficulty],
    ["Ground", result.groundName],
    ["WPM", result.wpm],
    ["Accuracy", `${result.accuracy}%`],
    ["Mistakes", result.mistakes],
    ["Time Used", `${result.timeUsed}s`],
  ];

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4 backdrop-blur-sm">
      <section className="w-full max-w-2xl rounded-3xl border border-white/[0.15] bg-stone-950 p-5 text-white shadow-2xl shadow-black sm:p-6">
        <div className="flex items-start gap-4">
          <div
            className={`grid size-14 shrink-0 place-items-center rounded-2xl ${
              won ? "bg-amber-300 text-stone-950" : "bg-rose-400 text-rose-950"
            }`}
          >
            {won ? <Trophy className="size-7" aria-hidden="true" /> : <Award className="size-7" aria-hidden="true" />}
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-stone-400">Final Result</p>
            <h2 className="mt-1 text-3xl font-black">{won ? "You Won" : "Game Over"}</h2>
            <p className="mt-2 text-sm leading-6 text-stone-300">
              Your result has been saved to the local leaderboard on this browser.
            </p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {details.map(([label, value]) => (
            <div className="rounded-2xl border border-white/10 bg-white/[0.08] p-3" key={label}>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-400">{label}</p>
              <p className="mt-1 break-words text-lg font-black capitalize text-white">{value}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Button onClick={onPlayAgain}>
            <RotateCcw className="size-4" aria-hidden="true" />
            Play Again
          </Button>
          <Button onClick={onChangeDifficulty} variant="secondary">
            <ListRestart className="size-4" aria-hidden="true" />
            Change Difficulty
          </Button>
          <Button onClick={onHome} variant="ghost">
            <Home className="size-4" aria-hidden="true" />
            Home
          </Button>
          <Button onClick={onLeaderboard} variant="ghost">
            <Trophy className="size-4" aria-hidden="true" />
            View Leaderboard
          </Button>
        </div>
      </section>
    </div>
  );
}
