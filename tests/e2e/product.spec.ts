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
  await expect(page.getByText('Document analysis is unavailable right now.')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Take a closer look' })).toBeDisabled();
});

test('editing a review returns focus to the preserved input', async ({ page }) => {
  await page.goto('/demo');
  const input = page.getByLabel('What does the offer say?');
  const original = await input.inputValue();
  await page.getByRole('button', { name: 'Take a closer look' }).click();
  await expect(page.locator('.result-region')).toBeFocused();
  await page.getByRole('button', { name: 'Edit input' }).click();
  await expect(input).toBeFocused();
  await expect(input).toHaveValue(original);
  await expect(page.locator('.result-region')).toHaveCount(0);
  await page.getByRole('button', { name: 'Take a closer look' }).click();
  await expect(page.getByRole('heading', { name: 'Worth a closer look.' })).toBeVisible();
});

test('changed inputs cannot display a report for the previous submission', async ({ page }) => {
  const cases = [
    {
      path: '/demo',
      label: 'What does the offer say?',
      value: 'We invite you to discuss the role with our team.',
    },
    {
      path: '/job-scanner?type=email',
      label: 'Recruiter’s email address',
      value: 'recruiter@example.com',
    },
    { path: '/instant-verify', label: 'Website or offer link', value: 'https://example.com/jobs' },
  ];
  for (const item of cases) {
    await page.goto(item.path);
    const input = page.getByLabel(item.label);
    await input.fill(item.value);
    await page.getByRole('button', { name: 'Take a closer look' }).click();
    await expect(page.locator('.result-region')).toBeVisible();
    await input.fill('Changed input');
    await expect(page.locator('.result-region')).toHaveCount(0);
  }
  await page.getByLabel('Website or offer link').fill('javascript:alert(1)');
  await page.getByRole('button', { name: 'Take a closer look' }).click();
  await expect(page.locator('main').getByRole('alert')).toBeVisible();
  await page.getByLabel('Website or offer link').fill('https://example.com/careers');
  await expect(page.locator('main').getByRole('alert')).toHaveCount(0);
});

test('disabled account pages never fake sign-in or password success', async ({ page }) => {
  const outgoing: string[] = [];
  page.on('request', (request) => {
    if (request.url().includes('supabase')) outgoing.push(request.url());
  });
  await page.goto('/login');
  await expect(page.getByText('Sign-in is unavailable right now.')).toBeVisible();
  await expect(page.locator('input[type=password]')).toHaveCount(0);
  await page.goto('/settings');
  await expect(page.getByText('Account services are unavailable right now.')).toBeVisible();
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

test('desktop navigation leads directly to a review and the logo leads home', async ({ page }) => {
  await page.goto('/');
  const nav = page.getByRole('navigation', { name: 'Main navigation' });
  await expect(nav.getByRole('link', { name: 'Home', exact: true })).toHaveCount(0);
  await expect(nav.getByRole('button')).toHaveCount(0);
  await nav.getByRole('link', { name: 'Verifiers', exact: true }).click();
  await expect(page).toHaveURL(/\/verifiers$/);
  await expect(page.getByRole('heading', { name: 'Our Verifiers.' })).toBeVisible();
  await expect(nav.getByRole('link', { name: 'Verifiers', exact: true })).toHaveAttribute(
    'aria-current',
    'page',
  );
  await nav.getByRole('link', { name: 'Check an offer' }).click();
  await expect(page).toHaveURL(/\/job-scanner$/);
  await expect(nav.getByRole('link', { name: 'Check an offer' })).toHaveAttribute(
    'aria-current',
    'page',
  );
  await page.getByRole('link', { name: 'Credify home', exact: true }).click();
  await expect(page).toHaveURL('/');
});

test('mobile navigation opens the walkthrough in one step and closes after navigation', async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');
  await page.getByRole('button', { name: 'Open navigation' }).click();
  const nav = page.getByRole('navigation', { name: 'Mobile navigation' });
  await expect(nav.getByRole('link', { name: 'Home', exact: true })).toHaveCount(0);
  await expect(nav.getByRole('button')).toHaveCount(0);
  await nav.getByRole('link', { name: 'Verifiers', exact: true }).click();
  await expect(page).toHaveURL(/\/verifiers$/);
  await expect(page.getByRole('heading', { name: 'Our Verifiers.' })).toBeVisible();
  await expect(nav).toHaveCount(0);
  await page.getByRole('button', { name: 'Open navigation' }).click();
  await expect(nav.getByRole('link', { name: 'Verifiers', exact: true })).toHaveAttribute(
    'aria-current',
    'page',
  );
  await nav.getByRole('link', { name: 'How it works' }).click();
  await expect(page).toHaveURL(/\/how-it-works$/);
  await expect(nav).toHaveCount(0);
  await expect(
    page.getByRole('list', { name: 'From offer to next step' }).getByRole('listitem'),
  ).toHaveCount(3);
  await page.getByRole('button', { name: 'Open navigation' }).click();
  await nav.getByRole('link', { name: 'Check an offer' }).click();
  await expect(page.getByLabel('What does the offer say?')).toBeVisible();
  await expect(nav).toHaveCount(0);
});

test('the landing page reveals the process and leads into a working example', async ({ page }) => {
  const outgoing: string[] = [];
  page.on('request', (request) => {
    if (request.method() === 'POST') outgoing.push(request.url());
  });
  await page.goto('/');
  await expect(page.getByText('Worth a closer look.', { exact: true })).toBeVisible();
  await page.getByRole('link', { name: 'See how it works', exact: true }).click();
  await expect(page).toHaveURL(/#how-it-works$/);
  const walkthrough = page.getByRole('region', { name: 'From “is this real?” to a next step.' });
  await expect(
    walkthrough.getByRole('heading', { name: 'Paste what you received.' }),
  ).toBeInViewport();
  await expect(walkthrough.getByRole('listitem')).toHaveCount(3);
  const heading = await page.locator('#walkthrough-heading').boundingBox();
  expect(heading!.y).toBeGreaterThan(76);
  await page.getByRole('link', { name: 'See what each check covers' }).click();
  await expect(page).toHaveURL(/\/how-it-works$/);
  await page.getByRole('link', { name: 'Try it with an example' }).click();
  await expect(page).toHaveURL(/\/demo$/);
  await page.getByRole('button', { name: 'Take a closer look' }).click();
  await expect(page.getByRole('heading', { name: 'Worth a closer look.' })).toBeVisible();
  expect(outgoing).toEqual([]);
});

for (const path of [
  '/',
  '/how-it-works',
  '/job-scanner',
  '/login',
  '/help-center',
  '/emergency-guide',
  '/search',
]) {
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
