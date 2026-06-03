# Dev Log — Easy Attendance

A personal account of how this got built. Not polished. Just honest.

---

## Entry 1 — How It Started

### April 12, 2025

My church needed a better way to count attendance during services. The existing process was manual — counters writing numbers on paper, someone adding them up after the fact. It worked, but was kinda stressful and time consuming. I was contracted to build something better.

The brief was simple: multiple counters should be able to submit attendance from their phones during a service, and whoever was running the admin side could see everything in real time on a laptop. No apps to install, no accounts to create. Just open a link and start counting.

I said yes. I had 30 days and a plan.

The stack I picked: Node.js + Express on the backend, React + TypeScript on the frontend, Supabase for the database, and Socket.io for the real-time layer. It made sense on paper. Supabase is fast to set up, has a generous free tier, and I'd used it before.

I set up the folder structure, initialised the server, got a `/health` endpoint returning `{ status: "ok" }`, and called it a good first day.

---

## Entry 2 — The Database Problem

### Mid-April, 2025

About a week in, I hit a wall I should have seen coming.

The app was always meant to run on a local network — one laptop as the server, every counter connecting over the church's WiFi. No internet required. That was the whole point: churches in Nigeria don't always have reliable internet during services, and depending on it felt like building on sand.

The problem is Supabase needs the internet. The entire backend I'd built was pointing at a cloud database that wouldn't be reachable in an offline environment. I had to scrap it and go local.

I switched to `better-sqlite3`. It's fast, it's synchronous, it's well-documented. It worked fine in development. Then I realized if the app was to go fully local, it might as well be a desktop app so other churches could download it and use, so I started wrapping the app in Electron.

It broke.

`better-sqlite3` is a native Node module — it compiles binaries tied to a specific Node version and architecture. Electron ships its own Node runtime, and it didn't match. I spent more time than I'd like to admit trying to get electron-rebuild to fix it. It didn't.

So I switched to `sqlite3` — the older, callback-based package. That worked for a while. Then it started throwing errors after packaging that I couldn't reliably reproduce in development. Debugging a packaged Electron app is its own kind of pain.

At this point I'd burned through two SQLite libraries and was losing confidence in the approach. I needed something with better tooling, better error messages, and ideally something that would handle the schema for me instead of raw SQL strings.

I added Prisma.

---

## Entry 3 — Prisma, Twice

### Late April, 2025

Prisma 7 was the latest version at the time. I set it up, defined the schema, ran the migration, and things looked fine at first. Then I started hitting issues with how Prisma 7 handled the native SQLite bindings inside an Electron environment — specifically around how the `.prisma` client gets generated and where it expects to find the binary at runtime.

I won't pretend I fully understood every error (If I'm being honest, I barely understood any). I read through GitHub issues, tried different configuration approaches, adjusted the `extraResources` in the electron-builder config to make sure the Prisma client was bundled correctly. Some things got better. Some things didn't.

Eventually I downgraded to Prisma 6.

It worked.

I don't know if it was a Prisma 7 bug, an electron-builder quirk, or something specific to my setup. What I know is that Prisma 6 with `sqlite3` as the underlying driver, bundled correctly with electron-builder, ran without issues on Windows, and that was enough.

The schema stayed simple: services, sections, attendance submissions. Prisma handled migrations cleanly, the client was typed, and I stopped fighting the database layer.

---

## Entry 4 — Building the Thing

### Late April – May, 2025

Once the database stopped being a problem, the actual product came together faster than I expected.

The architecture is straightforward: Electron is the shell, it starts an Express server on a local port when the app opens, and that server does everything — REST endpoints for services, sections, attendance, and CSV export, plus Socket.io for the real-time layer. Counters open a browser on the same WiFi network, hit the local IP, and get a mobile-optimised form. The admin dashboard is served from the same Express server and updates live as submissions come in.

The counter UI was the most important screen to get right. It needed to work on any phone without confusion — someone who's never seen the app should be able to open it and start counting without being told how. I kept it simple: input your section, enter the numbers, submit. Loading state, success state, reset. That's it.

The dashboard was more involved. Services needed to be created and activated one at a time — only one active service at a go. Sections were manageable from the dashboard. The attendance table showed live totals broken down by section, and historical services were accessible so you could go back and check a previous week's numbers. CSV export let you pull a report at the end of a service.

I ran a full simulation with multiple devices on Day 27. Everything worked.

---

## Entry 5 — Then the Church Didn't Use It

### May, 2025

I finished the app. It worked. I handed it over.

They didn't end up using it.

I don't have a dramatic reason for that. These things happen. Projects get built, circumstances change, the organisation moves in a different direction. I wasn't bitter about it — I'd learned a lot building it, I enjoyed myself (yes, despite the nasty bugs) and the work was real.

But I didn't want to just let it sit on my machine.

The problem it solves is real. Other churches need exactly this kind of tool. Other developers might want to build something similar and would benefit from seeing how it's put together. The database journey alone — Supabase to better-sqlite3 to sqlite3 to Prisma 7 to Prisma 6 — is worth documenting so someone else doesn't have to go through all of it.

So I open-sourced it.

---

## What's Next

The codebase is live. There are things I'd still like to improve:

- Docker setup so the development environment is reproducible regardless of machine
- Counter UI polish — spacing, readability, edge cases
- Dashboard UI polish — better hierarchy, cleaner layout
- A proper demo GIF in the README

If you're reading this and you want to contribute, start with the [CONTRIBUTING guide](./CONTRIBUTING.md). If you're a church or organisation thinking about deploying it, the README has everything you need.

— Victory
