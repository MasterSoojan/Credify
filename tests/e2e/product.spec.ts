import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('served responses preserve security headers and disabled API boundaries', async ({
  request,
}) => {
  const home = await request.get('/');
  expect(home.headers()['x-frame-options']).toBe('DENY');
  expect(home.headers()['x-content-type-options']).toBe('nosniff');
  expect(home.headers()['x-powered-by']).toBeUndefined();
  const callback = await request.get('/auth/confirm?type=recovery&token_hash=', {
    maxRedirects: 0,
  });
  expect(callback.status()).toBe(307);
  expect(callback.headers()['cache-control']).toBe('no-store');
  expect(callback.headers()['referrer-policy']).toBe('no-referrer');
  const login = await request.post('/api/login', {
    headers: { Origin: 'http://127.0.0.1:3100' },
    data: { email: 'fixture@example.com', password: 'test-fixture' },
  });
  expect(login.status()).toBe(503);
  const rejected = await request.post('/api/verify', {
    headers: { Origin: 'https://untrusted.example' },
    data: { type: 'text', text: 'Please pay a registration fee to secure this role.' },
  });
  expect(rejected.status()).toBe(403);
});

test('the example produces an explained review without uploading input', async ({ page }) => {
  const requests: string[] = [];
  page.on('request', (request) => {
    if (request.method() === 'POST') requests.push(request.url());
  });
  await page.goto('/demo');
  await page.getByRole('button', { name: 'Take a closer look' }).click();
  await expect(page.getByRole('heading', { name: 'Worth a closer look.' })).toBeVisible();
  await expect(page.getByText('A payment request deserves a closer look')).toBeVisible();
  await expect(
    page.getByRole('heading', { name: 'What this review can’t tell you' }),
  ).toBeVisible();
  expect(requests.filter((url) => url.includes('/api/'))).toEqual([]);
  await expect(page.locator('.result-region')).toBeFocused();
  const audit = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze();
  expect(audit.violations).toEqual([]);
});

test('ordinary links remain inconclusive and document outages are explicit', async ({ page }) => {
  await page.goto('/instant-verify');
  await page.getByLabel('Website or offer link').fill('https://example.com/jobs');
  await page.getByRole('button', { name: 'Take a closer look' }).click();
  await expect(page.getByRole('heading', { name: 'There’s more to verify.' })).toBeVisible();
  await expect(
    page.getByText('This is not a malware or reputation scan. The website was not visited.'),
  ).toBeVisible();
  await page.getByRole('button', { name: 'Document', exact: true }).click();
  await expect(page.getByText('Document analysis is taking a pause.')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Take a closer look' })).toBeDisabled();
});

test('paused account pages never fake sign-in or password success', async ({ page }) => {
  const outgoing: string[] = [];
  page.on('request', (request) => {
    if (request.url().includes('supabase')) outgoing.push(request.url());
  });
  await page.goto('/login');
  await expect(page.getByText('Accounts are temporarily paused.')).toBeVisible();
  await expect(page.locator('input[type=password]')).toHaveCount(0);
  await page.goto('/settings');
  await expect(page.getByText('Account services are currently paused.')).toBeVisible();
  expect(outgoing).toEqual([]);
});

test('mobile navigation and dark mode work without horizontal overflow', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');
  await page.getByRole('button', { name: 'Open navigation' }).click();
  await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('button', { name: 'Open navigation' })).toBeFocused();
  await page.getByRole('button', { name: 'Toggle color theme' }).click();
  await expect(page.locator('html')).toHaveClass(/dark/);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(
    true,
  );
  await page.goto('/demo');
  await page.getByRole('button', { name: 'Take a closer look' }).click();
  await expect(page.getByRole('heading', { name: 'Worth a closer look.' })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(
    true,
  );
  const audit = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze();
  expect(audit.violations).toEqual([]);
});

for (const path of ['/', '/job-scanner', '/login', '/help-center', '/emergency-guide', '/search']) {
  test(`accessible core page: ${path}`, async ({ page }) => {
    await page.goto(path);
    await expect(page.locator('main')).toBeVisible();
    const audit = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    expect(audit.violations).toEqual([]);
  });
}

test('all public routes render and the primary navigation has no dead links', async ({ page }) => {
  const paths = [
    '/how-it-works',
    '/trustscore',
    '/privacy',
    '/terms',
    '/security',
    '/support',
    '/employers',
    '/verifiers',
    '/browser-extension',
    '/get-app',
    '/student-stories',
    '/signup',
    '/reset-password',
    '/reset-password/update',
    '/profile',
    '/settings',
    '/intelligence',
  ];
  for (const path of paths) {
    const response = await page.goto(path);
    expect(response?.status(), path).toBe(200);
    await expect(page.locator('main h1')).toBeVisible();
  }
  await page.goto('/');
  const links = await page
    .locator('header a, footer a')
    .evaluateAll((elements) => [
      ...new Set(
        elements
          .map((element) => element.getAttribute('href'))
          .filter((href): href is string => Boolean(href?.startsWith('/'))),
      ),
    ]);
  for (const href of links) expect((await page.request.get(href)).status(), href).toBe(200);
});
