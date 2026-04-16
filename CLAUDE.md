# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
yarn dev        # Development server with Turbopack
yarn build      # Production build
yarn start      # Production server
yarn lint       # ESLint
yarn export     # Build + static export
```

### Mempalace (project memory)

```bash
mempalace mine <dir>          # Index project files into memory
mempalace search "query"      # Search indexed memory
mempalace wake-up             # Show project context (~600-900 tokens)
mempalace status              # Show what's been indexed
mempalace init <dir>          # Detect rooms from folder structure
```

MCP server is pre-configured in `~/.claude/settings.json` — no extra setup needed.

## Architecture

**Stack**: Next.js 15 App Router, TypeScript strict, Tailwind CSS, TanStack Query (server state), Zustand (client state), Netlify deployment.

### Tool Development Pattern

Every tool under `src/app/tools/` follows the same structure:

- `page.tsx` — client UI with form handling
- `actions.ts` — Next.js server actions (omit for client-only tools)
- `metadata.ts` — SEO/OpenGraph metadata

After adding a tool: register its route in `src/config/routes.ts` and add a `ToolCard` to `src/app/page.tsx`.

Client-only tools (e.g. HLS Player) use Zustand stores instead of server actions.

### Design System

Custom neumorphism design defined in `tailwind.config.js`. Use the existing shadow utility classes — do not inline custom shadows. Typography is DM Sans.

### HLS Player

Three pre-built HLS.js configs in `src/config/hlsConfig.ts`:
- `optimizedHLSConfig` — default, good networks (60s buffer, concurrent loading)
- `liveStreamHLSConfig` — low-latency live streams
- `conservativeHLSConfig` — slow/limited bandwidth

Player state lives in `src/stores/playerStore.ts` (Zustand). Playback history persists via `src/services/localStorage.ts`.

### Pages

- `/` — homepage tool showcase
- `/resume` — resume page (layout + page, no server actions)
- `/tools/format-converter` — server-side format conversion
- `/tools/url-to-screenshot` — server-side screenshot capture
- `/tools/hls-player` — client-side HLS video player

