"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { BarChart3, Clock, Gauge, Home, Keyboard, RotateCcw, Target, Trophy, XCircle } from "lucide-react";
import { Button, buttonClassName } from "@/components/Button";
import { ResultModal } from "@/components/ResultModal";
import { TypingStats } from "@/components/TypingStats";
import { DIFFICULTY_LABELS, DIFFICULTY_SECONDS } from "@/constants/game";
import { grounds } from "@/data/grounds";
import {
  calculateAttemptAccuracy,
  calculateProgress,
  calculateWpm,
  countCorrectCharacters,
  formatTime,
  isExactMatch,
  pickRandomParagraph,
} from "@/lib/gameUtils";
import {
  getStoredDifficulty,
  getStoredGroundId,
  getStoredProfile,
} from "@/lib/localStorage";
import { saveLeaderboardResult } from "@/lib/leaderboardUtils";
import type { Difficulty, GameStatus, Ground, LeaderboardResult, Paragraph, ResultStatus, UserProfile } from "@/types";

function createResultId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `result-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export default function GamePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [ground, setGround] = useState<Ground | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
  const [paragraph, setParagraph] = useState<Paragraph | null>(null);
  const [typedText, setTypedText] = useState("");
  const [mistakeAttempts, setMistakeAttempts] = useState(0);
  const [totalTypedAttempts, setTotalTypedAttempts] = useState(0);
  const [correctTypedAttempts, setCorrectTypedAttempts] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [status, setStatus] = useState<GameStatus>("idle");
  const [result, setResult] = useState<LeaderboardResult | null>(null);
  const savedResultRef = useRef(false);
  const mistakeAttemptsRef = useRef(0);
  const totalTypedAttemptsRef = useRef(0);
  const correctTypedAttemptsRef = useRef(0);

  const timeLimit = difficulty ? DIFFICULTY_SECONDS[difficulty] : 0;

  const startRound = useCallback(() => {
    const storedProfile = getStoredProfile();
    if (!storedProfile.name || !storedProfile.username) {
      router.replace("/profile");
      return;
    }

    const storedGroundId = getStoredGroundId();
    const nextGround = grounds.find((item) => item.id === storedGroundId);
    if (!nextGround) {
      router.replace("/grounds");
      return;
    }

    const storedDifficulty = getStoredDifficulty();
    if (!storedDifficulty) {
      router.replace("/difficulty");
      return;
    }

    setProfile(storedProfile);
    setGround(nextGround);
    setDifficulty(storedDifficulty);
    setParagraph(pickRandomParagraph(storedDifficulty));
    setTypedText("");
    setMistakeAttempts(0);
    setTotalTypedAttempts(0);
    setCorrectTypedAttempts(0);
    mistakeAttemptsRef.current = 0;
    totalTypedAttemptsRef.current = 0;
    correctTypedAttemptsRef.current = 0;
    setTimeLeft(DIFFICULTY_SECONDS[storedDifficulty]);
    setResult(null);
    savedResultRef.current = false;
    setStatus("playing");
  }, [router]);

  const finishRound = useCallback(
    (
      nextStatus: ResultStatus,
      finalTypedText: string,
      remainingSeconds: number,
      finalMistakes = mistakeAttemptsRef.current,
      finalCorrectAttempts = correctTypedAttemptsRef.current,
      finalTotalAttempts = totalTypedAttemptsRef.current,
    ) => {
      if (!profile || !ground || !difficulty || !paragraph || savedResultRef.current) {
        return;
      }

      savedResultRef.current = true;
      const usedSeconds = Math.max(1, DIFFICULTY_SECONDS[difficulty] - remainingSeconds);
      const correctCharacters = countCorrectCharacters(finalTypedText, paragraph.text);
      const finalResult: LeaderboardResult = {
        id: createResultId(),
        name: profile.name,
        username: profile.username,
        difficulty,
        groundId: ground.id,
        groundName: ground.name,
        wpm: calculateWpm(correctCharacters, usedSeconds),
        accuracy: finalTotalAttempts > 0 ? calculateAttemptAccuracy(finalCorrectAttempts, finalTotalAttempts) : 0,
        mistakes: finalMistakes,
        timeUsed: usedSeconds,
        status: nextStatus,
        createdAt: new Date().toISOString(),
        totalCharacters: paragraph.text.length,
      };

      saveLeaderboardResult(finalResult);
      setStatus(nextStatus === "win" ? "won" : "lost");
      setResult(finalResult);
    },
    [difficulty, ground, paragraph, profile],
  );

  useEffect(() => {
    startRound();
  }, [startRound]);

  useEffect(() => {
    if (status !== "playing") {
      return;
    }

    const timer = window.setInterval(() => {
      setTimeLeft((current) => Math.max(0, current - 1));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [status]);

  useEffect(() => {
    if (status === "playing" && timeLeft === 0 && paragraph) {
      finishRound("lose", typedText, 0);
    }
  }, [finishRound, paragraph, status, timeLeft, typedText]);

  const stats = useMemo(() => {
    if (!paragraph || !difficulty) {
      return [];
    }

    const elapsedSeconds = Math.max(1, timeLimit - timeLeft);
    const correctCharacters = countCorrectCharacters(typedText, paragraph.text);

    return [
      { label: "Timer", value: formatTime(timeLeft), icon: <Clock className="size-3.5" aria-hidden="true" /> },
      { label: "Mode", value: DIFFICULTY_LABELS[difficulty], icon: <Gauge className="size-3.5" aria-hidden="true" /> },
      { label: "WPM", value: calculateWpm(correctCharacters, elapsedSeconds), icon: <Keyboard className="size-3.5" aria-hidden="true" /> },
      {
        label: "Accuracy",
        value: `${calculateAttemptAccuracy(correctTypedAttempts, totalTypedAttempts)}%`,
        icon: <Target className="size-3.5" aria-hidden="true" />,
      },
      { label: "Mistakes", value: mistakeAttempts, icon: <XCircle className="size-3.5" aria-hidden="true" /> },
      { label: "Progress", value: `${calculateProgress(typedText, paragraph.text)}%`, icon: <Trophy className="size-3.5" aria-hidden="true" /> },
    ];
  }, [correctTypedAttempts, difficulty, mistakeAttempts, paragraph, timeLeft, timeLimit, totalTypedAttempts, typedText]);

  function handleTyping(value: string) {
    if (!paragraph || status !== "playing") {
      return;
    }

    const nextText = value.slice(0, paragraph.text.length);
    const addedText = nextText.length > typedText.length ? nextText.slice(typedText.length) : "";
    const addedCorrectAttempts = addedText.split("").reduce((total, character, offset) => {
      const targetIndex = typedText.length + offset;
      return total + (character === paragraph.text[targetIndex] ? 1 : 0);
    }, 0);
    const addedMistakes =
      addedText.length > 0 ? addedText.length - addedCorrectAttempts : 0;
    const nextMistakeAttempts = mistakeAttemptsRef.current + addedMistakes;
    const nextTotalTypedAttempts = totalTypedAttemptsRef.current + addedText.length;
    const nextCorrectTypedAttempts = correctTypedAttemptsRef.current + addedCorrectAttempts;

    if (addedText.length > 0) {
      totalTypedAttemptsRef.current = nextTotalTypedAttempts;
      correctTypedAttemptsRef.current = nextCorrectTypedAttempts;
      mistakeAttemptsRef.current = nextMistakeAttempts;
      setTotalTypedAttempts(nextTotalTypedAttempts);
      setCorrectTypedAttempts(nextCorrectTypedAttempts);
      setMistakeAttempts(nextMistakeAttempts);
    }

    setTypedText(nextText);

    if (isExactMatch(nextText, paragraph.text)) {
      finishRound("win", nextText, timeLeft, nextMistakeAttempts, nextCorrectTypedAttempts, nextTotalTypedAttempts);
    }
  }

  if (!profile || !ground || !difficulty || !paragraph) {
    return (
      <main className="grid h-dvh place-items-center bg-stone-950 p-4 text-white">
        <div className="rounded-3xl border border-white/10 bg-white/[0.08] p-6 text-center shadow-2xl shadow-black/30">
          <div className="mx-auto mb-4 size-10 animate-pulse rounded-full bg-amber-300" />
          <p className="font-semibold text-stone-300">Preparing your typing round...</p>
        </div>
      </main>
    );
  }

  const progress = calculateProgress(typedText, paragraph.text);

  return (
    <main className={`h-dvh overflow-hidden bg-gradient-to-br ${ground.themeClass}`}>
      <div className="flex h-full min-h-0 flex-col bg-black/20">
        <header className="mx-auto flex w-full max-w-6xl shrink-0 items-center justify-between gap-3 px-3 py-1.5 sm:px-5 sm:py-2">
          <div className="min-w-0">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white/60 sm:text-xs">{ground.name}</p>
            <h1 className="truncate text-base font-black text-white sm:text-xl">TypeQuest Round</h1>
          </div>
          <nav className="flex shrink-0 items-center gap-2">
            <Link className={buttonClassName("ghost", "sm", "px-3")} href="/" title="Home">
              <Home className="size-4" aria-hidden="true" />
              <span className="hidden sm:inline">Home</span>
            </Link>
            <Link className={buttonClassName("ghost", "sm", "px-3")} href="/leaderboard" title="Leaderboard">
              <BarChart3 className="size-4" aria-hidden="true" />
              <span className="hidden sm:inline">Leaderboard</span>
            </Link>
          </nav>
        </header>

        <section className="mx-auto flex w-full max-w-6xl min-h-0 flex-1 flex-col gap-1.5 px-3 pb-2 sm:gap-2 sm:px-5 sm:pb-4">
          <TypingStats stats={stats} />

          <div className="h-1.5 shrink-0 overflow-hidden rounded-full bg-black/30 sm:h-2">
            <div className="h-full rounded-full bg-gradient-to-r from-amber-300 to-cyan-300 transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>

          <div className="grid min-h-0 flex-1 grid-rows-[minmax(9.5rem,1fr)_minmax(10.5rem,0.8fr)] gap-1.5 sm:grid-rows-[minmax(10.5rem,1fr)_minmax(11rem,0.75fr)] lg:grid-cols-[1.1fr_0.9fr] lg:grid-rows-1 lg:gap-2">
            <section className="flex min-h-0 flex-col rounded-2xl border border-white/10 bg-black/[0.28] p-2.5 shadow-2xl shadow-black/20 backdrop-blur sm:p-3">
              <div className="mb-1.5 flex items-center justify-between gap-3">
                <div>
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-white/[0.55] sm:text-xs">Target Paragraph</p>
                  <p className="text-xs font-semibold text-white/75 sm:text-sm">{paragraph.text.length} characters</p>
                </div>
                <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-white">
                  {status === "playing" ? "Live" : status === "won" ? "Won" : "Over"}
                </span>
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto rounded-xl border border-white/10 bg-stone-950/[0.55] p-2.5 text-sm leading-6 text-stone-300 sm:p-3 sm:text-base sm:leading-7">
                {paragraph.text.split("").map((character, index) => {
                  const typedCharacter = typedText[index];
                  const isCurrent = index === typedText.length && status === "playing";
                  const className =
                    typedCharacter == null
                      ? isCurrent
                        ? "rounded bg-amber-300/25 text-amber-100"
                        : "text-stone-300"
                      : typedCharacter === character
                        ? "text-emerald-200"
                        : "rounded bg-rose-500/30 text-rose-100";

                  return (
                    <span className={className} key={`${character}-${index}`}>
                      {character}
                    </span>
                  );
                })}
              </div>
            </section>

            <section className="flex min-h-0 flex-col rounded-2xl border border-white/10 bg-black/[0.28] p-2.5 shadow-2xl shadow-black/20 backdrop-blur sm:p-3">
              <label className="flex min-h-0 flex-1 flex-col">
                <span className="mb-1.5 block text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-white/[0.55] sm:text-xs">Your Typing</span>
                <textarea
                  className="min-h-0 flex-1 resize-none rounded-xl border border-white/10 bg-stone-950/70 p-2.5 text-sm leading-6 text-white outline-none transition placeholder:text-stone-500 focus:border-amber-200/60 focus:ring-2 focus:ring-amber-200/20 sm:p-3 sm:text-base"
                  disabled={status !== "playing"}
                  maxLength={paragraph.text.length}
                  onChange={(event) => handleTyping(event.target.value)}
                  placeholder="Start typing the paragraph exactly..."
                  value={typedText}
                />
              </label>

              <div className="mt-2 grid shrink-0 grid-cols-2 gap-2">
                <Button onClick={startRound} variant="secondary">
                  <RotateCcw className="size-4" aria-hidden="true" />
                  Restart
                </Button>
                <Button onClick={() => router.push("/difficulty")} variant="ghost">
                  Difficulty
                </Button>
              </div>
            </section>
          </div>
        </section>
      </div>

      <ResultModal
        onChangeDifficulty={() => router.push("/difficulty")}
        onHome={() => router.push("/")}
        onLeaderboard={() => router.push("/leaderboard")}
        onPlayAgain={startRound}
        result={result}
      />
    </main>
  );
}
