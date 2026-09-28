# Upload and handoff

The owner controls commits and uploads. The owner authorized committing and pushing this UI/documentation handoff on September 28, 2026. The current local validation record is in [STATUS.md](STATUS.md).

## Upload the source repository

1. Review `git status --short` and `git diff --check`, then inspect the source and documentation changes. Include new documentation images as well as modified files.
2. Keep source, `package-lock.json`, `.env.example`, tests, CI, migrations, templates, and documentation. The generated `next-env.d.ts` is recreated by Next; it does not need to be uploaded.
3. Keep `.env.local`, other populated environment files, private keys, `node_modules`, `.next`, caches, logs, and browser reports out of the upload. `.gitignore` covers these paths. It does not remove files that were already tracked, and it does not protect a manually zipped working directory.
4. Run the quality commands below. Review the selected files with `git diff --cached --stat` and `git diff --cached` after staging. Commit only when you are ready.
5. Confirm the intended remote and branch, then push normally. No force push or history rewrite is required for this work. The existing local checkpoints preserve the earlier UI.
6. On the repository host, inspect the uploaded README, screenshots, and CI run. A local passing suite is not evidence that the hosted workflow has run.

Example commands for the owner, after reviewing the changes:

```bash
git status --short
git diff --check
# Stage the reviewed paths, then inspect exactly what will be committed.
git diff --cached --stat
git diff --cached
git commit
# Confirm that origin and the current branch are the intended destination.
git remote -v
git branch --show-current
git push -u origin HEAD
```

The comments deliberately leave staging to the review step. Do not use `git add -f` to bypass ignore rules. If sharing a source archive, create it from your reviewed commit with `git archive --format=zip --output=/tmp/credify-source.zip HEAD`. That archive includes committed files only, so commit the intended work first. Existing Android APKs are tracked artifacts and will be included; see the separate boundary in [SECURITY.md](SECURITY.md).

## Handoff commit message

This describes the final colour, navigation, scanner, and documentation refinements together:

```text
feat(ui): clarify offer checks and refine themes and navigation

Make the first visit explain what Credify checks, show useful findings
immediately, and lead visitors into the scanner or a concrete walkthrough.

UI and navigation:
- Rebuild the landing page around a fictional offer, visible findings,
  a scroll cue, input choices, and a shared three-step example
- Redesign How it works around input, findings, and independent follow-up
- Keep Verifiers as a direct desktop/mobile link and remove its dropdown
- Remove the Home item while preserving the logo's home destination
- Use neutral buttons, blue/cyan headings, teal guidance, and red cautions
  across both themes; refine responsive spacing and reading layouts
- Fix development CSS resolution with direct stylesheet imports in the
  root layout, preserving the existing cascade order

Scanner experience:
- Add Edit input with draft preservation and keyboard focus return
- Clear stale reports and validation errors when inputs or modes change
- Prevent edits and file replacement while a review is in progress
- Clarify input modes and separate summaries, findings, next steps,
  limitations, and report actions
- Remove pause-specific service copy while retaining runtime guards

Documentation and regression coverage:
- Complete user, design, architecture, testing, operations, and upload guides
- Refresh screenshots, project context, and historical-plan signposts
- Cover direct Verifiers navigation, landing-page scrolling, walkthrough
  entry, local reviews, draft editing, and stale-result prevention

Validation:
- Lint and TypeScript passed; 73 unit/API/PostgreSQL tests passed
- Production build and all 18 Chromium browser tests passed
- Formatting, local documentation links, and staged whitespace checks passed
- 22 responsive/theme states passed overflow, page-error, and axe checks
- Sampled red text, gradient endpoints, and teal labels exceed 4.5:1 contrast

Hosted integrations and live email/provider flows remain separate checks.
```

## Verify the upload candidate

Use Node 24. Start with the three `CREDIFY_*_ENABLED` flags set to `false` in your environment. Preserve an existing `.env.local`; do not overwrite it to follow setup instructions.

```bash
npm ci
npm run check
npm run format:check
npm run build
npx playwright install chromium
PLAYWRIGHT_USE_PRODUCTION=true npm run test:e2e
```

The browser runner starts its own server on port 3100 and explicitly disables connected services. Keep that port free. On a Linux machine missing browser system libraries, use `npx playwright install --with-deps chromium`; CI already does this. For full environment details, use [OPERATIONS.md](OPERATIONS.md).

## If upload also means deploying the website

This application requires a Node-capable Next.js runtime. Uploading files to a static-only host is insufficient: the repository contains dynamic pages and Route Handlers even with connected features disabled.

Configure the host to install the lockfile, run `npm run build`, and start the Next server with `npm start` (or use the host's Next.js integration). Set `SITE_URL` to the exact public HTTPS origin. For a basic-only deployment, use:

```dotenv
CREDIFY_AUTH_ENABLED=false
CREDIFY_AI_ENABLED=false
CREDIFY_REGISTRY_ENABLED=false
```

No provider credentials are needed for the basic scanner. Configure secrets in the host's environment settings for the connected features you enable; never upload a populated local environment file with the source.

After deployment, check home and scanner in both themes, run the example, exercise the configured account/document/registry features and their unavailable states, check a mobile menu, and verify the final response headers. For a public service launch, operator/contact copy and hosting/privacy details still need review. Connected accounts, AI, and registry have additional gates documented in [OPERATIONS.md](OPERATIONS.md), [TESTING.md](TESTING.md), and [STATUS.md](STATUS.md).

## Handoff map

| Need                                             | Document                                                       |
| ------------------------------------------------ | -------------------------------------------------------------- |
| Install and run                                  | [README](../README.md)                                         |
| Use the scanner and understand its limits        | [User guide](USER_GUIDE.md)                                    |
| Change the UI consistently                       | [Design reference](DESIGN.md)                                  |
| Understand code and extend it                    | [Architecture](ARCHITECTURE.md), [Development](DEVELOPMENT.md) |
| Configure services or deploy                     | [Operations](OPERATIONS.md)                                    |
| Integrate with API routes                        | [API contracts](API.md)                                        |
| Understand privacy and access boundaries         | [Security](SECURITY.md)                                        |
| Reproduce checks and see what remains unverified | [Testing](TESTING.md), [Delivery status](STATUS.md)            |

The original [implementation plan](../IMPLEMENTATION_PLAN.md) and [UI restoration plan](UI_RESTORATION_PLAN.md) are historical records. Follow the current guides for new work.
