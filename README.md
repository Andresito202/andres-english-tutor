# Andres English Tutor

Andres English Tutor is a browser-based English practice application for Spanish-speaking learners. It combines an AI speaking tutor, microphone input, browser text-to-speech, guided lessons, quizzes, local progress tracking and a Supabase Edge Function layer that protects the Gemini API key outside the public frontend bundle.

## Product Goal

The project is designed as an interactive learning tool, not as a static landing page. The user can practice short English speaking exercises with an AI tutor named Andres, listen to responses aloud, complete vocabulary modules and track learning progress from the browser.

## Core Experience

### AI Speaking Tutor

- Conversational tutor powered by Google Gemini through Supabase Edge Functions.
- System instruction focused on short answers, pronunciation practice and repeat-after-me exercises.
- Microphone input with the Web Speech API.
- Audio playback with `SpeechSynthesisUtterance`.
- Browser diagnostics panel for microphone, voices, speech synthesis and audio state.
- AI usage bar that displays monthly token consumption and pauses chat when the monthly limit is reached.

### Guided Learning Path

- Level and module structure for beginner English practice.
- Lesson cards with Spanish meaning, English phrase, pronunciation aid, IPA field and audio text.
- Module quizzes with immediate feedback.
- Local progress persistence with `localStorage`.
- Supabase SQL foundation prepared for remote progress, quiz attempts, learning events and chat history.

## Technical Architecture

```text
src/
  components/
    AIUsage/       Monthly AI usage indicator
    Chat/          AI tutor, voice controls and diagnostics
    Learning/      Levels, modules, lessons, quizzes and progress UI
  data/            Static learning module definitions
  hooks/           Learning progress and audio-related hooks
  services/        Gemini/Supabase communication layer
  styles/          Responsive design system
  utils/           Anonymous client fingerprint for usage tracking
supabase/
  functions/
    gemini-chat/        Secure Gemini proxy with token accounting
    ai-usage-status/    Public usage summary for the UI
  migrations/           SQL schema, RLS, seeds, functions and AI usage limits
.github/
  workflows/
    deploy.yml          GitHub Pages deployment workflow
```

## Stack

- React 18
- Vite 5
- JavaScript
- Google Gemini API
- Supabase Edge Functions
- Supabase PostgreSQL
- Row Level Security
- Web Speech API
- SpeechSynthesis API
- Lucide React
- ESLint
- GitHub Actions
- GitHub Pages

## Supabase Layer

The repository includes SQL migrations for a production-oriented backend foundation:

- Levels, modules and lessons.
- User profiles.
- Lesson and module progress.
- Quiz attempts.
- Chat sessions and chat messages.
- Learning events.
- AI usage configuration.
- Monthly token usage ledger.
- Atomic usage increment function for Edge Functions.
- Row Level Security policies.
- Seed data for initial learning content.

The current public demo keeps lesson progress in `localStorage`, while the Supabase schema is ready for the next step: authenticated users, remote progress and persistent chat history.

## AI Usage Control

The frontend does not need to expose the Gemini API key in production mode. Chat requests go through `supabase/functions/gemini-chat`, where the Edge Function:

- Validates message length.
- Reads global AI usage configuration.
- Checks the monthly token budget.
- Calls Gemini server-side.
- Records token usage through `andres_increment_usage`.
- Returns updated usage numbers to the UI.

`supabase/functions/ai-usage-status` returns the current monthly usage so the app can render the usage bar before the user sends a message.

## Environment Variables

Create `.env` from `.env.example`:

```bash
cp .env.example .env
```

Default production-style mode:

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_USE_DIRECT_GEMINI=false
```

Direct Gemini mode is only for local development or controlled testing:

```env
VITE_USE_DIRECT_GEMINI=true
VITE_GEMINI_API_KEY=
```

## Supabase Secrets

The Edge Functions require server-side secrets configured in Supabase:

```text
GEMINI_API_KEY
GEMINI_MODEL
```

`GEMINI_MODEL` is optional. If it is not configured, the function uses its internal fallback chain.

## Local Development

```bash
npm install
npm run dev
```

Local URL:

```text
http://127.0.0.1:3050/
```

## Quality Checks

```bash
npm run lint
npm run build
npm run check
```

`npm run check` runs lint and the production build.

## GitHub Pages Deployment

The project is prepared for a free GitHub Pages deployment.

Repository:

```text
https://github.com/Andresito202/andres-english-tutor
```

Expected public URL:

```text
https://andresito202.github.io/andres-english-tutor/
```

Deployment workflow:

```text
.github/workflows/deploy.yml
```

Required GitHub repository secrets:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

The Gemini key should be stored as a Supabase secret, not as a GitHub Pages frontend variable.

## Security Notes

- Variables prefixed with `VITE_` are bundled into public browser JavaScript.
- Production chat requests should use the included Supabase Edge Function proxy.
- The Gemini API key belongs in Supabase secrets, not in `.env` for a public build.
- Token accounting is enforced server-side through the Edge Function and SQL RPC, not by trusting the browser.
- User-generated chat text is rendered as React text nodes in the UI, avoiding direct HTML injection.

## Engineering Highlights

- Clear separation between UI components, services, hooks, data and Supabase infrastructure.
- Defensive voice handling for browser microphone and speech synthesis behavior.
- Server-side AI proxy with usage limits and token accounting.
- GitHub Pages build configured with `base: /andres-english-tutor/`.
- Automated deployment workflow with repository secrets.
- Portfolio-ready README that explains scope, architecture, security boundaries and next steps without overstating unfinished backend features.
