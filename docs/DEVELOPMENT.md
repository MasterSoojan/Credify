# Development and extension guide

## Local workflow

1. Read `brain.md`, this guide, and the relevant installed Next.js documentation.
2. Install the locked dependencies with `npm ci` on Node 24.
3. Start with service flags off. The demo and basic scanner require no backend.
4. Make a focused change. Keep unrelated refactors out of it.
5. Run the tests that protect the changed behavior, then `npm run check`.
6. Format with `npm run format`, inspect the diff, and run `npm run format:check`.
7. For UI changes, exercise keyboard/mobile/dark states and run `npm run test:e2e`. For server/config changes, run `npm run build`.

## Adding a local check

1. Add or update the request/result schema in `lib/verification/contracts.ts` only if the contract changes.
2. Implement the rule in a pure module under `lib/verification/`. It must not use environment variables, fetch, browser storage, or provider SDKs.
3. Explain the observed property, the reason it matters, and its limits. Quote the relevant excerpt where possible. Do not infer fraud from absence in a registry or a public email address.
4. Add tests covering a representative positive, an ordinary input, misleading/ambiguous wording, and the boundary that previously failed.
5. Wire the rule into `reviewLocally`. Keep presentation in the scanner components.
6. Update `REVIEW_VERSION` in `lib/verification/contracts.ts`, help text, and limitations when semantics change. The shared constant versions server and browser results consistently.

Do not add a number to make a report look precise. A numerical score needs a labeled evaluation set, a documented calibration process, and an explicit meaning before it becomes a product feature.

## Adding an API route

Use this sequence for a custom mutation:

```text
same-origin check
→ bounded body read and schema validation
→ verified user, if needed
→ authorization / shared quota
→ business operation
→ consistent no-store response
```

Use `ApiError` for expected failures and `apiError` at the route boundary. Never return raw upstream messages. Put provider code in a server-only module. Add tests for denied access and failed dependencies, not only the happy path.

`readJson` counts streamed bytes even if Content-Length is missing or false. Choose a limit appropriate to the payload. Do not expose a server-side URL fetch just to inspect a submitted link: that would add an SSRF boundary the current product does not need.

Cookie-authenticated custom mutation routes require an Origin matching `SITE_URL`. Non-browser callers must supply that header and any required session cookies; it is not an authorization substitute.

## Adding a page or component

- Prefer a Server Component for static text, metadata, and data fetching.
- Add a client boundary only for state, events, or browser APIs.
- Reuse `Button`, `ButtonLink`, `Field`, `Notice`, `PageIntro`, and `TextLink` when they fit.
- Use `InformationPage` for an article with the shared sidebar. Keep the article itself explicit in its route; a CMS abstraction is not needed yet.
- Define colors through semantic CSS tokens. Add feature-specific styles in `styles/` instead of another long set of inline design decisions. Import local styles from `app/layout.tsx` so Next tracks them directly; keep their existing order before `globals.css`. Leave only the Tailwind package import in `globals.css`.
- Follow [DESIGN.md](DESIGN.md) for palette roles, responsive layouts, and interaction requirements. In the scanner, invalidate results when their input changes and keep focus transitions working.
- Use real links for navigation, buttons for actions, and associated labels for fields. A clickable div is not an accessible button.
- Include empty, loading, error, cancelled, unavailable, and success states where relevant.
- Give every visible action a destination or behavior. Do not add a payment, download, approval, or “verified” claim before it exists.

## Database changes

Add a new timestamped migration. Do not rewrite an applied migration or reset a hosted database. The three original short-numbered migrations are historical inputs; the hardening migration removes their unsafe policies and treats seeded companies as pending.

Every new private table needs an ownership model, grants, RLS policies, and cross-user tests. RLS alone does not restrict columns or protect a privileged service-role client. Minimize privileged operations and derive their target from verified identity.

Use `tests/integration/rls.test.ts` to exercise real PostgreSQL permissions without a Docker dependency. Then test the full local Supabase stack when available. Hosted policy inspection remains a separate deployment gate.

## Comments and documentation

Comment why something exists, the invariant it protects, or a non-obvious failure mode. The recovery proof, bounded body reader, quota reservation, file sniffing, and profile provisioning are examples. Avoid narrating ordinary JSX or copying a function name into a comment.

When behavior changes, update its nearest documentation:

| Change                          | Documentation                                                      |
| ------------------------------- | ------------------------------------------------------------------ |
| Env flag or external service    | `.env.example`, `OPERATIONS.md`, privacy text if data flow changes |
| Endpoint or result schema       | `API.md`                                                           |
| Trust boundary / data retention | `SECURITY.md`, `ARCHITECTURE.md`, relevant product copy            |
| New command or test             | `README.md`, `TESTING.md`, CI                                      |
| Product availability            | `STATUS.md`, roadmap/help pages                                    |
| UI roles and interaction        | `DESIGN.md`, `USER_GUIDE.md`, screenshots in `STATUS.md`           |
| Upload or handoff process       | `UPLOAD.md`, `README.md`                                           |

## Deliberate simplicity

Prefer one clear module over a general framework for a hypothetical second provider. Avoid global client state until state truly needs to span routes. Keep UI and domain logic separate, but do not create pass-through service/repository layers. Add a queue only after measured synchronous constraints require one. Reuse concepts, not superficial similarities.

The existing Android binaries are retained artifacts. Do not imply that changes to this repository validate or update their source code.
