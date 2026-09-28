# UI and design reference

The owner prefers the restrained styling of the [deployed reference](https://credify-eight.vercel.app/): neutral controls, white/navy surfaces, blue/cyan headline gradients, colourful guidance, and selective red caution text. Purple-looking buttons and lavender panels are explicitly excluded. Keep the improved scanner layout. The historical [restoration plan](UI_RESTORATION_PLAN.md) records the earlier reference; this document describes the current implementation.

## Ownership

| File                                                 | Responsibility                                                                                   |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| `app/globals.css`                                    | Theme tokens, typography, shared controls, navigation, home, footer, and responsive foundations. |
| `styles/scanner.css`                                 | Scanner modes, input workspace, guidance, findings, and result actions.                          |
| `styles/content.css`                                 | Reading surfaces, information sidebars, resources, assistant, and registry.                      |
| `styles/home-preview.css`, `styles/review-steps.css` | Fictional offer preview, scroll cue, shared visual walkthrough, and guide.                       |
| `styles/account.css`                                 | Account and authentication layouts.                                                              |
| `components/ui.tsx`                                  | Buttons, links, introductions, notices, and labeled fields.                                      |
| `components/ThemeProvider.tsx`                       | System theme default and persisted manual selection.                                             |

`app/layout.tsx` imports local styles directly in their cascade order before `globals.css`; the latter imports only the Tailwind package. This keeps local stylesheet resolution in Next’s module graph.

Use the existing primitives and tokens before adding another component or colour. Keep static content server-rendered and interaction state close to the form that owns it.

## Colour roles

The CSS declarations are the source of truth. The key pairs are:

| Token              | Light     | Dark      | Use                                           |
| ------------------ | --------- | --------- | --------------------------------------------- |
| `--canvas`         | `#ffffff` | `#0a0f1c` | Page background.                              |
| `--surface`        | `#ffffff` | `#101827` | Cards and navigation.                         |
| `--surface-soft`   | `#f4f7fa` | `#172233` | Secondary sections and neutral notices.       |
| `--field`          | `#f8fafc` | `#0e1728` | Editable fields and finding cards.            |
| `--ink`            | `#18243b` | `#e8eef8` | Main text.                                    |
| `--muted`          | `#52627a` | `#a5b4ca` | Supporting copy and opaque placeholders.      |
| `--brand`          | `#0369a1` | `#67d4e8` | Links, focus, active modes, headings.         |
| `--brand-soft`     | `#edf6fb` | `#112e3c` | Selected controls and soft brand panels.      |
| `--highlight`      | `#0e7490` | `#67d4e8` | Complementary decorative accents.             |
| `--highlight-soft` | `#e7f5f9` | `#112734` | Complementary callouts.                       |
| `--action`         | `#172234` | `#edf2f7` | Neutral primary action background.            |
| `--action-hover`   | `#293b52` | `#ffffff` | Neutral primary hover background.             |
| `--on-action`      | `#ffffff` | `#101827` | Primary action text, inverted with the theme. |
| `--line`           | `#dce3ef` | `#2c3d56` | Decorative dividers.                          |
| `--control-line`   | `#7c8ba3` | `#71839f` | Visible control boundaries.                   |

`--accent` is the text-selection fill. Success, warning, and danger each have foreground/background pairs; use them with a label or icon, never as the only signal. A successful operation is distinct from an offer's legitimacy. Inconclusive results do not use a green success treatment.

Primary actions use the neutral action pair; do not restore purple fills or apply the cyan link colour to buttons. Action and brand roles are deliberately separate. The hero gradient uses blue-to-teal foreground tokens in light mode and blue-to-cyan in dark mode. Process steps use blue for input, red for caution, and teal for follow-up. Payment excerpts, attention findings, and emergency-help links use the red pair (`#b42332` on `#fff1f2` light; `#fda4a4` on `#351d26` dark). These colours highlight a reason to investigate; they do not establish fraud or legitimacy. Amber remains available for general advisory notices. Keep the icon in `app/icon.svg` and system-theme browser colours in `app/layout.tsx` aligned when changing the palette. Browser chrome metadata follows the system media query; the in-page toggle controls the document theme.

## Layout and interaction

- Content uses a maximum 1,180-pixel container, with 32-pixel desktop and 20-pixel mobile side gutters. The header has a wider 1,320-pixel limit.
- Headings use Arial/Helvetica/system sans-serif with strong weight and balanced wrapping. Mobile hero text scales to preserve readable phrases and keep the primary actions near the introduction.
- Primary navigation contains **Check an offer**, **Verifiers**, **How it works**, and **Safety hub**. **Verifiers** is a normal link to `/verifiers`, without a disclosure button. There is no separate Home item or Verifiers dropdown. The logo returns home; the footer keeps `/verifiers` and the assistant discoverable. The mobile menu closes on navigation or Escape.
- Navigation collapses below 850 pixels. Menu/theme controls are 44 pixels square. The mobile menu scrolls when viewport height is limited.
- The hero explains the task, offers a direct checker and demo, and shows a fictional message with its findings and next step already visible. **See how it works** scrolls to the next section with clearance for the sticky header. Keep the example content server-rendered and visible without extra interaction. The shared Next loading shell still requires JavaScript to reveal streamed content.
- Home continues from the example into three concrete steps, input choices, common questions, and a final checker action. `ReviewSteps` is shared with How it works: numbered, connected cards show the input, finding, and suggested question. Cards become a vertical sequence on phones. Input-choice cards use literal labels and real links.
- Information articles use a bounded reading surface, with a sticky desktop sidebar and a single column on phones. Reading text remains selectable.
- Scanner modes use labeled toggle buttons with descriptions. Active state persists on hover. An unavailable document service is labeled rather than disguised as a working feature.
- Report summaries, findings, excerpts, next steps, and limitations have distinct visual groups. **Edit input** clears the old report, preserves input, and returns focus to the form.
- Field focus, result focus, menu Escape behavior, and announcements are functional requirements. Input edits must never leave a report for an older submission visible.

Cards use roughly 12–24-pixel corner radii; controls use 12 pixels. Keep spacing consistent with the surrounding section rather than introducing route-specific overrides. Prefer existing breakpoints when a layout can share them. Motion is brief and decorative, with a reduced-motion override.

## Review a UI change

Inspect home, scanner input/results/error, a reading page, and unavailable-service pages in both themes. Include narrow phones, a tablet, desktop, long input, keyboard navigation, and zoom/reflow. Check hover, focus, selected, disabled, and expanded states, not just the initial screen.

Normal text should meet 4.5:1 contrast and essential control boundaries 3:1 against adjacent surfaces. Decorative dividers do not need the stronger control border. Check composited backgrounds as well as solid token pairs. Run the browser suite and axe checks, then inspect screenshots; automation is not a complete accessibility audit.

Current [screenshots and measured results](STATUS.md#visual-review) are maintained with the delivery record. The [testing guide](TESTING.md) describes repeatable commands and remaining manual checks.
