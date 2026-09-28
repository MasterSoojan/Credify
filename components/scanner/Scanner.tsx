'use client';

import { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  FileText,
  Mail,
  Link2,
  Upload,
  LockKeyhole,
  RotateCcw,
  LoaderCircle,
  X,
  Sparkles,
} from 'lucide-react';
import {
  ACCEPTED_FILE_TYPES,
  MAX_FILE_BYTES,
  MAX_TEXT_LENGTH,
  REVIEW_VERSION,
  scanInputSchema,
  scanResultSchema,
  type ScanType,
  type ScanResult as Result,
} from '@/lib/verification/contracts';
import { reviewLocally } from '@/lib/verification/local';
import { apiRequest } from '@/lib/client-api';
import { Button, Field, Notice, TextLink } from '@/components/ui';
import { ScanResult } from './ScanResult';

export const EXAMPLE_OFFER =
  'Congratulations! You have been selected for the position of Junior Marketing Associate. To secure your position, please pay a registration fee of $150. Reply within 2 hours to confirm your acceptance. Our recruiter will send the next steps on Telegram.';
const options = [
  { type: 'text', label: 'Offer text', icon: FileText },
  { type: 'email', label: 'Email', icon: Mail },
  { type: 'url', label: 'Link', icon: Link2 },
  { type: 'document', label: 'Document', icon: Upload },
] as const;

function readFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () =>
      typeof reader.result === 'string'
        ? resolve(reader.result.split(',')[1])
        : reject(new Error('The file could not be read.'));
    reader.onerror = () => reject(new Error('The file could not be read. Select it again.'));
    reader.readAsDataURL(file);
  });
}

