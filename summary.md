# Net Worth & Expense Tracker — Project Summary

## Overview
A personal finance PWA that combines everyday income/expense tracking with a live net worth dashboard. Built in React so it can be installed as a PWA without needing an app-store developer license. Used across both PC and mobile, so it requires real cross-device sync — not local-only storage.

## Core Features

### Income & Expenses
- Manual entry of income and expenses
- Categorization
- Recurring transactions (rent, salary, subscriptions) to reduce manual entry fatigue

### Investments
- Multiple portfolios, each containing one or more holdings (e.g. S&P500, individual stocks)
- Each purchase recorded as its own transaction (a "lot") — cost basis + shares bought at that point
- v1 displays holdings **blended per ticker** (total shares, total cost basis, current value, gain/loss), but transactions are stored granularly so per-lot precision (tax-lot accounting, partial sells) can be added later without a data migration
- Initial "legacy" position (e.g. "I've put in €100, currently worth €130") is converted into phantom shares at the current price at entry time, so everything — old and new — is share-count × live price from that point forward
- Live pricing pulled from a stock/ETF API (Alpha Vantage or Twelve Data, free tier), called through a serverless proxy so the API key never sits in the client bundle

### Net Worth
- Net worth = savings account balances (manual) + investment value (live-priced) **− liabilities** (debts/loans — flagged as necessary for an accurate figure, not yet scoped in detail)
- Multi-currency support flagged as a likely future need if any account/investment isn't in the base currency

## Architecture

**Decision point:** cross-device use (PC + mobile) means a real backend and sync from day one — not a local-first phase to be migrated later.

- **Frontend:** React + Vite, PWA via `vite-plugin-pwa`
- **Backend/DB:** Supabase (hosted Postgres + Auth + client SDK) — avoids hand-rolling a custom API server
- **Auth:** Supabase Auth (email/password or magic link is sufficient for personal use across 2 devices)
- **Data access:** Supabase JS client talking directly to Postgres
- **Price API proxy:** Supabase Edge Function (or Cloudflare Worker) to keep the stock price API key server-side
- **Offline handling:** lighter first pass — local caching of recent data (in-memory or light IndexedDB cache), read-only or blocked editing while offline, sync on reconnect. Full conflict-resolution sync is a later-phase concern, not v1.
- **Data model:** UUID primary keys, `user_id` on every table, `created_at`/`updated_at` timestamps — standard practice for a Postgres/Supabase app, and keeps the schema normalized (portfolios, holdings, transactions, expenses as separate related tables)

## Priorities
- **v1 focus:** net worth / investment tracking solid first; expense tracking can start simpler
- Cross-device sync is a hard requirement, not a nice-to-have — this shaped the backend decision (Supabase/Postgres over local-only IndexedDB)

## Open Questions / Later Phases
- Dividend tracking (income event vs. ignored)
- Crypto support
- Budgets / spending targets per category
- Per-lot precision UI (once/if partial selling matters)
- Full offline conflict resolution (if offline use becomes frequent, not just occasional)
- Liabilities/debt tracking — needed for a truly accurate net worth figure

## Stack Summary
| Layer | Choice |
|---|---|
| Frontend | React + Vite (PWA) |
| Database | Postgres via Supabase |
| Auth | Supabase Auth |
| Price data | Alpha Vantage or Twelve Data, via serverless proxy |
| State | Zustand or Context (no Redux needed) |
| Charts | Recharts |
| Offline | Light caching + sync-on-reconnect (v1), full offline-first deferred |