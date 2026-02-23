# Candidate Task: Transfers Monitoring Dashboard

## Context

You are given a **fully working** Nuxt 3/Vue 3 dashboard MVP for transfer monitoring.

You are **not expected** to finish missing product features at home.
Your goal is to review the implementation and be ready to improve it during a live coding session.

## What you need to do before the interview

1. Run the project locally.
2. Review architecture and data flow.
3. Identify potential improvements and trade-offs.

## Setup

```bash
cd transfers-dashboard-interview
yarn install
yarn dev
```

App URL: `http://localhost:3011`

Optional checks:

```bash
yarn lint
yarn build
```

## Current MVP features

- Transfers table with local JSON dataset.
- Search and status filtering.
- Client-side pagination.
- Status counters and status badges.
- Transfer details panel.
- Component-based UI structure with composable-driven state.

## Live coding session (1 hour)

During the session, we will pick one main improvement together (and optionally a second one if time permits), for example:

- sync dashboard state with URL query params,
- improve pagination architecture,
- add tests for filtering/pagination logic,
- improve sorting/accessibility/error-state behavior.

## What we care about in the session

- quality of reasoning and trade-offs,
- safe refactoring on an existing codebase,
- code clarity and maintainability,
- communication while collaborating.
