# Environment and operations

## Two supported operating modes

**Local/offline core:** all three service flags are false. No Supabase or Gemini key is needed to build the app, render the core pages, or run basic checks. The reading feed is an optional server-side fetch with a short timeout and a visible fallback.

**Connected services:** explicitly enable each service after configuring and verifying it. Hosted Supabase is currently paused. Preparing configuration and local migrations does not resume it; do not enable hosted services until the owner is ready and the release checks below pass.

## Environment reference

Start from `.env.example`. Never commit a populated `.env.local`.

| Variable                        | Purpose / requirement                                                                                                                                                                                                                       |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `SITE_URL`                      | Exact browser origin, including scheme and port. Used for mutation-origin checks and auth links. Default local origin is `http://localhost:3000`. Production must use HTTPS.                                                                |
| `CREDIFY_AUTH_ENABLED`          | Explicit `true` to enable account services; requires valid Supabase configuration and a recovery secret. Production also requires the shared limiter.                                                                                       |
| `CREDIFY_AI_ENABLED`            | Explicit `true`, plus available accounts, Gemini key, and shared limiter.                                                                                                                                                                   |
| `CREDIFY_REGISTRY_ENABLED`      | Explicit `true`, plus Supabase configuration. This is independent of user account UI.                                                                                                                                                       |
| `NEXT_PUBLIC_SUPABASE_URL`      | Supabase endpoint. Retained name for compatibility; not a secret.                                                                                                                                                                           |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public API key, protected by grants/RLS. It must never be a service-role key.                                                                                                                                                               |
| `SUPABASE_SERVICE_ROLE_KEY`     | Server-only key used solely for verified account deletion. Without it, deletion is unavailable.                                                                                                                                             |
| `AUTH_COOKIE_SECRET`            | Unique, random server-only secret of at least 32 characters. Signs session-bound recovery capabilities. Generate with `openssl rand -base64 48`; store in the host’s secret manager. Rotating it invalidates pending recovery capabilities. |
| `GEMINI_API_KEY`                | Server-only provider key. A key alone never enables AI.                                                                                                                                                                                     |
| `GEMINI_MODEL`                  | Model identifier. The legacy default is `gemini-2.5-flash`; verify availability for the actual provider project before enabling AI.                                                                                                         |
| `CREDIFY_AI_DAILY_LIMIT`        | Global daily provider request cap, integer 1–10000, default 100. Shared by document/text analysis and the assistant. This is a call cap, not an exact currency budget.                                                                      |
| `UPSTASH_REDIS_REST_URL`        | HTTPS Redis REST endpoint supporting `EVAL`; required for production account mutations and all AI calls.                                                                                                                                    |
| `UPSTASH_REDIS_REST_TOKEN`      | Server-only bearer token for the limiter.                                                                                                                                                                                                   |

After changing flags, restart the application. Service availability is checked server-side; never replace it with a public flag that bypasses an API guard. Configure external provider billing limits as well as application quotas.

## Local Supabase

Docker is required for the full local Supabase stack. It is not required for `npm test`: the policy tests use PGlite. Docker was not available in the implementation environment, so the full local Auth/email stack still needs a real local smoke run.

```bash
npx supabase start
npx supabase db reset --local
npx supabase status
```

`db reset --local` recreates only the local database. Do not run an unqualified reset against a hosted project. Copy the local API URL and keys into your uncommitted environment file. Use `SITE_URL=http://localhost:3000` consistently in the browser and local Auth configuration; `localhost` and `127.0.0.1` are different origins.

The local config enables email confirmation, a 12-character minimum password, and custom confirmation/recovery templates. Open the local email viewer on port 54324 to follow test emails. The app verifies the current password itself for signed-in password changes; the local provider’s optional additional password-change challenge is off. If enabling that provider option later, implement its challenge/nonce UX first.

The legacy migrations create example companies. The forward hardening migration makes them pending and therefore invisible to anonymous registry queries. No seed automatically approves an employer.

## Hosted migration sequence

1. Keep account, registry, and AI flags off while preparing the environment.
2. Once the hosted project is resumed, inspect its applied migrations, actual policies/grants, profile uniqueness, and any schema drift. Existing deployments may differ from this repository.
3. Back up the database. Rehearse the upgrade against a restored isolated database, including existing Auth users and profiles. Resolve any duplicate/corrupt legacy identities before applying the new constraints or backfill.
4. Apply **new** migrations in order. Do not reapply the original public-policy migration to a live database. Do not treat a passing local policy test as proof that hosted grants match.
5. Verify anonymous and two-user access using the actual API roles. Confirm new signup provisioning and the Auth/profile deletion cascade.
6. Configure Auth URLs and email templates, then exercise the full account checklist in `TESTING.md`.
7. Enable accounts and registry separately. Enable AI only after the shared limiter, provider model, privacy configuration, timeout, and spending controls have been tested.

The table names and existing Auth UUIDs are preserved. The historical `trust_score` column remains for compatibility but is not public or used by the application. Company review requires a manual controlled process; this release does not include an approval UI. Approving a row requires verified evidence, a method, timestamps, and a future expiry. Do not approve sample data as a production shortcut.

## Email confirmation and recovery

Copy `supabase/templates/confirmation.html` and `supabase/templates/recovery.html` into the corresponding hosted Auth templates. The links use `TokenHash` and the server’s `/auth/confirm` route. Set the Auth Site URL to the deployment’s `SITE_URL` and explicitly allow the callback/update URLs. These templates are required for the recovery capability flow; the provider’s default browser-fragment recovery link is not interchangeable.

The confirmation endpoint only accepts `signup` and `recovery`. It verifies the one-time token with Auth. A recovery link creates a signed 15-minute capability bound to the current user and access token, then redirects to `/reset-password/update`. A normal PKCE callback only signs in; a caller-supplied `next` value cannot grant recovery permission. Expired/consumed links return to a clear error state. Email-security scanners can consume one-time links; test the actual mail provider and avoid link rewriting where possible. See [Supabase’s email template guidance](https://supabase.com/docs/guides/auth/auth-email-templates).

## Build and deployment

```bash
npm ci
npm run check
npm run format:check
npm run build
npm start
```

Use a Node-capable Next.js host. The verification route has a 45-second configured duration with a shorter provider deadline; chat has a 35-second duration. Confirm that the host honors these durations and accepts a JSON request up to 3 MiB. Uploaded files are capped at 2 MiB decoded; base64 increases transport size. Do not switch to Edge to bypass a timeout. If larger documents are later required, design private temporary storage and lifecycle cleanup explicitly.

The current CSP constrains framing, object embedding, base URLs, and form destinations. It is not a nonce-based script policy. Security headers are defined in `next.config.ts`; test them at the deployed edge because host configuration can modify them.

CI uses read-only repository permissions and no provider secrets. It checks formatting, lint/types, tests, production build, and browser journeys. Creating the workflow file does not mean a hosted GitHub run has already succeeded.

## Monitoring and rollback

Collect structured completion events (request ID, method, input type, latency) and safe error categories. Configure host alerts for elevated 5xx rates, provider timeouts, quota failures, and spend. Never add raw submitted content to logs to debug a failed scan.

To contain an incident, turn off the affected service flag. Basic browser checks continue to work. Roll back application code only to a compatible version. **Never roll back to the old public user policies.** Database changes should be corrected with a forward migration after reviewing data integrity.

Account deletion is irreversible. Recovery capabilities expire after 15 minutes. Provider JWTs may remain valid until their configured expiry after ordinary session revocation; test the selected Auth policy and avoid promising immediate invalidation of every stolen access token.
