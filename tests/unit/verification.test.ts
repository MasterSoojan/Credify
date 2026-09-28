import { describe, expect, it } from 'vitest';
import { emailDomain, parseWebAddress } from '@/lib/verification/domains';
import { reviewEmail, reviewText, reviewUrl } from '@/lib/verification/local';
import { MAX_FILE_BYTES, scanInputSchema } from '@/lib/verification/contracts';
import { validateDocument } from '@/lib/verification/file';

describe('domain boundaries', () => {
  it.each([
    ['hr@company.co.uk', 'company.co.uk'],
    ['hr@linkedin.com', 'linkedin.com'],
    ['hr@jobs.microsoft.com', 'jobs.microsoft.com'],
    ['HR@EXAMPLE.COM', 'example.com'],
  ])('preserves %s', (email, expected) => expect(emailDomain(email)).toBe(expected));
  it('normalizes international hostnames without claiming company ownership', () =>
    expect(parseWebAddress('https://bücher.example/jobs').hostname).toBe('xn--bcher-kva.example'));
  it.each([
    'javascript:alert(1)',
    'file:///etc/passwd',
    'https://user:pass@example.com',
    'not a link',
    'localhost',
  ])('rejects unsupported address %s', (value) => expect(() => parseWebAddress(value)).toThrow());
  it('keeps deceptive subdomains intact', () =>
    expect(parseWebAddress('https://google.com.attacker.example/').hostname).toBe(
      'google.com.attacker.example',
    ));
});

describe('explainable local review', () => {
  it('shows evidence for payment and urgency without a numeric verdict', () => {
    const result = reviewText('Please pay a registration fee and reply within 2 hours to confirm.');
    expect(result.status).toBe('attention');
    expect(result.findings.map((finding) => finding.id)).toEqual(['payment', 'urgency']);
    expect(result.findings[0].evidence).toBe('registration fee');
    expect(result).not.toHaveProperty('trustScore');
  });
  it('makes ordinary language inconclusive rather than safe', () => {
    const result = reviewText('Thank you for speaking with us. The next interview is on Monday.');
    expect(result.status).toBe('inconclusive');
    expect(result.findings).toEqual([]);
    expect(result.limitations.join(' ')).toContain('not a determination');
  });
  it('explicitly describes contextual false positives', () =>
    expect(
      reviewText('We will never ask you to pay a registration fee.').limitations.join(' '),
    ).toContain('negation'));
  it('does not treat a public email service as proof of fraud', () =>
    expect(reviewEmail('candidate@gmail.com').findings[1].detail).toContain(
      'does not indicate fraud',
    ));
  it('does not authenticate a recognizable domain', () =>
    expect(reviewEmail('hr@google.com').summary).toContain('does not prove'));
  it('does not mark an ordinary HTTPS link safe', () =>
    expect(reviewUrl('https://example.com').status).toBe('inconclusive'));
  it('flags transport and numeric address properties only', () =>
    expect(reviewUrl('http://127.0.0.1').findings.map((finding) => finding.id)).toEqual([
      'hostname',
      'unencrypted',
      'ip-host',
    ]));
});

describe('request and file validation', () => {
  it('rejects unknown modes and unexpected fields', () => {
    expect(scanInputSchema.safeParse({ type: 'anything', email: 'a@b.com' }).success).toBe(false);
    expect(
      scanInputSchema.safeParse({ type: 'email', email: 'a@b.com', userId: 'someone-else' })
        .success,
    ).toBe(false);
  });
  it('bounds text input and requires consent for documents', () => {
    expect(scanInputSchema.safeParse({ type: 'text', text: 'a'.repeat(12_001) }).success).toBe(
      false,
    );
    expect(
      scanInputSchema.safeParse({
        type: 'document',
        fileName: 'test.pdf',
        mimeType: 'application/pdf',
        fileData: 'abcd',
        consent: false,
      }).success,
    ).toBe(false);
  });
  it('checks actual bytes rather than extensions', () => {
    const input = {
      type: 'document' as const,
      fileName: 'offer.pdf',
      mimeType: 'application/pdf' as const,
      fileData: Buffer.from('not a pdf').toString('base64'),
      consent: true as const,
    };
    expect(() => validateDocument(input)).toThrow('contents do not match');
    expect(() =>
      validateDocument({ ...input, fileData: Buffer.from('%PDF-1.7\n').toString('base64') }),
    ).not.toThrow();
  });
  it('rejects malformed encoding and decoded oversize files', () => {
    const input = {
      type: 'document' as const,
      fileName: 'offer.pdf',
      mimeType: 'application/pdf' as const,
      consent: true as const,
    };
    expect(() => validateDocument({ ...input, fileData: 'not-base64!' })).toThrow();
    expect(() =>
      validateDocument({ ...input, fileData: Buffer.alloc(MAX_FILE_BYTES + 1).toString('base64') }),
    ).toThrow('2 MB');
  });
});
