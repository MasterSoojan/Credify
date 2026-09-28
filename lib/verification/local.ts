import type { Assessment, Finding, ScanInput } from './contracts';
import { emailDomain, isIpAddress, isPublicMailbox, parseWebAddress } from './domains';

const nextSteps = [
  'Find the employer’s careers page independently and confirm that the role is listed.',
  'Contact the company using a phone number or email from its official website.',
  'Do not send money, passwords, one-time codes, or identity documents until you have independently confirmed the request.',
];

/** These explainable rules identify language worth reviewing; they do not classify legitimacy. */
const textRules = [
  {
    id: 'payment',
    pattern:
      /(?:registration|processing|training|security|equipment|joining)\s+(?:fee|deposit|payment)|(?:pay|send|transfer)\s+(?:us\s+)?(?:a\s+)?(?:fee|deposit|money|\$|₹)|gift\s*cards?|crypto(?:currency)?\s+(?:payment|deposit)/i,
    title: 'A payment request deserves a closer look',
    detail:
      'This message mentions money or fees. Verify who is asking and why before paying anything.',
  },
  {
    id: 'urgency',
    pattern:
      /(?:act|respond|reply|pay|confirm)\s+(?:right\s+)?(?:now|immediately)|within\s+\d+\s+(?:hour|minute)s?|(?:last|final)\s+(?:chance|warning)|offer\s+expires/i,
    title: 'Pressure to act quickly',
    detail:
      'A short deadline can discourage independent checks. Ask for time to verify the opportunity.',
  },
  {
    id: 'credentials',
    pattern:
      /(?:share|send|provide|enter)\s+(?:your\s+)?(?:password|otp|one.time\s+(?:code|password)|bank\s+(?:details|login)|credit\s+card)/i,
    title: 'A request for sensitive information',
    detail:
      'Check this request carefully. Passwords and one-time codes should never be shared with a recruiter.',
  },
  {
    id: 'off-platform',
    pattern: /telegram|whatsapp|signal\s+app/i,
    title: 'The conversation mentions a messaging app',
    detail:
      'Messaging apps are also used legitimately, but they do not establish someone’s employer identity. Confirm the recruiter through an independent company channel.',
  },
  {
    id: 'guarantee',
    pattern:
      /guaranteed\s+(?:job|placement|income|hiring)|no\s+interview\s+(?:required|needed)|hired\s+without\s+(?:an?\s+)?interview/i,
    title: 'An unusually easy hiring promise',
    detail:
      'Guaranteed work or an offer without a normal hiring process needs independent confirmation.',
  },
] as const;

function assessment(findings: Finding[], summary: string, limitations: string[]): Assessment {
  return {
    status: findings.some((item) => item.severity === 'warning') ? 'attention' : 'inconclusive',
    summary,
    findings,
    nextSteps,
    limitations,
  };
}

export function reviewText(text: string): Assessment {
  const findings: Finding[] = [];
  for (const rule of textRules) {
    const match = text.match(rule.pattern);
    if (match)
      findings.push({
        id: rule.id,
        title: rule.title,
        detail: rule.detail,
        severity: 'warning',
        evidence: match[0],
      });
  }
  return assessment(
    findings,
    findings.length
      ? 'We found language worth checking before you take the next step.'
      : 'No supported warning patterns were found in this text. The opportunity still needs independent verification.',
    [
      'This is a limited, rule-based review of the words you submitted, not a determination that an offer is real or fake.',
      'Context, negation, other languages, and unfamiliar scam patterns can cause missed signals or false alarms.',
      'No employer records, sender authentication, or external threat databases were checked.',
    ],
  );
}

export function reviewEmail(email: string): Assessment {
  const domain = emailDomain(email);
  const findings: Finding[] = [
    {
      id: 'domain',
      severity: 'info',
      title: 'Email domain identified',
      detail: `The address uses ${domain}. Compare this entire domain with the employer’s independently located website.`,
      evidence: domain,
    },
  ];
  if (isPublicMailbox(domain))
    findings.push({
      id: 'public-mailbox',
      severity: 'warning',
      title: 'A personal email provider',
      detail:
        'This address uses a public mailbox service. That alone does not indicate fraud, but it cannot prove affiliation with an employer.',
    });
  if (domain.includes('xn--'))
    findings.push({
      id: 'international-domain',
      severity: 'warning',
      title: 'Internationalized domain',
      detail:
        'This domain uses an encoded international name. Compare its characters carefully with the employer’s official domain.',
    });
  return assessment(
    findings,
    'An email address tells you which domain is written in it. It does not prove who sent a message.',
    [
      'No mailbox ownership, message headers, DNS records, or employer registry were checked.',
      'A familiar company domain in pasted text can be copied or spoofed.',
    ],
  );
}

export function reviewUrl(input: string): Assessment {
  const url = parseWebAddress(input);
  const findings: Finding[] = [
    {
      id: 'hostname',
      severity: 'info',
      title: 'Check the full website name',
      detail: `The hostname is ${url.hostname}. Company names in the path or before another domain do not establish ownership.`,
      evidence: url.hostname,
    },
  ];
  if (url.protocol === 'http:')
    findings.push({
      id: 'unencrypted',
      severity: 'warning',
      title: 'An unencrypted HTTP address',
      detail: 'The submitted address does not use HTTPS. Do not enter personal information on it.',
    });
  if (isIpAddress(url.hostname))
    findings.push({
      id: 'ip-host',
      severity: 'warning',
      title: 'A numeric network address',
      detail:
        'This link uses a network address rather than a recognizable company domain. Confirm its purpose independently.',
    });
  if (url.hostname.includes('xn--'))
    findings.push({
      id: 'international-domain',
      severity: 'warning',
      title: 'Internationalized domain',
      detail:
        'This address contains an encoded international domain. Lookalike characters can be difficult to distinguish.',
    });
  return assessment(findings, 'We inspected the structure of this address without opening it.', [
    'This is not a malware or reputation scan. The website was not visited.',
    'HTTPS and an ordinary-looking domain do not establish that a website or job offer is legitimate.',
  ]);
}

export function reviewLocally(input: Exclude<ScanInput, { type: 'document' }>): Assessment {
  switch (input.type) {
    case 'text':
      return reviewText(input.text);
    case 'email':
      return reviewEmail(input.email);
    case 'url':
      return reviewUrl(input.url);
  }
}
