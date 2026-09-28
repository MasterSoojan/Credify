# Restore Credify's original visual identity

Prepared and implemented September 28, 2026. **Status: complete.** Local checkpoint `4d0e300` preserves the green/cream UI; the original visual identity has been restored in the following change. The owner has authorized pushing these checkpoints with the final UI handoff.

This is a historical plan. Later colour and usability refinements are documented in [DESIGN.md](DESIGN.md) and [STATUS.md](STATUS.md). Its checkpoint/commit steps have already been completed; the latest owner instruction authorizes committing and pushing the completed refinements with a detailed message.

## Objective and reference

The owner wants to preserve the previous UI, especially its colours. Restore the original indigo/cyan/slate identity on the improved application, with colour fidelity taking priority over additional redesign work.

The original reference is commit **`d077f90fb891148d9a56132044786d71c2a34a79`**. Use this explicit commit after the checkpoint, because `HEAD` will then point to the new implementation. The current implementation's delivery and validation record is in [STATUS.md](STATUS.md).

The reference files establish these visual choices:

- `app/page.tsx` and `app/layout.tsx`: white/slate light surfaces, a dark page background of `#0A0F1C`, bold sans-serif headings, and soft blue/indigo/cyan background glows.
- `components/Navbar.tsx`: a shield mark, the `Credify.` wordmark, indigo light-mode and cyan dark-mode accents, and a translucent navigation surface.
- `components/Footer.tsx`: slate surfaces, indigo highlights, restrained glow and gradient decoration.
- `components/VerificationForm.tsx`: rounded cards, slate inputs, indigo/cyan active states, and prominent high-contrast action buttons.
- `components/ThemeProvider.tsx`: light/dark modes with a system preference default.

The old global stylesheet and individual pages used different dark backgrounds. Use the explicit main-page navy above as the page-canvas reference, then use slate surfaces for depth. Confirm remaining differences against the old rendered UI during implementation.

## Scope and constraints

Retain the shared components, working navigation, responsive behaviour, keyboard access, result explanations, real error states, and paused-service handling. Authentication, API contracts, local analysis, provider safeguards, database migrations, and tests remain the implementation foundation.

Use the original UI as the visual reference. Preserve the current factual product copy and feature availability. Historical percentages, simulated scan steps, live-status claims, and unsupported purchase/install actions are excluded from the visual restoration.

Keep Supabase paused. Reference capture and visual tests must run with connected services disabled. Read the installed Next.js guides before any framework changes. Typography must continue to work without build-time Google Fonts downloads; use the existing system sans-serif stack for this pass.

## 1. Establish the local checkpoint and visual references

Commit the current implementation locally before changing its visual appearance:

1. Record the new checkpoint commit and inspect the working tree for subsequent owner edits. Preserve those edits.
2. Capture the current home, scanner/results, account unavailable states, and one information page in both themes at desktop and mobile widths.
3. Compare the original files using the pinned reference commit. If old rendered screenshots are needed, use a separate temporary checkout with no copied credentials and no live account/provider calls.
4. Keep reference rendering isolated from the main checkout. An old build failure must not lead to dependency downgrades in the current application; record the limitation and use the original source as the reference.

Deliverable: a short visual inventory showing the old palette and the current elements to change. Store only useful reference images in documentation; keep temporary checkouts and build output outside the repository.

## 2. Restore colours through semantic tokens

Start in `app/globals.css`. Prefer the installed Tailwind colour variables for the original named colours, plus the explicit historical navy, rather than copying approximate hex values from a different Tailwind version.

| Role                                  | Light direction                         | Dark direction                                                 |
| ------------------------------------- | --------------------------------------- | -------------------------------------------------------------- |
| Page canvas                           | White / slate-50                        | `#0A0F1C`                                                      |
| Cards and navigation                  | White, with restrained translucency     | Slate-900 / slate-950 surfaces                                 |
| Secondary surfaces and inputs         | Slate-50 / slate-100                    | Slate-800 / slate-900                                          |
| Main text                             | Slate-900                               | White / slate-100                                              |
| Secondary text                        | Slate-600                               | Slate-400                                                      |
| Borders and dividers                  | Slate-200                               | Slate-700 / slate-800                                          |
| Brand links, icons and active accents | Indigo-600                              | Cyan-400, with indigo highlights where the reference uses them |
| Primary action background             | Indigo-600; darker hover                | Indigo-600; darker hover                                       |
| Primary action text                   | White                                   | White                                                          |
| Soft brand fills / selection          | Pale indigo                             | Low-opacity cyan or indigo on slate                            |
| Shadows and decorative glows          | Neutral/cool shadows; faint blue/indigo | Restrained cyan/indigo glows                                   |

