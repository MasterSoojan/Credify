# Using Credify

Credify helps you examine a job offer, recruiter email domain, or link. It explains signals and next steps. A review cannot authenticate a recruiter or establish that an opportunity is safe.

## Your first review

1. Select **Check an offer** on the home page or in the header. On a phone, open the menu to find the same direct link.
2. Choose **Offer text**, **Email**, or **Link**. Basic checks do not require an account.
3. Enter the relevant content. Remove personal details that are unnecessary for the check.
4. Select **Take a closer look**. Keyboard focus moves to the result when it is ready.
5. Read the findings, supporting excerpts, next steps, and limitations together.

Use **Try an example** on the home page, or visit `/demo`, to review a fictional offer. **Use an example** inside the text form replaces the current text with the sample; it does not submit automatically.

The home page shows a fictional message, its warning signs, and an independent next step immediately. **See how it works** scrolls down to a three-step illustrated example. The **How it works** page explains each check and links to the prefilled demo. The logo returns home; **Verifiers** in the header or mobile navigation opens the complete toolkit directly, without a dropdown.

## Choose the right check

| Choice     | Input                                              | What the basic check does                                                                                          |
| ---------- | -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Offer text | 20–12,000 characters after trimming                | Looks for specific English-language patterns, such as payment requests or urgency. Context can change the meaning. |
| Email      | A complete email address, up to 254 characters     | Inspects the written domain. It does not read your inbox, verify headers, or prove who sent the message.           |
| Link       | An HTTP(S) website address, up to 2,048 characters | Inspects the address structure without visiting it. It does not scan the website for malware or reputation.        |
| Document   | PDF, PNG, or JPEG, up to 2 MiB                     | Optional AI analysis; requires enabled services, sign-in, and processing consent.                                  |

For documents, choose **Document**, sign in, select a supported file, and consent to AI processing before submitting. If the service is unavailable, the scanner explains this and prevents upload; you can still paste extracted text into **Offer text**.

## Read and revise a result

**Worth a closer look** means at least one check found a signal worth investigating. **There’s more to verify** is inconclusive. Neither is proof of fraud or legitimacy. A familiar logo, domain, or company name does not authenticate the person using it.

**Edit input** returns focus to your original input and clears the report. Changing an input directly, switching modes, or changing the optional analysis method also clears the previous result. Submit again to review the new content. Inputs cannot be changed while a review is running; use **Cancel** first if needed.

**Copy report** copies the review summary, findings, next steps, and limitations to your clipboard. If browser permissions prevent copying, the page explains that you can select and copy the text manually. Credify does not save a report history; reloading or leaving the scanner loses the current inputs and result.

## Themes and keyboard use

The initial theme follows your system setting. Use the sun/moon button in the header to switch themes; your selection is remembered in this browser. Theme storage contains the display preference, not your scanner input.

- Use Tab and Shift+Tab to move between controls, and Enter or Space to activate buttons.
- The first keyboard link, **Skip to content**, bypasses the header.
- Scanner choices are toggle buttons: Tab between them and activate the one you want.
- Escape closes the mobile navigation and returns focus to its menu button. Following a menu link also closes the menu.
- Results receive focus after submission; **Edit input** takes you back to the form.
- System reduced-motion preferences shorten decorative transitions.

## Connected services and privacy

Supabase supports accounts and the public company registry. Signed-in users can choose AI-assisted text or document analysis and use the assistant when those features are configured. Basic checks also work without an account. A temporary service problem is shown where relevant rather than changing the main product journey.

Basic scanner content is not uploaded by the app. Optional AI, when enabled and chosen, sends content through the server to Google Gemini. Processing consent and service availability are shown before submission. See the app's `/privacy` page for the data-flow explanation; operator details still require review before a public service launch.

## Common problems

| What you see                               | Next step                                                                                                                   |
| ------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------- |
| Text is too short                          | Enter at least 20 non-padding characters.                                                                                   |
| Invalid email or address                   | Check the full address. Links must use HTTP(S); embedded credentials are rejected.                                          |
| Account or document service is unavailable | Retry later, or use the basic scanner without an account or upload.                                                         |
| AI review fails or times out               | Your input remains available. Retry when appropriate or choose a basic text check. There is no result for a failed request. |
| Copy report is unavailable                 | Select and copy the displayed report manually.                                                                              |
| A finding seems wrong                      | Consider the excerpt in context and check independently. Rules can miss or misinterpret signals.                            |

The **Safety hub** links to explanations and learning material. **Need help now?** opens the app's emergency guide. Product issues can be described to the person who shared this preview; include the page and steps, without credentials or private documents.

Return to the [README](../README.md) for setup, or see [delivery status](STATUS.md) for implemented and deferred capabilities.
