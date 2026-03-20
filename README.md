> ⚠️ **Most important submission rule:** do **not** open a Pull Request in this repository. Fork (or copy) this project, do your work there, and submit a **PR with your mobile changes diff** so we can review exactly what you changed.
> 🔐 If your test repository is private, grant access to GitHub account: **`artemmanaienko`**.

# React Native Technical Assignment

## Assignment
You are given an existing monorepo where:
- `web` already implements the full Orders feature
- shared business/data logic already exists
- `mobile-rn` app runs but the Orders feature is intentionally incomplete

Your task is to implement the missing React Native part without breaking architectural boundaries.

## What You Must Implement
In `apps/mobile-rn`, implement the Orders feature end-to-end:
- Orders list screen
- Order details screen
- Navigation from list to details
- Status filter wiring via Zustand
- Persist selected filter via provided storage abstraction
- Pull-to-refresh on list screen
- Loading, empty, error, retry states
- Cancel order action on details screen via shared mutation hook

Use shared logic from `@orders/shared`:
- `useOrdersQuery`
- `useOrderDetailsQuery`
- `useCancelOrderMutation`

## Constraints
- Do not move business/data logic from `packages/shared` into RN app
- Do not call `fetch`/`axios` directly inside RN screen components
- Keep server state in React Query
- Keep UI state in Zustand (or local state only when truly local)
- Keep the code readable and pragmatic

## Expected Result
After your implementation:
- RN app runs on iOS and Android
- Orders list works with filter + refresh + all states
- Order details works with all states
- Cancel order updates UI correctly and keeps query data consistent
- Architecture boundaries are preserved

## Timebox
Expected implementation time: **2-4 hours**.

## Evaluation Criteria
- Ability to work inside an existing codebase
- Respect of architecture boundaries
- Correct state management (React Query + Zustand)
- Correct error/loading/empty/retry handling
- Code clarity and practical decisions

## Candidate Setup Requirements
- Node.js 20+
- pnpm 9+
- Ruby + Bundler (for iOS pods installation)
- React Native environment:
  - Android: Android Studio / emulator or device
  - iOS (macOS): Xcode / simulator

## Setup & Run
Install dependencies:

```bash
pnpm install
```

Run mock API:

```bash
pnpm dev:api
```

Run web reference app:

```bash
pnpm dev:web
```

Run React Native Metro:

```bash
pnpm dev:rn
```

Run RN app:

```bash
pnpm --filter @orders/mobile-rn android
# or
pnpm --filter @orders/mobile-rn ios
```

For iOS, CocoaPods will be installed automatically by the `ios` script.
The first iOS run may take several minutes.
If needed, run pods manually:

```bash
pnpm --filter @orders/mobile-rn ios:pods
```

Run tests:

```bash
pnpm test
```

Run mobile quality gate:

```bash
pnpm test:mobile-coverage
```

This command must pass.

Run full monorepo coverage gate:

```bash
pnpm test:coverage
```

This command runs coverage checks for `shared`, `web`, and `mobile-rn`.

Run type checks:

```bash
pnpm typecheck
```

## Mock API
Base URL: `http://localhost:4000`

Endpoints:
- `GET /orders`
- `GET /orders/:id`
- `POST /orders/:id/cancel`

Notes:
- Artificial response delay: 300-700ms
- Error simulation: add `?fail=true` or run with `FORCE_ERROR=true`

## Repository Structure (Short)
- `apps/api-mock` - local mock backend
- `apps/web` - complete reference implementation
- `apps/mobile-rn` - candidate implementation target
- `packages/shared` - shared domain/contracts/data/query layer

## Additional Notes
- UI polish is not a priority
- Using AI coding tools is allowed but a developer is the one who is responsible for provided code, decisions, bugs and incompletions
- If something is unfinished, leave clear notes in code/README
