# Security boundaries

This document describes implemented controls and their limits. It is not a certification or a substitute for reviewing the deployed infrastructure.

## Identity and authorization

- A localStorage value is never identity. Legacy preview profile values are cleared rather than imported into real accounts.
- Every protected Route Handler validates the user through Supabase Auth. Cookie clients are created per request; no authenticated singleton is shared across users.
- Cookies are HttpOnly, SameSite=Lax, path-scoped, and Secure in production. Server code writes refreshes through the SSR cookie adapter.
- Custom mutation requests require an explicit Origin matching `SITE_URL`. Authentication and authorization are separate checks.
- RLS limits profiles to their owner. Column grants limit profile edits; an authenticated user cannot change their ID, sign-in email, or user ID through the table.
- Recovery permission is a signed, short-lived capability tied to the verified user and session token. A plain user-ID cookie or redirect parameter cannot grant it.
- Deletion requires current credentials and derives its target from the verified session. Auth deletion cascades to the profile.

Ordinary JWT revocation follows Supabase’s token lifetime semantics. `getUser()` checks current identity but is not a promise that every signed-out access token is immediately unusable. Account deletion and password/session changes need a hosted smoke test before release. Never expose the service-role key to a browser or use it for ordinary user reads.

## Data and provider boundaries

Basic scanner input stays in the browser. Optional AI input crosses an explicit consent boundary into the server and Google Gemini. Raw inputs and reports are not intentionally persisted by this app. Provider and hosting retention are separate and must be reviewed for the deployment.

The JSON reader counts streamed bytes instead of trusting Content-Length. Schemas cap fields and reject unknown ones. Files require supported MIME values, valid base64, a decoded size limit, and matching format signatures. No submitted URL becomes a server-side fetch.

Gemini receives untrusted material as content, separate from system instructions. A validated schema constrains output shape, and text warnings must quote text actually submitted. These controls do not solve prompt injection or hallucination. Every result retains limitations. The contract has no safe/verified state or numerical probability; model-generated prose can still be wrong and is never proof of identity.

Paid calls fail closed when the shared limiter is unavailable. The Redis script atomically checks per-user and global windows before incrementing them. Each attempted paid request consumes its reservation even if the provider fails, preventing retry loops from bypassing spend limits. The configured daily cap is a call count; provider billing caps remain necessary.

## Database migration boundary

The original SQL granted public profile access. The new migration explicitly revokes those policies and API grants, adds owner policies and column restrictions, provisions profiles transactionally, and excludes pending/expired company records.

Tests use PostgreSQL RLS execution with anonymous and separate user roles. They prove the checked-in migration’s behavior in an isolated database. They cannot prove that an existing hosted database has no additional grants, policies, triggers, extensions, or drift. Inspect those before enabling services.

## Logs, browser safety, and headers

Expected errors return public messages. Unexpected-error logs contain an error class, not the raw exception. Scan completion logs contain an ID, type, source, and latency. Never log a request body, email, file, cookie, provider response, or credential.

React renders findings as text, not injected HTML. The former free-form Markdown report renderer is removed. Submitted links are displayed as text; users are not asked to open an untrusted address as part of a check.

`next.config.ts` disables the framework signature and sets nosniff, frame denial, referrer restrictions, permission restrictions, and a limited CSP. The CSP does not restrict script execution with nonces; adding that is a separate rendering/security design task. Test final headers behind the actual host/CDN.

## Reporting and operational response

Keep application vulnerability reports private and minimal. The product security page directs preview users to the person who shared the app, because no verified public support address was supplied. Before a public launch, set up a real support/security contact and update the operator/privacy information.

For an incident, disable the affected feature flag, preserve safe operational metadata, and review the affected provider/account. Do not restore the original public policies as a rollback. Do not automatically rotate a public Supabase key to address an RLS error: fix and verify the authorization policy.

The existing APK binaries are a separate trust boundary. Checksums help identify files; they do not certify their safety. This work did not audit Android source or the binary behavior.
