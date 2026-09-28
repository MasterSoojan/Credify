import type { Metadata } from 'next';
import { z } from 'zod';
import { PageIntro, Notice, TextLink } from '@/components/ui';
export const metadata: Metadata = { title: 'Security reading' };
export const dynamic = 'force-dynamic';
const articleSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  url: z.url().refine((value) => {
    const url = new URL(value);
    return url.protocol === 'https:' && url.hostname === 'dev.to';
  }),
  published_at: z.string(),
  reading_time_minutes: z.number(),
  user: z.object({ name: z.string() }),
});
async function loadArticles() {
  try {
    const response = await fetch('https://dev.to/api/articles?tag=security&per_page=6', {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(4000),
    });
    if (!response.ok) return [];
    const data = z.array(articleSchema).safeParse(await response.json());
    return data.success ? data.data : [];
  } catch {
    return [];
  }
}
export default async function IntelligencePage() {
  const articles = await loadArticles();
  return (
    <main className="container page-main">
      <PageIntro
        eyebrow="Read a little further"
        title="A wider perspective on digital safety."
        description="Community security articles from DEV Community. These are external perspectives, not a live threat feed or verified incident reports."
      />
      {articles.length ? (
        <div className="cards-grid">
          {articles.map((article) => (
            <article className="feature-card" key={article.id}>
              <span className="badge" style={{ marginBottom: 20 }}>
                DEV Community · {article.reading_time_minutes} min read
              </span>
              <h2 style={{ fontSize: 21, marginBottom: 14 }}>{article.title}</h2>
              <p>{article.description}</p>
              <p className="small">
                By {article.user.name} ·{' '}
                {new Date(article.published_at).toLocaleDateString('en', {
                  dateStyle: 'medium',
                  timeZone: 'UTC',
                })}
              </p>
              <a className="text-link" href={article.url} target="_blank" rel="noreferrer">
                Read on DEV Community ↗
              </a>
            </article>
          ))}
        </div>
      ) : (
        <Notice title="The reading feed is unavailable right now.">
          You can still browse our safety hub and independent guidance while the community feed
          returns.
        </Notice>
      )}
      <div className="resource-band">
        <div>
          <h2>Keep the basics close.</h2>
          <p>
            Clear, practical guidance for checking recruiter messages and deciding what to do next.
          </p>
        </div>
        <TextLink href="/help-center">Visit the safety hub</TextLink>
      </div>
    </main>
  );
}
