# Transfers Monitoring Dashboard (Standalone MVP)

A standalone Nuxt 3 project for a Middle/Senior Web Engineer interview.

## Purpose

The candidate receives a fully working MVP. During a 1-hour live coding session, they improve selected parts of the codebase.

## Stack

- Nuxt 3 (Vue 3)
- TypeScript
- Local JSON data source (`data/transfers.json`)
- Local ESLint + Prettier config

## Completed MVP scope

- Transfers table with 1500 records loaded from JSON.
- Search by key transfer fields.
- Status filter (`all`, `pending`, `processing`, `completed`, `failed`, `flagged`).
- Client-side pagination.
- Status counters.
- Transfer details panel.
- Reusable `StatusBadge` component.
- UI split into focused components.

## Current architecture

- `pages/index.vue`: page orchestration only.
- `composables/useTransfersDashboard.ts`: filtering, pagination, derived state.
- `components/dashboard/*`: presentational and interaction components.
- `types/transfer.ts`: API/UI types and status contracts.

## Project structure

- `components/dashboard/TransfersToolbar.vue`
- `components/dashboard/TransfersStatusCards.vue`
- `components/dashboard/TransfersTable.vue`
- `components/dashboard/TransfersPagination.vue`
- `components/dashboard/TransferDetailsPanel.vue`
- `components/StatusBadge.vue`
- `composables/useTransfersDashboard.ts`
- `types/transfer.ts`
- `data/transfers.json`

## Run locally

```bash
cd transfers-dashboard-interview
yarn install
yarn dev
```

Default URL: `http://localhost:3011`

## Validation

```bash
yarn lint
yarn test
yarn build
```

`yarn test` is currently a placeholder (`No tests yet`).

## Live coding scope (1 hour)

Recommended format:

- Pick 1 primary task (required).
- Pick 1 secondary task (if time permits).

Primary task options:

1. Sync `search/status/page` state with URL query params.
2. Replace client pagination with mock server-style pagination.
3. Add unit tests for filtering and pagination logic.

Primary task details:

1. URL query sync
   - Keep `search`, `status`, `page`, and `perPage` synchronized with route query params.
   - Support deep-link behavior: page should restore state from URL on reload/open.
   - Ensure state updates do not create navigation loops or noisy history updates.
   - Keep UX stable when query values are invalid or missing (safe defaults).
2. Mock server-style pagination
   - Move pagination behavior from full in-memory slicing to a mock API-like contract.
   - Return paginated payload shape (`items`, `page`, `perPage`, `total`) from a mock layer.
   - Preserve current filters/search behavior with the new paging flow.
   - Keep UI responses consistent during page transitions (no broken counts/details flow).
3. Unit tests for filtering/pagination
   - Add tests focused on composable behavior, not component snapshots.
   - Cover core scenarios: search, status filter, pagination boundaries, and page reset logic.
   - Include at least one edge case (empty results, out-of-range page, invalid status input).
   - Ensure tests are deterministic and easy to extend as new dashboard rules appear.

Secondary task options (optional, only if the selected primary task is completed):

1. Add sort controls and keep behavior stable with filters.
2. Improve the accessibility of table interactions and details panel.
3. Add error/loading state contract for future API migration.

Secondary task details:

1. Sorting controls
   - Add sorting UI for at least 2 useful columns (for example `createdAt`, `sourceAmount`, `riskScore`).
   - Keep sorting compatible with active search/filter/pagination states.
   - Define a deterministic default sort (for example, the newest first).
   - Prevent regressions: page reset behavior should be clear when sort changes.
2. Accessibility improvements
   - Ensure keyboard support for row selection and panel close actions.
   - Improve semantics/ARIA for interactive table rows and controls.
   - Make focus behavior explicit when opening/closing the details panel.
   - Validate visible focus state and basic screen-reader friendliness.
3. Error/loading state contract
   - Introduce explicit UI states for `idle/loading/success/error` around data reads.
   - Keep state handling composable-driven, not scattered across presentational components.
   - Add an error surface (inline banner/message) and retry interaction contract.
   - Keep current JSON source working while making the flow ready for API-based data later.

## Conventions

- Vue SFC block order: `<template>` → `<script>` (optional) → `<style>` (optional).
- Keep page files thin; move behavior into composables/components.