export function Scanner({
  initialType = 'text',
  example = false,
  aiAvailable = false,
}: {
  initialType?: ScanType;
  example?: boolean;
  aiAvailable?: boolean;
}) {
  const [type, setType] = useState<ScanType>(initialType);
  const [text, setText] = useState(example ? EXAMPLE_OFFER : '');
  const [email, setEmail] = useState('');
  const [url, setUrl] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [useAi, setUseAi] = useState(false);
  const [consent, setConsent] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [dragging, setDragging] = useState(false);
  const requestRef = useRef<AbortController | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  const resultRegion = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (result) resultRegion.current?.focus({ preventScroll: false });
  }, [result]);
  useEffect(() => () => requestRef.current?.abort(), []);

  function selectType(value: ScanType) {
    requestRef.current?.abort();
    setBusy(false);
    setType(value);
    setError('');
    setResult(null);
  }
  function selectFile(value: File | undefined) {
    setError('');
    setResult(null);
    if (!value) return;
    // An invalid replacement must not leave a previously selected file queued for upload.
    setFile(null);
    if (value.size > MAX_FILE_BYTES) {
      setError('Choose a file smaller than 2 MB.');
      return;
    }
    if (!ACCEPTED_FILE_TYPES.includes(value.type as (typeof ACCEPTED_FILE_TYPES)[number])) {
      setError('Choose a PDF, PNG, or JPEG file.');
      return;
    }
    setFile(value);
  }

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setError('');
    setResult(null);
    const controller = new AbortController();
    requestRef.current = controller;
    setBusy(true);
    try {
      let raw: unknown;
      if (type === 'document') {
        if (!file) throw new Error('Choose a document to review.');
        if (!aiAvailable)
          throw new Error(
            'Document analysis is temporarily unavailable. Paste the text for a basic check instead.',
          );
        raw = {
          type,
          fileName: file.name,
          mimeType: file.type,
          fileData: await readFile(file),
          consent,
        };
      } else if (type === 'text') raw = { type, text, useAi: useAi && aiAvailable };
      else if (type === 'email') raw = { type, email: email.trim() };
      else raw = { type, url };
      if (controller.signal.aborted) return;
      const input = scanInputSchema.safeParse(raw);
      if (!input.success) throw new Error(input.error.issues[0]?.message || 'Check your input.');
      const data = input.data;
      if (data.type === 'document' || (data.type === 'text' && data.useAi)) {
        const response = await apiRequest<unknown>('/api/verify', {
          method: 'POST',
          body: JSON.stringify(data),
          signal: AbortSignal.any([controller.signal, AbortSignal.timeout(40_000)]),
        });
        if (!controller.signal.aborted) setResult(scanResultSchema.parse(response));
      } else {
        // Basic reviews never leave the browser. Keep this path free of analytics and provider calls.
        const assessment = reviewLocally(data);
        setResult({
          ...assessment,
          id: crypto.randomUUID(),
          type: data.type,
          source: example && text === EXAMPLE_OFFER && data.type === 'text' ? 'example' : 'local',
          checkedAt: new Date().toISOString(),
          version: REVIEW_VERSION,
        });
      }
    } catch (err) {
      if (!controller.signal.aborted)
        setError(err instanceof Error ? err.message : 'The review could not complete. Try again.');
    } finally {
      if (requestRef.current === controller) setBusy(false);
    }
  }

  function cancel() {
    requestRef.current?.abort();
    setBusy(false);
    setError('Review cancelled. Your input is still here.');
  }

  return (
    <div className="scanner-layout">
      <div className="scanner-workspace">
        <div className="scanner-toolbar">
          <span>
            <FileText size={16} />
            Your offer workspace
          </span>
          <span className="badge">
            <LockKeyhole size={11} />
            Private by default
          </span>
        </div>
        <div className="scanner-tabs" role="group" aria-label="Choose what to check">
          {options.map(({ type: value, label, icon: Icon }) => (
            <button
              type="button"
              key={value}
              aria-pressed={type === value}
              onClick={() => selectType(value)}
              disabled={busy}
            >
              <Icon size={17} />
              {label}
            </button>
          ))}
        </div>
        <form className="scanner-form stack" onSubmit={submit}>
          {type === 'text' && (
            <>
              <Field
                id="offer-text"
                label="What does the offer say?"
                hint="Remove names, phone numbers, and other personal details you don’t need to include."
              >
                <textarea
                  id="offer-text"
                  className="input"
                  rows={8}
                  maxLength={MAX_TEXT_LENGTH}
                  value={text}
                  onChange={(event) => setText(event.target.value)}
                  placeholder="Paste the job offer, recruiter message, or email you’d like a second perspective on…"
                  aria-describedby="offer-text-hint"
                  required
                  minLength={20}
                />
              </Field>
              <div className="input-meta">
                <button
                  className="text-link"
                  type="button"
                  onClick={() => {
                    setText(EXAMPLE_OFFER);
                    setResult(null);
                    setError('');
                  }}
                >
                  Use an example
                </button>
                <span>
                  {text.length.toLocaleString()} / {MAX_TEXT_LENGTH.toLocaleString()}
                </span>
              </div>
            </>
          )}
          {type === 'email' && (
            <Field
              id="recruiter-email"
              label="Recruiter’s email address"
              hint="We inspect the written domain. This does not authenticate the sender."
            >
              <input
                id="recruiter-email"
                type="email"
                className="input"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="recruiter@example.com"
                maxLength={254}
                autoComplete="off"
                aria-describedby="recruiter-email-hint"
                required
              />
            </Field>
          )}
          {type === 'url' && (
            <Field
              id="offer-url"
              label="Website or offer link"
              hint="The link will not be opened. This is a structure check, not a malware scan."
            >
              <input
                id="offer-url"
                className="input"
                value={url}
                onChange={(event) => setUrl(event.target.value)}
                placeholder="https://example.com/careers"
                maxLength={2048}
                autoComplete="off"
                aria-describedby="offer-url-hint"
                required
              />
            </Field>
          )}
          {type === 'document' && (
            <>
              {!aiAvailable && (
                <Notice title="Document analysis is taking a pause.">
                  You can still paste the document’s text in the Offer text tab for a basic review.
                  No file will be uploaded while analysis is unavailable.
                </Notice>
              )}
              <div
                className={`upload-area ${dragging ? 'is-dragging' : ''}`}
                onDragOver={(event) => {
                  event.preventDefault();
                  setDragging(true);
                }}
                onDragLeave={() => setDragging(false)}
                onDrop={(event) => {
                  event.preventDefault();
                  setDragging(false);
                  selectFile(event.dataTransfer.files[0]);
                }}
              >
                <Upload size={29} />
                <label htmlFor="offer-file">
                  {file ? file.name : 'Choose your offer document'}
                </label>
                <p>or drop it here · PDF, PNG, JPEG · up to 2 MB</p>
                <input
                  ref={fileInput}
                  id="offer-file"
                  type="file"
                  accept="application/pdf,image/png,image/jpeg"
                  onChange={(event) => selectFile(event.target.files?.[0])}
                  disabled={!aiAvailable}
                />
                {file && (
                  <button
                    type="button"
                    className="text-link"
                    onClick={() => {
                      setFile(null);
                      if (fileInput.current) fileInput.current.value = '';
                    }}
                  >
                    Remove file <X size={14} />
                  </button>
                )}
              </div>
            </>
          )}
          {type === 'text' && aiAvailable && (
            <label className="check-label">
              <input
                type="checkbox"
                checked={useAi}
                onChange={(event) => setUseAi(event.target.checked)}
              />
              <span>
                <strong>Add an AI-assisted review</strong>
                <small>
                  Send this text to Google Gemini for analysis. Requires sign-in. AI can make
                  mistakes.
                </small>
              </span>
              <Sparkles size={18} />
            </label>
          )}
          {type === 'document' && aiAvailable && (
            <label className="check-label">
              <input
                type="checkbox"
                checked={consent}
                onChange={(event) => setConsent(event.target.checked)}
                required
              />
              <span>
                I agree to send this document to Google Gemini for analysis. I have removed
                unnecessary personal information.
              </span>
            </label>
          )}
          {error && <Notice tone="error">{error}</Notice>}
          <div className="scanner-submit">
            <Button type="submit" disabled={busy || (type === 'document' && !aiAvailable)}>
              {busy ? (
                <>
                  <LoaderCircle className="spin" size={17} />
                  Reviewing your offer…
                </>
              ) : (
                <>
                  Take a closer look <ArrowRight size={17} />
                </>
              )}
            </Button>
            {busy ? (
              <Button variant="quiet" type="button" onClick={cancel}>
                Cancel
              </Button>
            ) : (
              <span>
                <LockKeyhole size={13} />
                {type === 'document' || (type === 'text' && useAi && aiAvailable)
                  ? 'Processed without saving'
                  : 'Stays in your browser'}
              </span>
            )}
          </div>
        </form>
        <div className="scanner-footnote">
          A review helps you ask better questions. It cannot guarantee an offer is legitimate.
        </div>
        {result && (
          <div
            ref={resultRegion}
            tabIndex={-1}
            className="result-region"
            aria-label="Your review results"
          >
            <ScanResult key={result.id} result={result} />
          </div>
        )}
        <span className="sr-only" aria-live="polite">
          {busy ? 'Review in progress.' : result ? 'Your review is ready below.' : ''}
        </span>
      </div>
      <aside className="scanner-sidebar">
        <div className="sidebar-note">
          <span className="eyebrow">
            <span />A good place to start
          </span>
          <h2>
            Pause. Check.
            <br />
            <span className="serif">Then decide.</span>
          </h2>
          <p>You don’t have to figure it all out at once. Start with what feels uncertain.</p>
          <ul>
            <li>
              <span>01</span>Check the full email domain.
            </li>
            <li>
              <span>02</span>Question requests for money.
            </li>
            <li>
              <span>03</span>Find the role on the company site.
            </li>
            <li>
              <span>04</span>Use a contact you find yourself.
            </li>
          </ul>
          <TextLink href="/how-it-works">What’s checked and what isn’t</TextLink>
        </div>
        <div className="sidebar-help">
          <RotateCcw size={19} />
          <h3>Already taken a step?</h3>
          <p>If you’ve shared money or personal information, there are things you can do now.</p>
          <TextLink href="/emergency-guide">Find your next steps</TextLink>
        </div>
      </aside>
    </div>
  );
}
