# TypeQuest Typing Speed Test

TypeQuest is a polished, frontend-only typing speed test game built with Next.js. Players create a local profile, choose a themed typing ground, select a difficulty, and race the timer by typing the displayed paragraph exactly as shown.

All player settings and leaderboard results are stored in the browser with `localStorage`. The project does not require a backend, database, login system, or external API.

## Features

- Timed typing rounds with live WPM, accuracy, mistake, timer, and progress stats.
- Three difficulty levels:
  - Easy: 60 seconds with shorter passages.
  - Medium: 45 seconds with longer lines and punctuation.
  - Hard: 30 seconds with denser passages.
- Six themed playing grounds with distinct visual moods.
- 100 built-in practice paragraphs split across easy, medium, and hard modes.
- Local player profile stored in the browser.
- Local leaderboard sorted by wins, WPM, accuracy, mistakes, and recency.
- Result modal after each round with options to replay, change difficulty, view leaderboard, or return home.
- Responsive dark UI designed for desktop and mobile screens.

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Lucide React icons
- Browser `localStorage` for persistence

## Getting Started

### Prerequisites

- Node.js 20 or newer is recommended.
- npm

### Installation

```bash
npm install
```

### Run The Development Server

```bash
npm run dev
```

Open the local URL printed in the terminal, usually:

```text
http://localhost:3000
```

### Build For Production

```bash
npm run build
```

### Start The Production Build

```bash
npm run start
```

### Lint The Project

```bash
npm run lint
```

## How To Play

1. Open the app and choose `Play`.
2. Enter your name and username.
3. Select a playing ground.
4. Choose a difficulty.
5. Type the target paragraph exactly before the timer reaches zero.
6. Review the result and check the local leaderboard.

A round is marked as a win only when the typed text exactly matches the full paragraph before time runs out. If the timer reaches zero first, the attempt is saved as `Game Over`.

## Scoring

- WPM is calculated from correctly typed characters, using the common 5 characters = 1 word rule.
- Accuracy is based on correct typing attempts compared with total typing attempts.
- Mistakes are counted when newly typed characters do not match the target character at the same position.
- Progress is based on how many target characters have been typed.

Leaderboard results are sorted in this order:

1. Wins before losses.
2. Higher WPM.
3. Higher accuracy.
4. Fewer mistakes.
5. Newer result.

## App Routes

| Route | Purpose |
| --- | --- |
| `/` | Home page with primary navigation and app preview. |
| `/profile` | Create or confirm the local player profile. |
| `/grounds` | Choose the visual theme for the typing round. |
| `/difficulty` | Select easy, medium, or hard mode. |
| `/game` | Play the active typing round. |
| `/leaderboard` | View and clear saved local results. |
| `/settings` | Update the local player profile. |
| `/rules` | Read gameplay rules and persistence notes. |

## Project Structure

```text
app/
  page.tsx                 Home page
  game/page.tsx            Main typing round experience
  profile/page.tsx         Player profile setup
  grounds/page.tsx         Ground selection
  difficulty/page.tsx      Difficulty selection
  leaderboard/page.tsx     Local leaderboard
  settings/page.tsx        Profile settings
  rules/page.tsx           Game rules
components/
  Button.tsx               Shared button styles
  Card.tsx                 Shared card container
  ResultModal.tsx          End-of-round result dialog
  TypingStats.tsx          Live typing statistics
  LeaderboardTable.tsx     Leaderboard table
data/
  grounds.ts               Available playing grounds
  paragraphs.ts            Built-in typing paragraphs
lib/
  gameUtils.ts             WPM, accuracy, progress, and paragraph helpers
  leaderboardUtils.ts      Result sorting and saving helpers
  localStorage.ts          Browser storage helpers
constants/
  game.ts                  Difficulty labels, descriptions, and timers
types/
  index.ts                 Shared TypeScript types
```

## Local Storage

The app uses these browser storage keys:

| Key | Stores |
| --- | --- |
| `typing-speed-test:profile` | Player name and username. |
| `typing-speed-test:selected-ground` | Last selected playing ground. |
| `typing-speed-test:selected-difficulty` | Last selected difficulty. |
| `typing-speed-test:leaderboard` | Saved leaderboard results. |

Because the data is stored locally, leaderboard results are specific to the current browser and device. Clearing browser storage or using another browser will reset the saved data.

## Customization

- Add or edit typing prompts in `data/paragraphs.ts`.
- Add new visual grounds in `data/grounds.ts`.
- Change timers and difficulty copy in `constants/game.ts`.
- Adjust scoring behavior in `lib/gameUtils.ts`.
- Update leaderboard sorting in `lib/leaderboardUtils.ts`.

## License

This project is private by default. Add a license file before distributing or publishing it publicly.
