# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # start dev server (Vite, default port 5173)
npm run build     # type-check + production build
npm run preview   # serve the production build locally
```

There are no tests and no linter configured.

## Environment

Requires a `.env` file at the repo root:

```
VITE_AUTH_URL=https://auth.business.shawi.app
```

`VITE_AUTH_URL` is the PropelAuth deployment URL. It must be set or the app throws at boot. The PropelAuth tenant must have `http://localhost:5173` registered as an allowed origin for local dev to work without CORS errors.

## Architecture

This is a **client-only** React + Vite + TypeScript app — no backend, no API calls. All data persists to `localStorage` under the key `shawi-branches`.

### What it does

White-label website builder for Shawi laundry-delivery franchise partners. Each **Branch** represents one partner's site instance and gets a customized marketing page published to a subdomain like `miami-store.shawi.app`.

### Routing (`src/App.tsx`)

`BrowserRouter` lives inside `App`, not in `main.tsx`. All routes except `/preview/:subdomain` are implicitly protected — `App` is wrapped with PropelAuth's `withAuthInfo` HOC and redirects to login if `isLoggedIn` is false.

| Path | Purpose |
|------|---------|
| `/` | Branch management dashboard (`BranchesView`) |
| `/editor` | Visual site editor for the active branch (`Editor`) |
| `/preview/:subdomain` | Public — renders the live template for a given subdomain |
| `/preview` | Active branch draft preview |
| `/privacy`, `/terms` | Renders the active branch's page content |

### State management

Two Zustand stores, both in `src/store/`:

**`useBranchStore`** is the source of truth. It owns the full array of `Branch` objects and `activeBranchId`, and is the only thing that reads/writes `localStorage`. Every mutation (create, delete, switch, config update, publish) calls the internal `persist()` helper.

**`useSiteConfigStore`** is a derived view — it mirrors the active branch's `config` field and exposes per-section update helpers (`updateBranding`, `updateContent`, etc.). It never touches `localStorage` directly; it delegates all writes to `useBranchStore.updateActiveBranchConfig`. It stays in sync via a `useBranchStore.subscribe()` call at the module level.

**Important:** Always write config through `useSiteConfigStore`'s section helpers. Never call `useBranchStore` directly from editor components.

### Data model (`src/types/index.ts`)

`Branch` has two config fields:
- `config` — the live draft, mutated by the editor
- `publishedConfig` — a snapshot taken at publish time (used to detect unpublished changes and to render the public preview)

`SiteConfig` has six top-level sections: `branding`, `content`, `pages`, `settings`, `social`, `publishing`.

Images and PDFs are stored as **base64 data URLs** directly inside the config object (no file upload endpoint exists yet). This can make the `localStorage` blob large.

### Editor structure

`src/components/Editor.tsx` renders a two-pane layout: a sidebar with six section tabs and a live preview iframe. Each tab maps to a section component in `src/components/sections/`. Section components call the matching `useSiteConfigStore` updater on change.

### Template

`src/template/SiteTemplate.tsx` is the public-facing marketing page template. It receives a full `SiteConfig` prop and renders a fixed layout. It loads heading and body fonts dynamically from Google Fonts via injected `<link>` tags. The template is also rendered inside the editor preview pane.

### i18n

Editor UI strings are in `src/i18n/index.ts` — all four languages (en, es, fr, pt) are bundled inline, no backend loading. The active language is driven by `config.settings.primaryLanguage` and synced in `App.tsx` via `i18n.changeLanguage()`. The template has its own separate i18n setup in `src/template/i18n.ts`.

### Auth

PropelAuth (`@propelauth/react`) is initialized in `src/main.tsx` with `<AuthProvider>`. `App` uses `withAuthInfo` to gate all routes. To get a bearer token for future API calls, call `useAuthInfo()` inside any component and use `getAccessToken()` (preferred over the static `accessToken` as it returns a fresh token if expired).
