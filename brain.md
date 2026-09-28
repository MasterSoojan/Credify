# Credify — project context

Keep this file concise and factual. Detailed maintenance guidance lives in `docs/`; do not duplicate it here.

## Product

Credify helps job seekers take a second look at offer text, email domains, and links. Basic analysis runs in the browser. It presents findings, next steps, and explicit limitations; it never labels an opportunity safe or publishes an uncalibrated percentage.

Employer verification is a separate concern from content review. A company record cannot authenticate the person who shares its link. Employer onboarding, subscriptions, and the browser extension remain planned features, not working products.

## Current environment

- Design for working Supabase services. Do not bake a temporary backend pause into product copy or UX; availability comes from configuration. The owner handles hosted project operations.
- Account, AI, and registry flags default to off. The core UI and basic scanner work without keys.
- Stack: Next.js 16.3.6 / React 19 / TypeScript / Tailwind 4 / Supabase / Google GenAI SDK.
- Use Node 24 and `npm ci`. Installed Next.js docs are authoritative for framework APIs.
- `IMPLEMENTATION_PLAN.md` records the original audit and implementation direction. `docs/STATUS.md` is the current delivery record.
- `docs/USER_GUIDE.md` explains the product; `docs/DESIGN.md` records the current UI; `docs/UPLOAD.md` covers the owner's upload and deployment handoff.

## Architecture invariants

- Keep routes thin, domain analysis pure, provider access server-only, and runtime input schemas shared.
- No global Supabase client carrying authentication state. `lib/supabase/server.ts` creates clients per Route Handler request.
- Browser components access accounts through same-origin APIs. Auth tokens stay in HttpOnly cookies; localStorage is never identity or authorization.
- Server Components do not read authenticated sessions. Route Handlers refresh and write cookies, so this architecture does not need a Proxy for cookie refresh. If authenticated Server Components are introduced, revisit this decision using the installed Next/Supabase guides.
- Basic checks must not upload input. Optional AI requires explicit opt-in, an authenticated user, and a shared quota before a provider call.
- A scanner result belongs to one submission. Input/mode edits clear it; the Edit input action preserves the draft and returns focus. Keep inputs stable during pending reviews.
- Submitted links are parsed, never fetched. Submitted files are bounded and checked before provider use; they are not saved.
- A provider error is an error, never a fabricated assessment. Valid JSON is not proof of factual correctness.
- Never log document text, full submitted emails, passwords, tokens, or raw provider errors. A non-public env-variable name alone does not guarantee secrecy.
- The verification route uses Node. Changing to Edge does not solve request deadlines or provider latency.
- Add forward database migrations. Test anonymous access and cross-user access. Do not treat seed rows as reviewed employers.

## Maintenance

Current visual preference, September 28, 2026: the owner prefers the restrained styling at https://credify-eight.vercel.app/ and explicitly rejected purple-looking buttons in both themes. Use neutral charcoal/off-white primary actions, blue/cyan headline accents, white/navy surfaces, and selective red warning text. Keep the improved Job Scanner layout. Latest UX direction: remove the Home navigation item and Verifiers dropdown. Keep Verifiers as a direct header/mobile link to `/verifiers`; remove only its dropdown. The logo links home; navigation also includes Check an offer, How it works, and Safety hub. The owner explicitly corrected removal of the Verifiers link. Explain the review with concrete input → finding → next-step examples and a visible landing-page scroll link.

Historical references: the green/cream implementation is preserved in checkpoint `4d0e300`; the [original visual restoration](docs/UI_RESTORATION_PLAN.md) used `d077f90fb891148d9a56132044786d71c2a34a79`. Current styling and interaction rules are in [DESIGN.md](docs/DESIGN.md).

Owner authorization, September 28, 2026 (latest): commit and push the completed UI/documentation work, with a detailed commit message. This supersedes the earlier hold on committing this delivery; future commits and pushes still require user authorization.

Read `docs/DEVELOPMENT.md` before adding features. Prefer existing UI primitives and semantic CSS tokens. Keep comments focused on constraints and reasons; avoid comments that simply restate the next line.

Before completing a change, run the relevant tests and `npm run check`. Run the production build for server/configuration changes and browser checks for user-facing changes. Never claim a hosted integration was verified by mocked tests or PGlite alone.
