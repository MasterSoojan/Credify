# Delivery record

Updated September 27, 2026. This records the implemented repository and observed checks, not a claim that hosted integrations have been deployed or verified. The original audit remains in [IMPLEMENTATION_PLAN.md](../IMPLEMENTATION_PLAN.md).

## Delivered

| Area               | Current behavior                                                                                                                                                                                                                                                                       |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Product and design | Redesigned public routes with shared buttons, fields, notices, layout patterns, semantic color tokens, mobile navigation, light/dark themes, and explicit loading/error/unavailable states. Removed fabricated activity, metrics, testimonials, and inactive purchase/install actions. |
| Basic scanner      | Offer text, email-domain, and URL-structure checks run in the browser without uploading input. Reports explain findings, supporting excerpts, next steps, and limits. No numeric safety score or “safe” verdict. Demo content is labeled.                                              |
| Optional AI        | Structured Gemini output, bounded inputs/files, MIME/signature checks, explicit processing consent, authentication, atomic shared quotas, deadlines, cancellation, and errors that cannot turn into invented success. Disabled by default.                                             |
| Accounts           | Request-scoped cookie authentication, confirmation and recovery callbacks, profile editing, actual password updates, sign-out, and authenticated account deletion with password reauthentication. Disabled while the backend is paused.                                                |
| Database           | Forward migration removes public profile access, limits owners to permitted profile columns, provisions profiles through an Auth trigger, preserves existing Auth IDs, and requires current approval evidence for public company records. Existing example companies become pending.   |
| Registry           | Real query paths for approved, unexpired records with runtime response validation. Clear unavailable/no-record states; a company record never authenticates a recruiter. No employer approval dashboard.                                                                               |
| Maintenance        | Shared runtime schemas, pure review logic, separate provider/database boundaries, consistent formatting, strict lint/types, focused regression tests, and a CI workflow. Removed unused dependencies, components, old Tailwind configuration, and tracked generated build information. |
| Documentation      | Rewritten README and brain.md; architecture, extension, operations, API, security, and testing guides. Code comments explain the sensitive boundaries and non-obvious failure cases.                                                                                                   |

## Verification evidence

The local implementation environment uses Node 26.7.0, within the declared supported range. `.nvmrc` and CI select Node 24. A remote CI run has not been executed here.

| Check                        | Observed result                                                                                                                                                                                                                                                                 |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run check`              | Passed: zero lint warnings/errors, TypeScript passed, 73 tests across nine files passed.                                                                                                                                                                                        |
| `npm run test:e2e`           | Passed: 12 Chromium tests against the production build, covering local reviews, disabled APIs, security headers, public routes/navigation links, mobile navigation, dark mode, and axe checks on core pages and review results. The earlier development-server run also passed. |
| `npm run build -- --webpack` | Production compilation, type validation, page generation, and tracing passed.                                                                                                                                                                                                   |
| `npm run build`              | Passed with the default Turbopack bundler after clearing the generated cache. The earlier cached local-worker port error was resolved.                                                                                                                                          |
| `npm audit`                  | Zero known vulnerabilities reported for the final lockfile. This is an advisory check, not proof of application security.                                                                                                                                                       |

Tests used mocked providers and embedded PostgreSQL policy evaluation. They made no Gemini calls and did not resume or mutate hosted Supabase. Browser tests explicitly disabled connected services. Automated accessibility checks are not a complete screen-reader or accessibility audit.

## Visual review

The production UI was inspected at desktop and mobile sizes in light and dark themes. Saved review images: [desktop home](images/home-desktop.png) and [dark mobile scanner](images/scanner-mobile-dark.png). Local production smoke checks found no browser page errors or mobile horizontal overflow. The served-header regression test verifies the authentication redirect policy at the HTTP boundary.

## Implementation decisions after the original plan

- Basic checks run on-device, allowing useful guest access without a paid provider or account service.
- Numeric scoring remains excluded until a separately evaluated scoring model exists.
- The app uses server-managed session cookies and account APIs. It has no authenticated Server Component reads or browser Supabase client, so no Proxy is needed for the current refresh strategy.
- Small document requests use strictly bounded JSON/base64 and a 2 MiB decoded limit. Private storage, background jobs, and multipart transport are deferred until a measured requirement justifies them.
- Report history and avatars were excluded instead of keeping browser-only imitations. No raw offer/report persistence was introduced.
- The existing Android downloads remain separate experimental artifacts with checksums. Their source, privacy behavior, and security were not reviewed by this web-app work.
- Employer onboarding, subscription billing, and the browser extension remain explicitly planned. They require their own product and verification work.

## Before enabling hosted services

Hosted Supabase is still paused. No migration was applied there. Docker was unavailable, so the complete local Supabase Auth/email stack was not exercised either. These gates remain open:

1. Resume the intended backend when the owner is ready. Inspect actual schema/policy drift, back up data, and rehearse the forward migration against an isolated copy before applying it.
2. Run real anonymous/two-user API checks and the connected account checklist in [TESTING.md](TESTING.md), including email delivery, recovery, session refresh, reauthentication, and deletion.
3. Verify the chosen Gemini model, document handling, shared Redis quotas across application instances, provider privacy settings, and billing limits using controlled fixtures.
4. Verify the production host's HTTPS cookies, exact origin, headers, request limits, route deadlines, logs, alert delivery, and backup/rollback procedure. Set a real private support/security contact before a public launch.
5. Review the preview's privacy/terms copy for the actual operator, audience, vendors, and jurisdiction before representing it as a public production service.

See [OPERATIONS.md](OPERATIONS.md) for configuration and rollout order. Keep feature flags off until their corresponding checks pass. A green local suite does not close these live-integration gates.
