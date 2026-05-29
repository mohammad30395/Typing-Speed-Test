import { paragraphs } from "@/data/paragraphs";
import type { Difficulty, Paragraph } from "@/types";

export function calculateWpm(correctCharacters: number, elapsedSeconds: number): number {
  if (elapsedSeconds <= 0 || correctCharacters <= 0) {
    return 0;
  }

  const words = correctCharacters / 5;
  return Math.max(0, Math.round((words / elapsedSeconds) * 60));
}

export function countMistakes(typedText: string, targetText: string): number {
  return typedText.split("").reduce((mistakes, character, index) => {
    return mistakes + (character === targetText[index] ? 0 : 1);
  }, 0);
}

export function countCorrectCharacters(typedText: string, targetText: string): number {
  return typedText.split("").reduce((correct, character, index) => {
    return correct + (character === targetText[index] ? 1 : 0);
  }, 0);
}

export function calculateAccuracy(typedText: string, targetText: string): number {
  if (typedText.length === 0) {
    return 100;
  }

  const correctCharacters = countCorrectCharacters(typedText, targetText);
  return Math.max(0, Math.min(100, Math.round((correctCharacters / typedText.length) * 100)));
}

export function calculateAttemptAccuracy(correctAttempts: number, totalAttempts: number): number {
  if (totalAttempts <= 0) {
    return 100;
  }

  return Math.max(0, Math.min(100, Math.round((correctAttempts / totalAttempts) * 100)));
}

export function calculateProgress(typedText: string, targetText: string): number {
  if (targetText.length === 0) {
    return 0;
  }

  return Math.max(0, Math.min(100, Math.round((typedText.length / targetText.length) * 100)));
}

export function isExactMatch(typedText: string, targetText: string): boolean {
  return typedText === targetText;
}

export function pickRandomParagraph(difficulty: Difficulty): Paragraph {
  const matches = paragraphs.filter((paragraph) => paragraph.difficulty === difficulty);
  const source = matches.length > 0 ? matches : paragraphs;
  const index = Math.floor(Math.random() * source.length);
  return source[index];
}

export function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}
