# React Native Assignment Notes

This app is intentionally incomplete. Your task is to finish the Orders feature using the existing shared architecture.

## Tasks to implement
- Render orders list using shared `useOrdersQuery`
- Connect status filter using Zustand store
- Persist selected status filter via storage abstraction
- Implement loading / empty / error / retry states
- Add pull-to-refresh using React Query `refetch`
- Navigate from list screen to order details screen
- Render order details using shared `useOrderDetailsQuery`
- Implement cancel action using shared `useCancelOrderMutation`

Main files:
- `src/screens/OrdersListScreen.tsx`
- `src/screens/OrderDetailsScreen.tsx`
- `src/stores/ordersFilterStore.ts`
- `src/platform-rn/storage/storage.ts` (persistence abstraction)

## Where shared hooks/contracts live
- Shared package: `packages/shared`
- Query hooks:
  - `packages/shared/src/query/orders/useOrdersQuery.ts`
  - `packages/shared/src/query/orders/useOrderDetailsQuery.ts`
  - `packages/shared/src/query/orders/useCancelOrderMutation.ts`
- Contracts:
  - `packages/shared/src/contracts/http-client.ts`
- Repository:
  - `packages/shared/src/data/orders/orders.repository.ts`

## Persistence note
- Default persistence uses in-memory adapter through `src/platform-rn/storage/storage.ts`.
- Optional MMKV adapter example: `src/platform-rn/storage/mmkvAdapter.example.ts`.

## Reference implementation
Use `apps/web` as the behavior reference for list/details pages and loading/error/empty/retry handling.

## Mobile test coverage gate
The repository includes a dedicated RN coverage command:

```bash
pnpm --filter @orders/mobile-rn test:coverage:check
```

This command is part of the mobile quality gate and must pass.

## iOS setup note
If `run-ios` fails with missing `Pods` files, run:

```bash
pnpm --filter @orders/mobile-rn ios:pods
```

Native iOS bootstrap in this repository uses Swift `AppDelegate.swift` (React Native default runtime, not SwiftUI).
