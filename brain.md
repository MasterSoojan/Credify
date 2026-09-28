# Credify — project context

Keep this file concise and factual. Detailed maintenance guidance lives in `docs/`; do not duplicate it here.

## Product

Credify helps job seekers take a second look at offer text, email domains, and links. Basic analysis runs in the browser. It presents findings, next steps, and explicit limitations; it never labels an opportunity safe or publishes an uncalibrated percentage.

Employer verification is a separate concern from content review. A company record cannot authenticate the person who shares its link. Employer onboarding, subscriptions, and the browser extension remain planned features, not working products.

## Current environment

- Hosted Supabase is paused, as confirmed by the owner. Do not resume it or perform hosted mutations as part of routine development.
- Account, AI, and registry flags default to off. The core UI and basic scanner work without keys.
- Stack: Next.js 16.3.6 / React 19 / TypeScript / Tailwind 4 / Supabase / Google GenAI SDK.
- Use Node 24 and `npm ci`. Installed Next.js docs are authoritative for framework APIs.
- `IMPLEMENTATION_PLAN.md` records the original audit and implementation direction. `docs/STATUS.md` is the current delivery record.

## Architecture invariants

- Keep routes thin, domain analysis pure, provider access server-only, and runtime input schemas shared.
- No global Supabase client carrying authentication state. `lib/supabase/server.ts` creates clients per Route Handler request.
- Browser components access accounts through same-origin APIs. Auth tokens stay in HttpOnly cookies; localStorage is never identity or authorization.
- Server Components do not read authenticated sessions. Route Handlers refresh and write cookies, so this architecture does not need a Proxy for cookie refresh. If authenticated Server Components are introduced, revisit this decision using the installed Next/Supabase guides.
- Basic checks must not upload input. Optional AI requires explicit opt-in, an authenticated user, and a shared quota before a provider call.
- Submitted links are parsed, never fetched. Submitted files are bounded and checked before provider use; they are not saved.
- A provider error is an error, never a fabricated assessment. Valid JSON is not proof of factual correctness.
- Never log document text, full submitted emails, passwords, tokens, or raw provider errors. A non-public env-variable name alone does not guarantee secrecy.
- The verification route uses Node. Changing to Edge does not solve request deadlines or provider latency.
- Add forward database migrations. Test anonymous access and cross-user access. Do not treat seed rows as reviewed employers.

## Maintenance

Owner preference, September 28, 2026: preserve the original UI's colours and visual identity. The green/cream implementation is preserved in local checkpoint `4d0e300`. The [visual restoration](docs/UI_RESTORATION_PLAN.md) returns indigo/cyan accents, slate surfaces, navy `#0A0F1C`, and bold sans-serif headings using `d077f90fb891148d9a56132044786d71c2a34a79` as reference. Retain this identity alongside the improved architecture, functionality, accessibility, and security boundaries. Pushing remains the owner's next step.

Read `docs/DEVELOPMENT.md` before adding features. Prefer existing UI primitives and semantic CSS tokens. Keep comments focused on constraints and reasons; avoid comments that simply restate the next line.

Before completing a change, run the relevant tests and `npm run check`. Run the production build for server/configuration changes and browser checks for user-facing changes. Never claim a hosted integration was verified by mocked tests or PGlite alone.
