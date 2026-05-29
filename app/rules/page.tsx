import { BookOpen, Clock, Database, Trophy } from "lucide-react";
import { Card } from "@/components/Card";
import { PageShell } from "@/components/PageShell";

const rules = [
  {
    icon: BookOpen,
    title: "How to play",
    text: "Enter or confirm your name, choose a playing ground, choose a difficulty, then type the displayed paragraph exactly as shown.",
  },
  {
    icon: Clock,
    title: "Difficulty timing",
    text: "Easy gives 60 seconds, Medium gives 45 seconds, and Hard gives 30 seconds. Hard paragraphs are longer and denser.",
  },
  {
    icon: Trophy,
    title: "Winning and losing",
    text: "You win by completing the full paragraph correctly before the timer reaches zero. If time ends first, the round is saved as Game Over.",
  },
  {
    icon: Database,
    title: "Local leaderboard",
    text: "Scores are saved only in this browser with localStorage. There is no backend, database, account system, or external storage.",
  },
];

export default function RulesPage() {
  return (
    <PageShell
      description="The goal is simple: type accurately, manage the timer, and climb your local leaderboard."
      eyebrow="Game Rules"
      title="Play clean. Type fast."
    >
      <div className="grid gap-4 md:grid-cols-2">
        {rules.map((rule) => {
          const Icon = rule.icon;
          return (
            <Card interactive key={rule.title}>
              <div className="mb-5 grid size-12 place-items-center rounded-2xl bg-amber-300 text-stone-950">
                <Icon className="size-6" aria-hidden="true" />
              </div>
              <h2 className="text-2xl font-black text-white">{rule.title}</h2>
              <p className="mt-3 leading-7 text-stone-300">{rule.text}</p>
            </Card>
          );
        })}
      </div>
    </PageShell>
  );
}
