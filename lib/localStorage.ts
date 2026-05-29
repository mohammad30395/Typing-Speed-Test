import type { Difficulty, LeaderboardResult, UserProfile } from "@/types";

export const STORAGE_KEYS = {
  profile: "typing-speed-test:profile",
  selectedGround: "typing-speed-test:selected-ground",
  selectedDifficulty: "typing-speed-test:selected-difficulty",
  leaderboard: "typing-speed-test:leaderboard",
} as const;

const emptyProfile: UserProfile = {
  name: "",
  username: "",
};

const isStorageAvailable = () => {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    return Boolean(window.localStorage);
  } catch {
    return false;
  }
};

export function getFromStorage<T>(key: string, fallback: T): T {
  if (!isStorageAvailable()) {
    return fallback;
  }

  try {
    const value = window.localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function setInStorage<T>(key: string, value: T): boolean {
  if (!isStorageAvailable()) {
    return false;
  }

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

export function removeFromStorage(key: string): boolean {
  if (!isStorageAvailable()) {
    return false;
  }

  try {
    window.localStorage.removeItem(key);
    return true;
  } catch {
    return false;
  }
}

export function getStoredProfile(): UserProfile {
  const profile = getFromStorage<UserProfile>(STORAGE_KEYS.profile, emptyProfile);
  return {
    name: typeof profile.name === "string" ? profile.name : "",
    username: typeof profile.username === "string" ? profile.username : "",
  };
}

export function saveStoredProfile(profile: UserProfile): boolean {
  return setInStorage(STORAGE_KEYS.profile, {
    name: profile.name.trim(),
    username: profile.username.trim(),
  });
}

export function getStoredGroundId(): string {
  return getFromStorage<string>(STORAGE_KEYS.selectedGround, "");
}

export function saveStoredGroundId(groundId: string): boolean {
  return setInStorage(STORAGE_KEYS.selectedGround, groundId);
}

export function getStoredDifficulty(): Difficulty | "" {
  const value = getFromStorage<Difficulty | "">(STORAGE_KEYS.selectedDifficulty, "");
  return value === "easy" || value === "medium" || value === "hard" ? value : "";
}

export function saveStoredDifficulty(difficulty: Difficulty): boolean {
  return setInStorage(STORAGE_KEYS.selectedDifficulty, difficulty);
}

export function getStoredLeaderboard(): LeaderboardResult[] {
  const results = getFromStorage<LeaderboardResult[]>(STORAGE_KEYS.leaderboard, []);
  return Array.isArray(results) ? results : [];
}

export function saveStoredLeaderboard(results: LeaderboardResult[]): boolean {
  return setInStorage(STORAGE_KEYS.leaderboard, results);
}

export function clearStoredLeaderboard(): boolean {
  return removeFromStorage(STORAGE_KEYS.leaderboard);
}
