'use client';

import { useState } from 'react';
import { MessageCircle, ArrowRight, LoaderCircle } from 'lucide-react';
import { apiRequest } from '@/lib/client-api';
import { Button, Field, Notice } from '@/components/ui';

/** A deliberately single-question assistant; no hidden conversation retention or invented memory. */
export default function Chatbot({ available }: { available: boolean }) {
  const [message, setMessage] = useState('');
  const [reply, setReply] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  if (!available) return null;
  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setError('');
    setReply('');
    setBusy(true);
    try {
      const data = await apiRequest<{ reply: string }>('/api/chat', {
        method: 'POST',
        body: JSON.stringify({ message }),
        signal: AbortSignal.timeout(30_000),
      });
      setReply(data.reply);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'The assistant could not respond.');
    } finally {
      setBusy(false);
    }
  }
  return (
    <section className="card stack assistant-card">
      <div className="section-heading">
        <div>
          <p className="eyebrow">
            <MessageCircle size={15} />
            An extra perspective
          </p>
          <h2>Ask a safety question.</h2>
        </div>
      </div>
      <p className="muted small">
        Each question is answered independently by Google Gemini. Sign-in is required. Leave out
        personal information. AI can make mistakes.
      </p>
      <form onSubmit={submit} className="stack">
        <Field id="safety-question" label="What would you like to understand?">
          <textarea
            id="safety-question"
            className="input"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            minLength={5}
            maxLength={1500}
            rows={3}
            required
            placeholder="What should I ask before accepting an offer?"
          />
        </Field>
        <div>
          <Button disabled={busy} type="submit">
            {busy ? <LoaderCircle className="spin" size={16} /> : <ArrowRight size={16} />}
            {busy ? 'Thinking…' : 'Send question to AI'}
          </Button>
        </div>
      </form>
      {error && <Notice tone="error">{error}</Notice>}
      {reply && (
        <div role="status" className="assistant-answer">
          <h3>A perspective to consider</h3>
          <p>{reply}</p>
        </div>
      )}
    </section>
  );
}
