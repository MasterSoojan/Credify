# Credify implementation plan

**Visual follow-up:** [Restore the original UI and colours](docs/UI_RESTORATION_PLAN.md). Implemented on 2026-09-28 after preserving the green/cream UI in local checkpoint `4d0e300`. The original indigo/cyan/slate identity is restored on the improved application. The owner will push the commits later.

This is the **historical audit and proposed sequence** prepared on 2026-09-27, before the implementation. The findings below describe the original code, not the current application. The owner subsequently authorized the redesign and implementation. See [delivery status](docs/STATUS.md) for what was delivered, current validation, deliberate scope decisions, and remaining release gates. Original estimates are planning estimates, not recorded effort.

Supabase is currently paused, as confirmed by the project owner. It remained paused throughout planning and implementation. Use a local Supabase instance or an isolated test database for development and policy tests; provider doubles can cover application behavior but cannot validate RLS. Hosted authentication, schema/policy inspection, and end-to-end database validation depend on the project being resumed. Connection failures while paused are an environment condition, not evidence of an application regression.

**Recommended direction**

Make the candidate journey dependable first: submit an email or offer, receive an explanation supported by available evidence, and manage an account securely. Keep the existing Next.js/Supabase/Gemini stack and improve it incrementally. Treat employer identity verification as a separate milestone with its own ownership checks and review process.

The immediate priority is data access and truthful results. Visual consistency, architecture cleanup, and additional features follow those fixes.

**What the review established**

| Priority | Finding and evidence                                                                                                                                                                                                                                                                                  | Consequence                                                                                                                                                          |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| P0       | [User RLS policies](supabase/migrations/02_security.sql) permit public select, insert, update, and delete using unconditional predicates.                                                                                                                                                             | If applied with the expected API grants, private profile records are accessible and mutable without ownership checks. Live database configuration was not inspected. |
| P0       | Supabase client (original `lib/supabase.ts`, since removed) is a module singleton; [login](app/api/login/route.ts) returns user details without establishing a browser session; [login UI](app/login/page.tsx) stores only an email in localStorage.                                                  | The UI has no trustworthy session, and server authentication state is not isolated by request.                                                                       |
| P0       | [Account deletion](app/api/delete-account/route.ts) accepts an email and user ID without checking the caller, and deletes only `users_custom`.                                                                                                                                                        | A caller can target another profile under the checked-in policies; the actual Supabase Auth account survives deletion.                                               |
| P0       | [Instant verification](app/instant-verify/page.tsx) checks only for `scam`, `fake`, or `phish` substrings and labels everything else safe.                                                                                                                                                            | The feature can give false reassurance without checking a threat source.                                                                                             |
| P0       | [Verification API](app/api/verify/route.ts) converts failed AI calls into a normal response with a score of 35 and “High Risk”; scores are parsed from free text.                                                                                                                                     | An unavailable service is presented as a completed assessment. Output has no validated evidence contract.                                                            |
| P0       | [Verification](app/api/verify/route.ts) and [chat](app/api/chat/route.ts) lack application-level rate limits, strict request schemas, and explicit input/cost limits.                                                                                                                                 | Public callers can invoke paid providers with uncontrolled requests.                                                                                                 |
| P1       | [Password settings](app/settings/page.tsx) send a new password to an API that only sends a recovery email; that API redirects to an absent `/reset-password/update` page.                                                                                                                             | Password change reports success without changing the password; recovery cannot complete through the intended route.                                                  |
| P1       | [Document domain extraction](app/api/verify/route.ts) truncates on common character sequences: `hr@company.co.uk` becomes `com`, and `hr@linkedin.com` becomes `lin`.                                                                                                                                 | Domain matching is unreliable. This was reproduced locally with the existing helper logic.                                                                           |
| P1       | Scanner UI (original `components/VerificationForm.tsx`, since removed) advertises MX, domain-age, blacklist, signature, and alteration checks that the API does not perform. [Company seed data](supabase/migrations/03_seed_data.sql) supplies arbitrary high scores.                                | The UI suggests stronger evidence than the system has collected. A domain match also cannot authenticate the sender of a pasted email.                               |
| P1       | [Profile](app/profile/page.tsx) persists in browser storage; [registry search](app/search/page.tsx) has no search action; pricing (original `components/home/Pricing.tsx`, since removed), [extension](app/browser-extension/page.tsx), and [footer](components/Footer.tsx) include inactive actions. | Several advertised journeys are incomplete.                                                                                                                          |
| P2       | [README](README.md) and [brain.md](brain.md) describe Next.js 14, although the project pins 16.2.4. They claim sanitization that is absent; README references a missing SQL setup file.                                                                                                               | Future work can follow incorrect assumptions.                                                                                                                        |

