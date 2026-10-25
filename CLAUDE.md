# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

- `npm start` — Expo dev server (`npm run web` for web only)
- `npm run android` / `npm run ios` — native dev builds (`expo run:*`; a local `android/` folder exists, so native plugins like Google Sign-In don't work in Expo Go)
- `npm run lint` — `expo lint` (no ESLint config is committed yet; first run will set it up)
- `npm run build:web` — static web export to `dist/`
- `npx tsc --noEmit` — type-check
- EAS profiles (`development`, `preview`, `production`) are in `eas.json`

There is no test setup.

## Environment

`.env` (loaded via `EXPO_PUBLIC_*` inlining) must define:
- `EXPO_PUBLIC_SUPABASE_URL`, `EXPO_PUBLIC_SUPABASE_ANON_KEY` — `src/lib/supabase/supabase-client.ts` throws at import time if missing
- `EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID` — Google Sign-In on the login screen

## Architecture

Expo SDK 57 + expo-router (typed routes, React Compiler enabled), TypeScript strict. Path aliases: `@/*` → `src/*`, `@/assets/*` → `assets/*`. UI text, error messages and comments are in French.

**Routing & auth flow** (`src/app/`):
- `_layout.tsx` is the auth gate: it loads the Supabase session into the Zustand store (`src/store/useAuthStore.ts`), listens to `onAuthStateChange`, and redirects between the `(auth)` group (login/register) and the `(main)` group based on `session`. It also handles deep links (`equigroom://...?code=`) by calling `exchangeCodeForSession` (email confirmation links).
- `(main)/_layout.tsx` uses headless `expo-router/ui` tabs (`Tabs`/`TabList`/`TabTrigger`/`TabSlot`) with a custom animated (Reanimated) bottom bar. Tab definitions live in `src/constants/tabs.constants.ts`; the layout's `TABS_COUNT` must stay in sync with that array.

**Auth store**: `setSession` also fetches the user's row from the `profiles` table (`getProfileById`) into `profile`. Login supports email/password and Google (`@react-native-google-signin` → `supabase.auth.signInWithIdToken`).

**Supabase data layer** (`src/lib/supabase/`): one file per table exposing async functions that return `RequestResponse<T>` (`{ success, data?, error? }`) instead of throwing. Rows are converted from snake_case to camelCase with `camelcase-keys`; TS models are in `src/lib/supabase/models/`.

**Forms**: `react-hook-form` + `zodResolver`, with Zod schemas and form model types in `src/schemas/`.

**Styling**: mixed — NativeWind v4 (`className`, Tailwind config in `tailwind.config.js`, CSS variables in `global.css`) and `StyleSheet` with colors from `useAppTheme()` (`src/hooks/use-app-theme.ts`). The palette is defined in `src/color-theme.ts` (`PALETTE`) and duplicated as CSS variables in `global.css` — change both together. Tailwind `content` only scans `src/app` and `src/components`. Fonts: Fredoka and Quicksand via `@expo-google-fonts`.

**SVGs**: imported as React components via `react-native-svg-transformer` (configured in `metro.config.js`, typed in `declaration.d.ts`). Platform-specific files use the `.web.tsx`/`.web.ts` suffix.
