import { PGlite } from '@electric-sql/pglite';
import { beforeAll, afterAll, beforeEach, describe, expect, it } from 'vitest';
import { readFile } from 'node:fs/promises';

const alice = '11111111-1111-4111-8111-111111111111';
const bob = '22222222-2222-4222-8222-222222222222';
let db: PGlite;
async function asUser(id: string) {
  await db.exec(
    `SET ROLE authenticated; SELECT set_config('request.jwt.claim.sub', '${id}', false);`,
  );
}

beforeAll(async () => {
  db = new PGlite();
  // Model the Supabase auth identity and API roles using real PostgreSQL RLS evaluation.
  // This does not emulate GoTrue, email delivery, PostgREST, or a hosted project's existing grants.
  await db.exec(`CREATE ROLE anon; CREATE ROLE authenticated; CREATE SCHEMA auth;
    CREATE TABLE auth.users (id uuid PRIMARY KEY, email text UNIQUE, raw_user_meta_data jsonb DEFAULT '{}');
    CREATE FUNCTION auth.uid() RETURNS uuid LANGUAGE sql STABLE AS $$ SELECT nullif(current_setting('request.jwt.claim.sub', true), '')::uuid $$;
    GRANT USAGE ON SCHEMA auth, public TO anon, authenticated;
    GRANT EXECUTE ON FUNCTION auth.uid() TO anon, authenticated;`);
  for (const file of ['01_schema.sql', '02_security.sql', '03_seed_data.sql'])
    await db.exec(await readFile(`supabase/migrations/${file}`, 'utf8'));
  await db.exec(`GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
    INSERT INTO auth.users (id,email,raw_user_meta_data) VALUES ('${alice}','alice@example.com','{"display_name":"Alice"}'),('${bob}','bob@example.com','{"display_name":"Bob"}');`);
  await db.exec(await readFile('supabase/migrations/202609270001_harden_profiles.sql', 'utf8'));
});
beforeEach(async () => {
  await db.exec('RESET ROLE');
});
afterAll(async () => {
  await db.close();
});

describe('forward migration and profile ownership', () => {
  it('backfills existing Auth users', async () => {
    const data = await db.query('SELECT id, display_name FROM public.users_custom ORDER BY email');
    expect(data.rows).toEqual([
      { id: alice, display_name: 'Alice' },
      { id: bob, display_name: 'Bob' },
    ]);
  });
  it('denies anonymous reads and mutations', async () => {
    await db.exec('SET ROLE anon');
    await expect(db.query('SELECT * FROM public.users_custom')).rejects.toThrow(
      /permission denied/,
    );
    await expect(
      db.query("UPDATE public.users_custom SET display_name='attacker'"),
    ).rejects.toThrow(/permission denied/);
    await expect(db.query('DELETE FROM public.users_custom')).rejects.toThrow(/permission denied/);
  });
  it('lets a user read only their own profile', async () => {
    await asUser(alice);
    const data = await db.query('SELECT id FROM public.users_custom');
    expect(data.rows).toEqual([{ id: alice }]);
  });
  it('allows profile edits but not identity reassignment or cross-user changes', async () => {
    await asUser(alice);
    const own = await db.query("UPDATE public.users_custom SET location='London' RETURNING id");
    expect(own.rows).toEqual([{ id: alice }]);
    const other = await db.query(
      'UPDATE public.users_custom SET location=$1 WHERE id=$2 RETURNING id',
      ['Paris', bob],
    );
    expect(other.rows).toEqual([]);
    await expect(
      db.query('UPDATE public.users_custom SET email=$1', ['changed@example.com']),
    ).rejects.toThrow(/permission denied/);
    await expect(db.query('UPDATE public.users_custom SET id=$1', [bob])).rejects.toThrow(
      /permission denied/,
    );
  });
  it('denies direct profile creation and deletion by authenticated users', async () => {
    await asUser(alice);
    await expect(db.query('DELETE FROM public.users_custom WHERE id=$1', [alice])).rejects.toThrow(
      /permission denied/,
    );
    await expect(
      db.query('INSERT INTO public.users_custom(id,email,user_id) VALUES($1,$2,$3)', [
        '33333333-3333-4333-8333-333333333333',
        'test@example.com',
        'test',
      ]),
    ).rejects.toThrow(/permission denied/);
  });
  it('provisions new users and cascades Auth deletion', async () => {
    const id = '44444444-4444-4444-8444-444444444444';
    await db.query('INSERT INTO auth.users(id,email) VALUES($1,$2)', [id, 'new@example.com']);
    expect((await db.query('SELECT id FROM public.users_custom WHERE id=$1', [id])).rows).toEqual([
      { id },
    ]);
    await db.query('DELETE FROM auth.users WHERE id=$1', [id]);
    expect((await db.query('SELECT id FROM public.users_custom WHERE id=$1', [id])).rows).toEqual(
      [],
    );
  });
});

describe('public registry evidence', () => {
  it('rejects approval without an expiry or a meaningful evidence method', async () => {
    await expect(
      db.query(
        "UPDATE public.verified_companies SET verification_status='verified', verified_at=now(), verification_method='Reviewed' WHERE domain='google.com'",
      ),
    ).rejects.toThrow(/verified_company_evidence/);
    await expect(
      db.query(
        "UPDATE public.verified_companies SET verification_status='verified', verified_at=now(), expires_at=now()+interval '1 day', verification_method='  ' WHERE domain='google.com'",
      ),
    ).rejects.toThrow(/verified_company_evidence/);
  });
  it('does not expose seeded company names as verified', async () => {
    await db.exec('SET ROLE anon');
    expect((await db.query('SELECT domain FROM public.verified_companies')).rows).toEqual([]);
    await expect(db.query('SELECT trust_score FROM public.verified_companies')).rejects.toThrow(
      /permission denied/,
    );
  });
  it('only exposes approved, unexpired records', async () => {
    await db.exec(
      "UPDATE public.verified_companies SET verification_status='verified', verified_at=now(), expires_at=now()+interval '1 day', verification_method='Test fixture' WHERE domain='google.com'",
    );
    await db.exec(
      "UPDATE public.verified_companies SET verification_status='verified', verified_at=now()-interval '2 days', expires_at=now()-interval '1 day', verification_method='Test fixture' WHERE domain='apple.com'",
    );
    await db.exec('SET ROLE anon');
    expect((await db.query('SELECT domain FROM public.verified_companies')).rows).toEqual([
      { domain: 'google.com' },
    ]);
    await expect(
      db.query("UPDATE public.verified_companies SET verification_status='verified'"),
    ).rejects.toThrow(/permission denied/);
  });
});