Local baseline:

- `tsc --noEmit --incremental false`: passed.
- ESLint: 59 errors and 48 warnings. Of these, 3 errors and 1 warning come from ignored local `scratch/` files; the remaining 56 errors and 47 warnings are in project files. Common findings include unused code, explicit `any`, unescaped JSX text, effect state updates, and random values during render.
- `npm run build`: failed because `next/font/google` could not fetch Inter from Google Fonts in this environment. A production build has therefore **not** been verified; this result does not establish an application compilation defect.
- No automated test suite or CI workflow was found in the reviewed repository files.
- No live accounts, provider requests, or database mutations were exercised. APK files exist in `public/`, but their source and behavior were not reviewed. Browser accessibility and performance remain to be measured.

**Scope for the first release**

Include secure accounts, functional profile/password management, bounded email/document analysis, honest uncertainty and error states, usable mobile navigation, and operational monitoring. Offer limited guest scans only when shared abuse controls are available. Save report history only by explicit user choice.

Keep URL verification unavailable until a real provider is integrated. Keep registry search and employer onboarding clearly marked as unavailable or preview until their milestone is complete. Defer subscriptions, browser extension implementation, mobile-app development, crowdsourced reports, and advanced document forensics. Existing app-download and demo pages must accurately describe what is available.

These are planning defaults, not established product requirements. They keep the first release achievable without expanding every marketing page into a separate product.

**1. Contain access risks and misleading behavior — P0, approximately 1–2 engineering days**

