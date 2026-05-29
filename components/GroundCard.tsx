import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import type { Ground } from "@/types";

interface GroundCardProps {
  ground: Ground;
  selected?: boolean;
  onSelect: (ground: Ground) => void;
}

export function GroundCard({ ground, selected = false, onSelect }: GroundCardProps) {
  return (
    <Card className={`relative overflow-hidden bg-gradient-to-br ${ground.themeClass}`} interactive>
      <div className="absolute inset-x-0 top-0 h-24 bg-white/10 blur-3xl" />
      <div className="relative">
        <div className="mb-8 flex items-start justify-between gap-4">
          <div className="grid size-14 place-items-center rounded-2xl border border-white/[0.15] bg-white/10 text-2xl font-black">
            {ground.name.slice(0, 1)}
          </div>
          {selected && <CheckCircle2 className="size-6 text-amber-200" aria-label="Selected" />}
        </div>
        <h2 className="text-xl font-black">{ground.name}</h2>
        <p className="mt-3 min-h-14 text-sm leading-6 text-white/[0.78]">{ground.description}</p>
        <Button className="mt-6 w-full" onClick={() => onSelect(ground)} variant={selected ? "secondary" : "primary"}>
          {selected ? "Selected" : "Choose Ground"}
        </Button>
      </div>
    </Card>
  );
}
