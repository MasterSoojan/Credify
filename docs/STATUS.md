# Delivery record

Updated September 28, 2026. This records the implemented repository and observed checks, not a claim that hosted integrations have been deployed or verified. The original audit remains in [IMPLEMENTATION_PLAN.md](../IMPLEMENTATION_PLAN.md).

## Visual restoration — September 28, 2026

Local checkpoint `4d0e300` preserves the complete green/cream implementation with its detailed commit message. The follow-up restores the original indigo/cyan/slate identity from `d077f90`, including navy `#0A0F1C`, bold sans-serif headings, the shield and `Credify.` wordmark, rounded cards, app/browser colours, and restrained decorative glows. The current working page flows and honest content remain intact. No API, provider, authentication, or database logic changed in this visual pass.

The default production build, lint, TypeScript, all 73 unit/API/PostgreSQL tests, and all 12 production browser tests passed again. An additional local browser review exercised eight page/result states at 375, 768, and 1440 pixels in both themes (48 combinations), with no horizontal overflow, page errors, or axe WCAG 2 A/AA and 2.1 AA violations. System-theme selection and manual override persistence passed in both directions. Final checks also passed for 320-pixel layouts, keyboard skip navigation, and visible scanner error states in both themes. These additional checks were a one-off review using the existing tools, not 48 new committed tests.

Measured solid-colour foreground/background pairs: primary action text 6.46:1 in both themes; body text 17.04:1 light / 17.46:1 dark; muted text 7.25:1 light / 7.27:1 dark; brand accent 6.18:1 light / 10.56:1 dark against the page canvas. These measurements cover the named pairs, not every possible combination or a complete accessibility certification.

The local checkpoint and visual restoration can be pushed together. No push, deployment, or hosted-service change was performed.

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

The production UI was inspected at desktop and mobile sizes in light and dark themes. Saved review images: [light desktop home](images/home-desktop.png), [dark desktop home](images/home-desktop-dark.png), [dark mobile home](images/home-mobile-dark.png), and [dark mobile scanner](images/scanner-mobile-dark.png). The earlier green/cream images remain available in checkpoint `4d0e300`. Local production smoke checks found no browser page errors or mobile horizontal overflow. The served-header regression test verifies the authentication redirect policy at the HTTP boundary.

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