- Prepare a new forward migration removing unconditional policies from `users_custom`. Allow authenticated users to read and update their own row using `auth.uid() = id`, with appropriate `USING` and `WITH CHECK` conditions. Restrict sensitive columns separately; RLS alone does not limit which columns an owner can change. Profile creation should use a controlled provisioning path. See [Supabase RLS guidance](https://supabase.com/docs/guides/database/postgres/row-level-security).
- Check the actual database policies/grants in the intended environment before rollout. Test the migration against a local or isolated database, including anonymous access and two separate users. Preserve existing records and migration history.
- Disable account deletion until authenticated ownership checks and real Auth deletion exist. Disable paid AI calls until request limits and a shared rate limiter are in place, or gate them behind a restricted preview.
- Remove the keyword-based “safe” URL verdict. Replace invented scan stages with progress descriptions tied to actual work. Return an unavailable/unknown outcome when a required provider fails, with no fabricated score.
- Label demo data explicitly, prevent demo company seeds from being applied to production, and remove unsupported live-threat and verification claims from enabled journeys.

Acceptance: anonymous users cannot access private profiles; user A cannot read or mutate user B; disabled services cannot be invoked by calling their API directly; unavailable scans cannot display a completed safety verdict. Coordinate policy rollout with the auth work below: the existing public user-ID-to-email lookup will stop working after RLS is corrected.

**2. Establish a maintainable baseline — P1, approximately 2–3 days**

- Fix lint errors and remove unused code without blanket rule suppression. Exclude intentionally local scratch scripts from lint and stop tracking generated TypeScript build information in a later cleanup change.
- Add explicit typecheck and test scripts, plus CI for lint, typecheck, focused tests, and production build. Add local Supabase configuration and isolated fixtures so paused hosted infrastructure does not prevent auth/RLS development. Next.js 16 builds do not run lint automatically, as documented in the installed [installation guide](node_modules/next/dist/docs/01-app/01-getting-started/01-installation.md).
- Pin a supported Node runtime compatible with Next.js and dependencies. Add a sanitized `.env.example`, allow it through `.gitignore`, and validate required configuration server-side. Document public Supabase keys separately from Gemini/admin credentials.
- Correct README and brain.md: actual stack versions, migration paths, implemented versus planned features, and deployment assumptions. Missing `NEXT_PUBLIC_` does not by itself guarantee that a secret cannot leak through logs or responses. Prompt sanitization is not a guarantee against prompt injection.
- Make font availability reproducible, using a properly licensed local font or an intentionally supported build-network dependency. Verify the production build after this decision.
- Audit installed dependencies and their advisories before choosing upgrades. Remove unused packages after confirming references; candidates include Mongoose, bcrypt, Vision, whoiser, pdf-lib, and form-data. Reassess whether the Supabase CLI belongs in development dependencies.

Acceptance: a fresh checkout has documented setup, passes the quality commands, and builds in the intended CI environment. No source secrets appear in examples, browser output, or diagnostic responses.

**3. Complete identity and account flows — P0/P1, approximately 3–5 days**

- Replace `lib/supabase.ts` with separate browser and request-scoped server clients using `@supabase/ssr`. Use cookie-backed sessions and a Next.js 16 `proxy.ts` for refresh. Verify identity again in protected server operations; a redirect or localStorage value is not authorization. Follow [Supabase’s Next.js SSR setup](https://supabase.com/docs/guides/auth/server-side/creating-a-client?queryGroups=framework&framework=nextjs) and the installed [Next.js authentication guide](node_modules/next/dist/docs/01-app/02-guides/authentication.md).
- Implement confirmation/callback handling, expired-session behavior, and actual Supabase sign-out. Protect profile/settings reads and writes; keep personalized responses out of shared caches.
- Make signup/profile provisioning reliable when email confirmation is enabled. Handle profile insert failures explicitly, use collision-safe identifiers, and preserve the original password rather than trimming it during signup.
- Prefer email sign-in initially. If existing user-ID sign-in must remain, implement a bounded server-only lookup with rate limiting and generic failures; do not restore public profile reads.
- Implement two distinct flows: recovery request → validated recovery link → new password; and signed-in password change with appropriate reauthentication. Success must mean the password actually changed.
- Add persistent profile fields to the existing schema without an unnecessary table rename. Treat account email changes as an Auth verification flow. Validate profile/avatar uploads and enforce ownership in storage if avatars remain in scope.
- Implement authenticated account deletion with recent identity verification, server-only privileged credentials, and cleanup of Auth, profile, avatar, and saved reports. Handle partial failures and retries. Do not accept the deletion target from arbitrary request-body identity fields.
- Clear obsolete browser identity/profile data on migration and logout; do not silently import untrusted localStorage into an authenticated profile. Validate the Origin of cookie-authenticated custom mutation endpoints and enforce appropriate CSRF protection.

Acceptance: signup/confirmation/login/refresh/logout work across reloads; protected routes reject expired or forged sessions; two users cannot share profile state; recovery and settings password changes work; deleting an account removes its data and prevents further protected access under the chosen session-revocation strategy.

**4. Make verification explainable and reliable — P0/P1, approximately 4–6 days**

- Keep route handlers thin. Extract input validation, domain normalization, provider calls, registry lookup, and result construction into `lib/verification/`. Put Gemini integration and validated configuration in server-only modules.
- Define a shared request schema discriminated by scan type and a result schema containing a server-generated request ID, assessment state, optional score, summary, evidence, limitations, checked time, and model/prompt/scoring versions. Keep identity status separate from content risk.
- Replace regex extraction of AI scores with Gemini structured output and server-side schema validation. Reject malformed or out-of-range values. Structured output constrains format, not factual correctness; evaluate the resulting evidence independently. See [Gemini structured output documentation](https://ai.google.dev/gemini-api/docs/structured-output).
- Correct domain handling with proper email/URL parsing and explicit international-domain, subdomain, trailing punctuation, and public-suffix rules. Never infer registry membership through a substring match. State that a pasted address cannot establish sender ownership.
- Start with evidence categories and clear limitations. Publish a numerical TrustScore only after defining its inputs and validating it on labeled fixtures. A model-generated number should not be displayed as a calibrated probability of safety.
- Add server-side text length, chat length, upload byte, decoded file size, MIME/signature, and supported-file limits. Reject malformed JSON/base64 and unsupported scan types before provider calls. Account for base64 expansion and the hosting platform’s request limits.
- Prefer bounded multipart uploads for the initial small-file flow; use private temporary storage only if measured platform constraints require it. Put file reads inside the UI error/finally path, support cancellation, and handle encrypted/unreadable documents explicitly.
- Set a total request deadline, bounded retries for transient failures, and a retry budget. Preserve the Node runtime unless there is a demonstrated need to change it. The current API forwards file data to Gemini; it does not locally parse PDFs. Switching to Edge does not fix an unbounded call. Consult the installed [runtime](node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/02-route-segment-config/runtime.md) and [duration](node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/02-route-segment-config/maxDuration.md) guides against the selected host.
- Apply shared per-user/guest limits and global provider spending caps to scan and chat endpoints. Avoid an in-memory-only limiter for multiple server instances. Use safe public errors and redact email addresses, documents, and model payloads from logs.
- Treat uploaded documents and chat messages as untrusted content. Separate system instructions from submitted material, prohibit document instructions from changing the assessment contract, and test prompt-injection attempts. Do not describe this as a solved sanitization problem.
- Explain third-party processing before submission. Default to not retaining raw documents; define temporary cleanup and report-retention rules before adding persistence.

Acceptance: provider timeout/failure produces an explicit unavailable result; malformed input never reaches a provider; oversize uploads are rejected predictably; an unlisted company is not automatically labeled fraudulent; retries cannot exceed the deadline/budget; all shown evidence can be traced to an actual check. Evaluate known legitimate, scam, ambiguous, and adversarial fixtures and record false positives/negatives before enabling numeric scoring.

**5. Finish the candidate experience — P1/P2, approximately 3–4 days**

- Restructure the scanner into input, upload, progress, error, and result components. Preserve user input after recoverable failures. Use a stable request/report ID rather than `Math.random()` during rendering.
- Introduce a small set of shared buttons, fields, alerts, cards, and page containers. Consolidate spacing, colors, font variables, and Tailwind v4 configuration; resolve the current Inter/Arial/Geist inconsistency.
- Keep static page content in Server Components and limit client boundaries to interactive controls. Add appropriate error/loading/not-found states. Avoid broad directory moves unrelated to the current feature.
- Fix mobile account navigation, keyboard access to menus and upload controls, form label associations, icon-button names, focus handling, status announcements, contrast, and reduced-motion behavior.
- Wire every visible action to a working journey or clearly mark it unavailable. Replace placeholder privacy/terms/security links with reviewed pages or working contact paths. Identify demo content and unsupported metrics throughout the site.
- Treat the Dev.to integration as an attributed news feed, with typed responses, status/error handling, caching, and timestamps. Do not present generic articles or the hardcoded ticker as live threat intelligence.
- If report history is included, store only user-approved reports, enforce owner-only access, add pagination and deletion, and display the assessment/version timestamp. Otherwise remove history promises for this release.
- Improve chatbot HTTP error handling, cancellation, and accessibility. Consider streaming only after limits and error semantics work; measure whether it improves perceived latency.

Acceptance: a user can complete scanning and account tasks on mobile and keyboard alone; primary actions work; loading/errors are understandable; theme changes remain consistent; user-specific data never appears in another account. Measure baseline bundle size, accessibility, and page responsiveness, then verify improvements against that baseline.

**6. Verify and release the candidate MVP — P1, approximately 2–3 days**

Testing is added with each preceding change; this milestone integrates and rehearses the release.

| Layer    | Required coverage                                                                                                                                                                                   |
| -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Unit     | Domain normalization, schema validation, uncertainty/scoring rules, deadlines and retry decisions.                                                                                                  |
| API      | Malformed requests, unauthenticated mutations, oversize/invalid files, provider failure, malformed provider output, quota exhaustion, and safe error responses. Use provider doubles in routine CI. |
| Database | Anonymous/user A/user B ownership checks for every private table/storage policy; clean migration application and upgrade from the existing schema.                                                  |
| Browser  | Signup/confirmation, login/logout, recovery, password change, profile persistence, scan success/failure, keyboard/mobile use, and account deletion.                                                 |
| Staging  | Controlled real-provider smoke tests, configured email redirects/delivery, concurrency, upload limits, provider latency/cost, and no sensitive data in logs.                                        |

- Add structured request IDs, route latency, provider failure counts, validation failures, quota rejections, and cost metrics. Alert on sustained failures and spend thresholds without collecting submitted document contents.
- Configure deployment environments separately. Add deliberate security/cache headers in `next.config.ts` and validate them against actual scripts and assets; stage a Content Security Policy in report-only mode before enforcing it.
- Rehearse migration ordering, backups, rollback, and service feature flags. A rollback must not restore permissive user policies. Once hosted Supabase is resumed, check schema drift and actual grants/policies before deployment, then run the deferred hosted integration checks.

Release gate: all applicable acceptance criteria pass; CI/build are green; access-control tests pass against the deployed staging policies; enabled features accurately describe their evidence; provider outage and account recovery are usable; monitoring and rollback are documented.

**7. Add real URL and employer verification — separate post-MVP milestone**

Estimated 7–12 additional engineering days for an initial implementation, excluding provider procurement and manual verification operations.

- Integrate a URL reputation provider after evaluating coverage, permitted commercial use, latency, privacy, and cost. Normalize inputs and record provider/timestamp evidence. “No threats reported” is not a guarantee that a link is safe. Avoid fetching arbitrary submitted URLs; if later required, implement explicit SSRF and redirect/DNS defenses.
- Extend the company schema with canonical domains, public slugs, verification status, verification method, evidence timestamps, expiry/review dates, and revocation. Separate private evidence from public registry fields.
- Implement employer membership/roles, domain-control proof, and a review process for claimed company identity. Domain control alone is not proof of every corporate claim.
- Build a working `/search` and `/verify/[slug]` using only approved public records. Support pending, verified, expired, and revoked states and display what was checked.
- Establish reporting/review/revocation procedures. A copied link to a real company does not authenticate the person sharing it; recruiter authorization requires a separate identity binding and product design.
- Revisit subscriptions, browser extension, Android distribution, and broader threat signals only after this milestone has a working end-to-end journey.

Acceptance: a normal user cannot approve an employer; another employer cannot modify its record; revoked/expired records lose their verification status; public pages expose no private reviewer evidence; copied company links do not produce an authenticated-recruiter claim.

**Delivery order and estimates**

Implement phases 1 → 2 → 3 → 4 → 5 → 6, adding regression tests in the same changes as the behavior they protect. Keep each pull request reviewable: containment and honest results; baseline/configuration; sessions and profile policies; recovery/deletion; verification contracts and limits; candidate UX; release validation. Split these further when needed.

The candidate MVP estimate is approximately **17–26 focused engineering days for one developer**, assuming local Supabase can be provisioned and provider access is available. This excludes time waiting for hosted Supabase to resume before release validation. This is a planning range, not a delivery commitment. External email/provider setup, real-data migration, and verification-quality evaluation can extend it. Start with the P0 containment change before cosmetic refactoring.

Before implementation reaches a dependent feature, confirm whether there are existing production users/data, the intended deployment platform and upload limits, guest-scan policy and AI budget, report retention requirements, and whether candidate scanning or employer verification is the launch priority. These do not block preparing the initial fixes, but they affect rollout and later milestones.