These are reference targets, not claims that every foreground/background combination has already passed contrast testing. Choose final shades during validation.

The current `--brand` token supplies both link colour and button fill. Split the action role where necessary: for example, `--action`, `--action-hover`, and `--on-action` allow an indigo button with white text while links remain cyan in dark mode. Keep the existing canvas, surface, text, border, warning, and danger roles. Introduce only tokens that have a concrete use.

Update shared controls first, then feature styles. Audit literal colours in `app/globals.css`, `styles/*.css`, inline styles, and `app/icon.svg`; changing root tokens alone would leave the green icon and some decorative colours behind. Keep warning/error/success colours tied to their meaning, with labels and icons as well as colour.

Deliverable: a consistent original-style palette across both themes, including hover, focus, active, disabled, selection, error, and unavailable states.

## 3. Restore the familiar UI treatment

Once the palette is in place, make a bounded pass over the elements that most changed the visual identity:

1. Restore the `Credify.` wordmark treatment and indigo/cyan shield styling in the header and footer. Align `app/icon.svg` with that identity.
2. Restore bold sans-serif heading treatment in place of the current editorial serif/italic accents, using the existing font stack. Preserve readable line lengths and mobile wrapping.
3. Bring the hero composition, card radii, borders, and subtle background glows closer to the original reference. Keep decoration out of the text and focus layers.
4. Apply the same treatment to scanner tabs, file input, result cards, account forms, and information-page sidebars through their shared styles.
5. Retain the working mobile menu, visible focus indicators, reduced-motion support, and current content hierarchy. Adapt visual details around the real controls and findings.

Colours are the first priority. Avoid turning this pass into another broad page redesign. If a historical layout cannot accommodate the current working flow, preserve the usable flow and record the visual compromise in the delivery notes.

## 4. Verify the result

Use the existing browser and accessibility tooling. Adjust or add checks only for concrete regressions introduced by this work.

- Compare light and dark screenshots on home, scanner input/results, login/profile/settings unavailable states, registry unavailable state, and an information page.
- Check representative widths of 375, 768, and 1440 pixels, long content, keyboard navigation, and zoom. Check sticky navigation and horizontal overflow.
- Verify system theme, manual toggle, persistence, initial rendering, and readable controls in both themes.
- Measure contrast for normal text, secondary text, buttons, form boundaries, and focus indicators. Run the existing axe checks; passing automation does not replace visual and keyboard review.
- Run `npm run check`, `npm run format:check`, and `npm run build`. Run the existing production browser suite with `PLAYWRIGHT_USE_PRODUCTION=true npm run test:e2e` after building.
- Verify that basic reviews still make no API upload and that paused account/document/registry states remain explicit.

Deliverable: recorded commands and results, updated desktop/mobile screenshots, and a short comparison against the original reference.

## 5. Document and commit the visual restoration separately

Update the design description in `ARCHITECTURE.md`, the current preference in `brain.md`, and the delivery record/screenshots in `STATUS.md`. Keep the original audit and this plan identifiable as historical planning documents once complete.

Suggested follow-up commit title:

```text
style: restore Credify's original indigo and cyan visual identity
```

Acceptance criteria:

- The old white/slate and deep-navy palette, indigo/cyan accents, shield/wordmark, and bold sans-serif identity are recognisable.
- Current green/cream branding has been replaced consistently, including the app icon and interactive states. Meaningful success colours can remain green.
- Mobile, keyboard, theme, and contrast checks pass without weakening existing checks.
- Application behaviour and the previously established security boundaries remain intact.
- The current implementation is preserved as a local checkpoint commit, and this restoration is reviewable as a separate subsequent change.

## Delivery

Implemented the original indigo/cyan/slate palette, navy page canvas, bold sans-serif headings, shield/wordmark treatment, rounded cards, app icon, browser theme colours, and subtle decorative glows. Brand links, primary actions, form boundaries, and semantic status colours have separate roles.

The improved page content and working form/result layouts were retained while restoring the visual identity. This is a visual adaptation of the original reference; obsolete widgets and unsupported claims were not restored. The original source was used as the reference; a separate old-app runtime was unnecessary.

The local checkpoint is `4d0e300`. Validation and current screenshots are recorded in [STATUS.md](STATUS.md). Pushing was intentionally deferred to the owner.
