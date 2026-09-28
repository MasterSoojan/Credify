# API contracts

Custom mutation endpoints accept JSON, require a matching Origin header, and return `Cache-Control: no-store`. Browser account requests carry HttpOnly session cookies automatically. All request schemas reject unexpected fields. `lib/verification/contracts.ts` and `lib/auth-schemas.ts` are the executable source of truth.

## Errors

```json
{
  "error": {
    "code": "INVALID_INPUT",
    "message": "Check the information you entered."
  }
}
```

Expected statuses include 400 (invalid input), 401 (sign-in/reauthentication needed), 403 (origin mismatch), 413 (body limit), 415 (unsupported content type), 429 (quota reached), 502 (unusable provider result), and 503 (disabled/unavailable dependency). Error text is safe for display. Provider payloads and secrets are not included.

## `POST /api/verify`

The website’s basic review runs locally and does not call this route. The route exposes the same rules for controlled HTTP clients and provides the optional AI path.

| Mode     | Request                                                                                                                                                                             |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Text     | `{ "type": "text", "text": "…", "useAi": false }` — 20–12000 trimmed characters.                                                                                                    |
| Email    | `{ "type": "email", "email": "recruiter@example.com" }` — valid address, at most 254 characters.                                                                                    |
| URL      | `{ "type": "url", "url": "https://example.com/jobs" }` — at most 2048 characters; HTTP(S), no embedded credentials.                                                                 |
| Document | `{ "type": "document", "fileName": "offer.pdf", "mimeType": "application/pdf", "fileData": "BASE64", "consent": true }` — PDF/PNG/JPEG, at most 2 MiB decoded, supported signature. |

AI text (`useAi: true`) and documents require available AI service, a verified account, and an available shared quota. Document consent is mandatory. No model call is made for local modes. Invalid URLs are rejected without visiting them. File signatures are a format sanity check, not a malware certification.

Successful response:

```json
{
  "id": "server-generated-uuid",
  "type": "text",
  "source": "local",
  "checkedAt": "2026-09-27T12:00:00.000Z",
  "version": "2026-09-27.1",
  "status": "attention",
  "summary": "We found language worth checking before you take the next step.",
  "findings": [
    {
      "id": "payment",
      "severity": "warning",
      "title": "A payment request deserves a closer look",
      "detail": "Verify who is asking and why before paying anything.",
      "evidence": "registration fee"
    }
  ],
  "nextSteps": ["Contact the employer through an independently located channel."],
  "limitations": ["This is a limited review, not proof that an offer is real or fake."]
}
```

`status` is `attention` or `inconclusive`. `source` is `local` or `ai` from the API; the browser also uses `example` for an untouched fictional sample. There is no numeric score or verified-employer boolean. A request failure does not return a successful assessment.

## Accounts

| Route                 | Method | Body / behavior                                                                                                                                                           |
| --------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/api/signup`         | POST   | `{ email, password, name }`. Password 12–128 characters, name 1–80. Sends confirmation; profile creation is an Auth transaction trigger.                                  |
| `/api/login`          | POST   | `{ email, password }`. Establishes cookies. Returns a message, never a browser token payload. User-ID sign-in has been retired.                                           |
| `/api/logout`         | POST   | No body required. Signs out through Auth.                                                                                                                                 |
| `/api/reset-password` | POST   | `{ email }`. Requests a recovery email. Does not change a password.                                                                                                       |
| `/api/password`       | POST   | `{ password, currentPassword? }`. Verified session required. A normal change needs the current password; a valid signed recovery capability can replace that requirement. |
| `/api/profile`        | GET    | Verified session required. Returns `{ profile: { display_name, occupation, location, email, user_id } }`.                                                                 |
| `/api/profile`        | PATCH  | `{ display_name, occupation, location }`. Edits only the verified user’s allowed fields. Does not change the Auth email.                                                  |
| `/api/delete-account` | DELETE | `{ password, confirmation: "DELETE" }`. Requires verified identity and password. Deletes Auth user by server-derived ID; profile cascades.                                |

Account mutations have bounded requests and schema validation. Authentication attempts, recovery, signup, password changes, and deletion share the quota adapter. Profile ownership is checked at both the query and RLS boundaries. The admin key is used only for the final deletion call.

Auth redirects are GET endpoints under `/auth/confirm` and `/auth/callback`, not arbitrary redirect services. Recovery requires the configured token-hash email template described in `OPERATIONS.md`.

## `POST /api/chat`

Request: `{ "message": "A general job-safety question" }`, 5–1500 trimmed characters. Requires the same available AI service, verified user, and quotas as analysis. Responds `{ "reply": "Plain text answer" }`.

Each question is independent. The endpoint does not receive conversation history, browse the web, or retain messages. It has a shorter deadline and output limit than document analysis. A failed provider response is a failed request, not a simulated answer.
