export type Difficulty = "easy" | "medium" | "hard";

export type GameStatus = "idle" | "playing" | "won" | "lost";

export type ResultStatus = "win" | "lose";

export interface UserProfile {
  name: string;
  username: string;
}

export interface Ground {
  id: string;
  name: string;
  description: string;
  themeClass: string;
}

export interface Paragraph {
  id: string;
  difficulty: Difficulty;
  text: string;
}

export interface LeaderboardResult {
  id: string;
  name: string;
  username: string;
  difficulty: Difficulty;
  groundId: string;
  groundName: string;
  wpm: number;
  accuracy: number;
  mistakes: number;
  timeUsed: number;
  status: ResultStatus;
  createdAt: string;
  totalCharacters: number;
}
