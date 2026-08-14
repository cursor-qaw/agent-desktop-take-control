# AGENTS.md

## Cursor Cloud specific instructions

This repository is a single client-side **Create React App** (CRA, `react-scripts` 5.0.1, React 19) to-do application. There is no backend, database, or external service — all state is in-memory in the browser.

### Services

| Service | Command | Notes |
| --- | --- | --- |
| Dev server | `npm start` | Serves the app at http://localhost:3000. Long-running; run it in a background/tmux terminal, not in the install step. Set `BROWSER=none` to prevent CRA from trying to open a browser. |
| Tests | `CI=true npm test` | Jest + React Testing Library. `CI=true` forces a single non-interactive run (otherwise it launches interactive watch mode). |
| Lint | (runs automatically) | ESLint (`react-app` config) runs as part of `npm start` and `npm run build`; there is no standalone lint script. |
| Production build | `npm run build` | Outputs to `build/`. Not needed for development. |

### Non-obvious notes

- Dependencies are installed with `npm ci` (a `package-lock.json` is committed). This is the update-script step and does not need to be repeated manually.
- The app has no persistence: todos reset on page refresh. This is expected behavior, not a bug.
- `npm test` without `CI=true` blocks in interactive watch mode; always use `CI=true npm test` in an automated/agent context.
- Do NOT run `npm ci` while the dev server (`npm start`) is running. `npm ci` wipes `node_modules` first and then fails with `ENOTEMPTY` on `node_modules/.cache/babel-loader` (held open by the running dev server), leaving `node_modules` corrupted (e.g. `react-scripts: not found`). Stop the dev server first, then run `npm ci`. The startup update script (`npm ci`) is safe because it runs before any service starts.
