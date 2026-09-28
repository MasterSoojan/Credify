'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, LogOut, Save, UserRound, Settings, LoaderCircle } from 'lucide-react';
import { apiRequest, ApiRequestError } from '@/lib/client-api';
import type { Profile } from '@/lib/auth-schemas';
import { Button, ButtonLink, Field, Notice } from '@/components/ui';
import { PasswordField } from './AuthForm';

export function AccountPanel({
  available,
  settings = false,
}: {
  available: boolean;
  settings?: boolean;
}) {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loadError, setLoadError] = useState('');
  const [signedOut, setSignedOut] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [deletePassword, setDeletePassword] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState('');

  useEffect(() => {
    // Old preview state is neither trusted nor imported into a real account.
    try {
      for (const key of ['credify_user', 'credify_profile_data', 'credify_profile_pic'])
        localStorage.removeItem(key);
    } catch {
      /* Browser storage can be disabled without affecting Auth. */
    }
    if (!available) return;
    const controller = new AbortController();
    apiRequest<{ profile: Profile }>('/api/profile', {
      signal: AbortSignal.any([controller.signal, AbortSignal.timeout(15_000)]),
    })
      .then((data) => setProfile(data.profile))
      .catch((err) => {
        if (controller.signal.aborted) return;
        if (err instanceof ApiRequestError && err.status === 401) setSignedOut(true);
        else setLoadError(err instanceof Error ? err.message : 'Your profile could not be loaded.');
      });
    return () => controller.abort();
  }, [available]);

  async function mutate(path: string, method: string, body?: unknown) {
    setBusy(true);
    setError('');
    setMessage('');
    try {
      const data = await apiRequest<{ message: string }>(path, {
        method,
        body: body ? JSON.stringify(body) : undefined,
        signal: AbortSignal.timeout(15_000),
      });
      setMessage(data.message);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Please try again.');
      return false;
    } finally {
      setBusy(false);
    }
  }

  if (!available)
    return (
      <div className="card stack content-width">
        <Notice title="Account services are unavailable right now.">
          Your profile and security settings will be available when account services return. You can
          still review an offer without signing in.
        </Notice>
        <div>
          <ButtonLink href="/job-scanner">
            Check an offer <ArrowRight size={16} />
          </ButtonLink>
        </div>
      </div>
    );
  if (signedOut)
    return (
      <div className="card stack content-width">
        <h2>Make this space yours.</h2>
        <p className="muted">Sign in to manage your profile and account security.</p>
        <div className="button-row">
          <ButtonLink href="/login">Sign in</ButtonLink>
          <ButtonLink href="/signup" variant="secondary">
            Create an account
          </ButtonLink>
        </div>
      </div>
    );
  if (loadError)
    return (
      <Notice tone="error">
        {loadError}{' '}
        <button className="text-link" onClick={() => window.location.reload()}>
          Try again
        </button>
      </Notice>
    );
  if (!profile)
    return (
      <div className="card" role="status">
        <LoaderCircle className="spin" size={20} /> Loading your account…
      </div>
    );
  return (
    <div className="account-layout">
      <aside className="account-nav">
        <div className="account-avatar">
          <UserRound size={28} />
        </div>
        <strong>{profile.display_name || 'Your account'}</strong>
        <p>{profile.email}</p>
        <Link href="/profile" aria-current={!settings ? 'page' : undefined}>
          <UserRound size={17} />
          Profile
        </Link>
        <Link href="/settings" aria-current={settings ? 'page' : undefined}>
          <Settings size={17} />
          Security
        </Link>
        <button
          disabled={busy}
          onClick={async () => {
            if (await mutate('/api/logout', 'POST')) {
              router.push('/login');
              router.refresh();
            }
          }}
        >
          <LogOut size={17} />
          Sign out
        </button>
      </aside>
      <div className="stack">
        <div aria-live="polite">
          {error && <Notice tone="error">{error}</Notice>}
          {message && <Notice tone="success">{message}</Notice>}
        </div>
        {!settings ? (
          <form
            className="card stack"
            onSubmit={async (event) => {
              event.preventDefault();
              await mutate('/api/profile', 'PATCH', {
                display_name: profile.display_name,
                occupation: profile.occupation,
                location: profile.location,
              });
            }}
          >
            <div>
              <h2>Your profile</h2>
              <p className="muted small">A few details, kept private to your account.</p>
            </div>
            <Field id="display-name" label="Name">
              <input
                className="input"
                id="display-name"
                autoComplete="name"
                value={profile.display_name}
                onChange={(event) => setProfile({ ...profile, display_name: event.target.value })}
                required
                maxLength={80}
              />
            </Field>
            <Field id="occupation" label="Occupation (optional)">
              <input
                className="input"
                id="occupation"
                value={profile.occupation}
                onChange={(event) => setProfile({ ...profile, occupation: event.target.value })}
                maxLength={100}
              />
            </Field>
            <Field id="location" label="Location (optional)">
              <input
                className="input"
                id="location"
                autoComplete="address-level2"
                value={profile.location}
                onChange={(event) => setProfile({ ...profile, location: event.target.value })}
                maxLength={100}
              />
            </Field>
            <Notice>
              Your sign-in email is {profile.email}. It is managed separately from your profile.
            </Notice>
            <div>
              <Button disabled={busy} type="submit">
                <Save size={16} />
                {busy ? 'Saving…' : 'Save changes'}
              </Button>
            </div>
          </form>
        ) : (
          <>
            <form
              className="card stack"
              onSubmit={async (event) => {
                event.preventDefault();
                if (password !== confirm) {
                  setError('Your new passwords do not match.');
                  return;
                }
                if (await mutate('/api/password', 'POST', { currentPassword, password })) {
                  setCurrentPassword('');
                  setPassword('');
                  setConfirm('');
                }
              }}
            >
              <div>
                <h2>Change your password</h2>
                <p className="muted small">Choose a unique password with at least 12 characters.</p>
              </div>
              <PasswordField
                id="current-password"
                label="Current password"
                value={currentPassword}
                onChange={setCurrentPassword}
                autoComplete="current-password"
                minLength={1}
              />
              <PasswordField
                id="new-password"
                label="New password"
                value={password}
                onChange={setPassword}
              />
              <PasswordField
                id="confirm-new-password"
                label="Confirm new password"
                value={confirm}
                onChange={setConfirm}
              />
              <div>
                <Button disabled={busy} type="submit">
                  Update password
                </Button>
              </div>
            </form>
            <details className="card danger-zone">
              <summary>Delete your account</summary>
              <form
                className="stack"
                onSubmit={async (event) => {
                  event.preventDefault();
                  if (
                    await mutate('/api/delete-account', 'DELETE', {
                      password: deletePassword,
                      confirmation: deleteConfirm,
                    })
                  ) {
                    router.push('/login');
                    router.refresh();
                  }
                }}
              >
                <Notice tone="warning">
                  This permanently deletes your account and profile. You will need to create a new
                  account if you return.
                </Notice>
                <PasswordField
                  id="delete-password"
                  label="Account password"
                  value={deletePassword}
                  onChange={setDeletePassword}
                  autoComplete="current-password"
                  minLength={1}
                />
                <Field id="delete-confirm" label="Type DELETE to confirm">
                  <input
                    id="delete-confirm"
                    className="input"
                    value={deleteConfirm}
                    onChange={(event) => setDeleteConfirm(event.target.value)}
                    pattern="DELETE"
                    required
                    autoComplete="off"
                  />
                </Field>
                <div>
                  <Button
                    variant="danger"
                    disabled={busy || deleteConfirm !== 'DELETE'}
                    type="submit"
                  >
                    Permanently delete account
                  </Button>
                </div>
              </form>
            </details>
          </>
        )}
      </div>
    </div>
  );
}
