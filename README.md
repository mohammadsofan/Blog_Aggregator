# Blog Aggregator (gator)

Small CLI for aggregating RSS/Atom feeds, storing posts in Postgres via Drizzle ORM, and simple user/feed management.

**Key files**

- `src/index.ts`: CLI entrypoint and command registry.
- `src/lib/db/schema.ts`: database schema (users, feeds, feed_follows, posts).
- `src/lib/configurations/config.ts`: reads/writes `~/.gatorconfig.json` (DB URL + current user).
- `src/helpers/scrapeFeeds.ts`: feed scraping + post insert logic.
- `src/api/feed.ts`: RSS fetch + parse.

## Requirements

- Node.js (v18+ recommended)
- PostgreSQL accessible from your machine
- `npm` to install dependencies

## Install

```bash
npm install
```

## Prepare configuration

The CLI expects a small config file at `~/.gatorconfig.json` with at least a `dbUrl`. Example:

```json
{
  "dbUrl": "postgres://postgres:postgres@localhost:5432/gator?sslmode=disable",
  "currentUserName": ""
}
```

Create it with (bash / WSL):

```bash
cat > ~/.gatorconfig.json <<'EOF'
{
  "dbUrl": "postgres://postgres:postgres@localhost:5432/gator?sslmode=disable",
  "currentUserName": ""
}
EOF
```

Notes:

- `dbUrl` must point to a running Postgres instance the app can reach.
- The app may overwrite `~/.gatorconfig.json` when you run `register` or `login` because those handlers call `setUser()`.

## Database migrations

This project uses `drizzle-kit`. The migrations config reads the `dbUrl` from your config file, so ensure `~/.gatorconfig.json` is present before running.

```bash
npm run generate   # generate migrations (drizzle-kit)
npm run migrate    # run migrations against the DB
```

## Running the CLI

You can run commands via `npm start -- <command> [args...]` or directly with `tsx`.

Examples:

```bash
# register a new user (also writes config currentUserName)
npm start -- register alice

# log in as an existing user (writes config currentUserName)
npm start -- login alice

# list users
npm start -- users

# add a feed (requires logged-in user)
npm start -- addfeed "Feed Name" "https://example.com/rss.xml"

# run the aggregator (collects feeds periodically, e.g. every 60s)
npm start -- agg 60s

# browse posts for current user (show up to N posts)
npm start -- browse 10

# follow/unfollow feeds (requires logged-in user)
npm start -- follow https://example.com/rss.xml
npm start -- unfollow https://example.com/rss.xml

# list all feeds
npm start -- feeds

# list feeds current user is following
npm start -- following
```

Notes about commands

- Commands that require a logged-in user are wrapped by `middlewareLoggedIn` which reads `currentUserName` from `~/.gatorconfig.json` and injects the `User` into handlers.
- If `~/.gatorconfig.json` is missing or `currentUserName` is empty, commands that rely on a user will fail.

## Troubleshooting & tips

- If the CLI complains about DB connectivity, verify `dbUrl` and that Postgres is running and accessible.
- `src/CommandsRegistry.ts` and `src/commandsRegistry.ts` are duplicates; keep one to avoid confusion.
- There are a few small issues to be aware of (typos and query composition) in `src/lib/db/queries/feed_follows.ts` and others — I can open PRs to fix them if you want.

## Next steps I can help with

- Run the migrations and create a test user/feed.
- Fix small bugs and consolidate duplicate files.

---

Created by the project assistant — ask me to run migrations or try an example command.
