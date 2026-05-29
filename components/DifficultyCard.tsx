import { Clock, Gauge, Sparkles } from "lucide-react";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { DIFFICULTY_DESCRIPTIONS, DIFFICULTY_LABELS, DIFFICULTY_SECONDS } from "@/constants/game";
import type { Difficulty } from "@/types";

interface DifficultyCardProps {
  difficulty: Difficulty;
  onSelect: (difficulty: Difficulty) => void;
}

const toneClasses: Record<Difficulty, string> = {
  easy: "border-emerald-300/25 from-emerald-400/[0.15]",
  medium: "border-amber-300/25 from-amber-400/[0.15]",
  hard: "border-rose-300/25 from-rose-400/[0.15]",
};

export function DifficultyCard({ difficulty, onSelect }: DifficultyCardProps) {
  return (
    <Card className={`bg-gradient-to-br ${toneClasses[difficulty]} to-white/5`} interactive>
      <div className="flex items-start justify-between gap-4">
        <div className="grid size-12 place-items-center rounded-2xl border border-white/10 bg-white/10 text-amber-200">
          {difficulty === "easy" && <Sparkles className="size-6" aria-hidden="true" />}
          {difficulty === "medium" && <Gauge className="size-6" aria-hidden="true" />}
          {difficulty === "hard" && <Clock className="size-6" aria-hidden="true" />}
        </div>
        <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-sm font-bold text-white">
          {DIFFICULTY_SECONDS[difficulty]}s
        </span>
      </div>
      <h2 className="mt-6 text-2xl font-black text-white">{DIFFICULTY_LABELS[difficulty]}</h2>
      <p className="mt-3 min-h-[4.5rem] text-sm leading-6 text-stone-300">{DIFFICULTY_DESCRIPTIONS[difficulty]}</p>
      <Button className="mt-6 w-full" onClick={() => onSelect(difficulty)}>
        Start {DIFFICULTY_LABELS[difficulty]}
      </Button>
    </Card>
  );
}
