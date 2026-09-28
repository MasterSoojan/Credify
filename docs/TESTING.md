# Testing and release verification

## Commands and coverage

| Command                | Evidence provided                                                                                                                                                                             |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run lint`         | Next/React/TypeScript lint rules, with no warnings accepted.                                                                                                                                  |
| `npm run typecheck`    | Current Next route types and strict TypeScript compilation.                                                                                                                                   |
| `npm test`             | Local rule boundaries, request/file validation, signed recovery capabilities, quota failures, provider output validation, account/verification API contracts, and real PostgreSQL grants/RLS. |
| `npm run build`        | Production bundling, route generation, server/client import boundaries, and prerendering.                                                                                                     |
| `npm run test:e2e`     | Browser-level core journeys, disabled-service behavior, mobile navigation, theme changes, public route/link checks, and axe checks on core pages.                                             |
| `npm run format:check` | Formatting consistency for source and documentation.                                                                                                                                          |
| `npm audit`            | Current registry advisory report for the lockfile; not a proof of application security.                                                                                                       |

Tests should protect a behavior or failure boundary. Avoid snapshots that mirror implementation details or a test for every presentational wrapper. Add a regression case for a real bug, especially when a domain parser, identity boundary, or user-visible result changes.

## Test isolation

- Unit/API tests do not call Gemini, Supabase, or Redis. Provider doubles deliberately return failures, malformed data, or denied identities.
- SQL tests instantiate PGlite, create minimal Auth/role stand-ins, apply the original migrations followed by the hardening migration, and query under real PostgreSQL roles. They cover profile provisioning, anonymous denial, owner-only access, immutable identity columns, direct mutation denial, deletion cascades, and company visibility.
- `server-only` is aliased only inside Vitest. The actual Next production build enforces the import boundary.
- Browser tests explicitly disable hosted services. They assert that basic reviews make no API upload, retain a clear unavailable state for documents/accounts, focus results, and render all public routes. Regression cases also verify that **Edit input** preserves the draft and returns focus, and that edited text/email/link values cannot retain an older report or validation error.
- Navigation cases protect direct scanner access, the Verifiers link and current-page state on desktop/mobile, absence of its dropdown, the logo’s home destination, and one-step mobile navigation. The landing journey checks the in-page walkthrough anchor clears the sticky header, follows the full guide into the demo, and produces a local review without a POST request. How it works is also included in the core axe checks.
- Browser tests use a separate port but the same Next build directory. Do not run another dev instance for this checkout simultaneously.
- Set `PLAYWRIGHT_USE_PRODUCTION=true` after building to run the same browser journeys against `next start`. CI uses this mode. In either mode, port 3100 must be free and the runner starts its own server with connected services disabled.

## What the suite does not prove

A green suite does not verify hosted policy drift, real email delivery, a real Redis service, provider model availability, a provider’s data-retention configuration, or a production host’s request/timeout limits. No test can establish that basic rules or an LLM reliably identify every scam. The Android binaries are outside the suite. The shared Next loading shell requires JavaScript to reveal streamed route content; disabling JavaScript is not a supported app mode even though the static examples are Server Components.

Automated accessibility checks are useful but incomplete. Manually use the keyboard and a screen reader on the main flows, test zoom and longer content, and inspect both themes on a narrow viewport. Do not treat zero axe violations as full accessibility certification.

## UI review matrix

For a shared-layout change, inspect home, scanner input, a result, a validation error, the safety hub, a reading page, and unavailable-service states. Test light/dark themes at 320, 375, 768, and 1440 pixels. Verify long text and reflow, current navigation, selected-tab hover, field focus, menu Escape behavior, result-to-input focus, and a persisted manual theme override. The [design reference](DESIGN.md) explains the intended behavior.

Temporary review scripts and browser reports do not belong in source control. Keep representative screenshots in `docs/images/` and record the actual matrix, dates, and limitations in [STATUS.md](STATUS.md). Before an upload, follow the repeatable commands in [UPLOAD.md](UPLOAD.md).

## Connected account smoke checklist

Run against a disposable local/staging project, never an unsuspecting user’s account:

1. Apply migrations and configure email templates/redirects. Confirm signup creates the profile within the Auth transaction.
2. Sign up, receive email, confirm, sign in, reload, expire/refresh the access token, sign out, and revisit a protected operation.
3. Use two accounts. Confirm neither can read/update/delete the other profile through both the app and the direct data API.
4. Edit a profile and reload. Confirm the Auth email/ID columns cannot be changed through the profile API.
5. Change a password with the wrong and correct current password. Verify the old password no longer signs in.
6. Request recovery. Exercise valid, expired, consumed, and tampered links. Confirm a normal callback or forged recovery cookie cannot bypass reauthentication.
7. Delete a disposable account with a wrong password, then the correct password and typed confirmation. Verify Auth and profile deletion and subsequent protected access denial.
8. Disable the account service and confirm graceful UI/API behavior without background requests to a disabled service.

## Connected AI and deployment checklist

1. Enable the intended model using non-sensitive fixtures. Verify structured output and document readability with small valid PDFs/images.
2. Test malformed output, unavailable model, provider timeout, cancellation, large files, unsupported types, and prompt-injection fixtures. None may become a successful fabricated verdict.
3. Confirm per-user and global quota caps across multiple application instances. Interrupt Redis and verify paid requests fail closed.
4. Review logs for content/credentials, including provider and hosting logs. Verify operational metrics and alert delivery.
5. Run browser journeys against the production build and target host. Verify security/cache headers, HTTPS cookies, exact Origin settings, email URLs, and route duration/body limits.
6. Inspect manual company approvals and their evidence. Expired/revoked/pending records must not be public.
7. Verify backup/rollback steps and feature kill switches. Do not restore permissive legacy database policies.

Record actual commands, environment, dates, and limitations in `STATUS.md`. Keep manual gates incomplete until they have been exercised; a mocked result is not a substitute.
