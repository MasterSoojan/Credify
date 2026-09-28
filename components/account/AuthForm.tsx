'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Eye, EyeOff, LockKeyhole, LoaderCircle } from 'lucide-react';
import { Button, ButtonLink, Field, Notice } from '@/components/ui';
import { apiRequest } from '@/lib/client-api';

export type AuthMode = 'login' | 'signup' | 'reset' | 'update';
const copy = {
  login: {
    eyebrow: 'Your space, at your pace',
    title: 'Good to see you again.',
    description: 'Sign in to manage your Credify account.',
    action: 'Sign in',
    endpoint: '/api/login',
  },
  signup: {
    eyebrow: 'A more informed next step',
    title: 'Make yourself at home.',
    description: 'Create an account to manage your profile and access available AI reviews.',
    action: 'Create account',
    endpoint: '/api/signup',
  },
  reset: {
    eyebrow: 'Let’s get you back in',
    title: 'Forgot your password?',
    description: 'We’ll send a recovery link to your email address.',
    action: 'Send recovery link',
    endpoint: '/api/reset-password',
  },
  update: {
    eyebrow: 'A fresh start',
    title: 'Choose a new password.',
    description:
      'Use a unique password with at least 12 characters. Your recovery link expires after a short time.',
    action: 'Update password',
    endpoint: '/api/password',
  },
};

export function PasswordField({
  id,
  label,
  value,
  onChange,
  autoComplete = 'new-password',
  minLength = 12,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  autoComplete?: string;
  minLength?: number;
}) {
  const [visible, setVisible] = useState(false);
  return (
    <Field id={id} label={label}>
      <div className="password-input">
        <input
          id={id}
          type={visible ? 'text' : 'password'}
          className="input"
          autoComplete={autoComplete}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          required
          minLength={minLength}
          maxLength={128}
        />
        <button
          type="button"
          aria-label={visible ? `Hide ${label.toLowerCase()}` : `Show ${label.toLowerCase()}`}
          aria-pressed={visible}
          onClick={() => setVisible(!visible)}
        >
          {visible ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </Field>
  );
}

export function AuthForm({
  mode,
  available,
  expiredLink = false,
}: {
  mode: AuthMode;
  available: boolean;
  expiredLink?: boolean;
}) {
  const content = copy[mode];
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setError('');
    setMessage('');
    if (mode === 'update' && confirm !== password) {
      setError('Your new passwords do not match.');
      return;
    }
    setBusy(true);
    try {
      const payload =
        mode === 'signup'
          ? { email: email.trim(), name: name.trim(), password }
          : mode === 'reset'
            ? { email: email.trim() }
            : mode === 'update'
              ? { password }
              : { email: email.trim(), password };
      const response = await apiRequest<{ message: string }>(content.endpoint, {
        method: 'POST',
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(15_000),
      });
      if (mode === 'login') {
        router.push('/profile');
        router.refresh();
      } else {
        setMessage(response.message);
        setPassword('');
        setConfirm('');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Please try again.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="container auth-layout">
      <section className="auth-story">
        <p className="eyebrow">
          <span />A little more clarity
        </p>
        <h1>
          Your next chapter.
          <br />
          <span className="heading-accent">On your terms.</span>
        </h1>
        <p>
          A thoughtful pause can make all the difference. Take your time, ask questions, and keep
          moving toward the opportunity that’s right for you.
        </p>
        <div className="auth-note">
          <LockKeyhole size={20} />
          <span>Basic offer checks are free and work without an account.</span>
        </div>
        <ButtonLink variant="secondary" href="/job-scanner">
          Check an offer <ArrowRight size={16} />
        </ButtonLink>
      </section>
      <section className="auth-card">
        <p className="eyebrow">{content.eyebrow}</p>
        <h2>{content.title}</h2>
        <p className="muted small">{content.description}</p>
        {!available ? (
          <div className="stack auth-form">
            <Notice title="Sign-in is unavailable right now.">
              Sign-in and account changes are unavailable right now. Your basic text, email, and
              link checks are still here, with no account needed.
            </Notice>
            <ButtonLink href="/job-scanner">
              Continue to offer checks <ArrowRight size={16} />
            </ButtonLink>
          </div>
        ) : (
          <form className="stack auth-form" onSubmit={submit}>
            {expiredLink && (
              <Notice tone="warning">
                This sign-in or recovery link is invalid or has expired. Request a new link to
                continue.
              </Notice>
            )}
            {mode === 'signup' && (
              <Field id="full-name" label="Your name">
                <input
                  id="full-name"
                  autoComplete="name"
                  className="input"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                  maxLength={80}
                />
              </Field>
            )}
            {mode !== 'update' && (
              <Field id="account-email" label="Email address">
                <input
                  id="account-email"
                  type="email"
                  autoComplete="email"
                  className="input"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  maxLength={254}
                />
              </Field>
            )}
            {mode !== 'reset' && (
              <PasswordField
                id="account-password"
                label={mode === 'update' ? 'New password' : 'Password'}
                value={password}
                onChange={setPassword}
                minLength={mode === 'login' ? 1 : 12}
                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              />
            )}
            {mode === 'signup' && (
              <p className="field-hint">
                At least 12 characters. Use a password you don’t use anywhere else.
              </p>
            )}
            {mode === 'update' && (
              <PasswordField
                id="confirm-password"
                label="Confirm new password"
                value={confirm}
                onChange={setConfirm}
              />
            )}
            {mode === 'login' && (
              <Link className="text-link" href="/reset-password">
                Forgot your password?
              </Link>
            )}
            {error && <Notice tone="error">{error}</Notice>}
            {message && (
              <div role="status">
                <Notice tone="success">{message}</Notice>
              </div>
            )}
            <Button type="submit" disabled={busy || Boolean(message)}>
              {busy ? <LoaderCircle className="spin" size={17} /> : null}
              {busy ? 'One moment…' : content.action}
              <ArrowRight size={16} />
            </Button>
            {mode === 'signup' && (
              <p className="field-hint">
                By creating an account, you agree to the <Link href="/terms">terms</Link> and
                acknowledge the <Link href="/privacy">privacy information</Link>.
              </p>
            )}
          </form>
        )}
        <div className="auth-switch">
          {mode === 'login' ? (
            <>
              New here? <Link href="/signup">Create an account</Link>
            </>
          ) : (
            <>
              Already have an account? <Link href="/login">Sign in</Link>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
