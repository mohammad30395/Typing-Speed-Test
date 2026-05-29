import type { Difficulty } from "@/types";

export const DIFFICULTY_SECONDS: Record<Difficulty, number> = {
  easy: 60,
  medium: 45,
  hard: 30,
};

export const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  easy: "Easy",
  medium: "Medium",
  hard: "Hard",
};

export const DIFFICULTY_DESCRIPTIONS: Record<Difficulty, string> = {
  easy: "A steady 60 second run with shorter passages for warmups.",
  medium: "A focused 45 second run with longer lines and punctuation.",
  hard: "A sharp 30 second sprint with dense passages and little room for pauses.",
};
