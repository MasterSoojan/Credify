/** Parse, never fetch, submitted URLs. No untrusted address becomes a server request. */
export function parseWebAddress(input: string): URL {
  const value = input.trim();
  const withProtocol = /^[a-z][a-z\d+.-]*:/i.test(value) ? value : `https://${value}`;
  let url: URL;
  try {
    url = new URL(withProtocol);
  } catch {
    throw new Error('Enter a complete website address, such as https://example.com/jobs.');
  }
  if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password) {
    throw new Error('Use an HTTP or HTTPS address without embedded sign-in details.');
  }
  if (!url.hostname.includes('.') || /\s/.test(value)) {
    throw new Error('Enter a public website address with a complete domain name.');
  }
  return url;
}

export function emailDomain(email: string): string {
  // Validation happens at the request boundary. Preserve the complete domain, including subdomains.
  return email
    .slice(email.lastIndexOf('@') + 1)
    .toLowerCase()
    .replace(/\.$/, '');
}

export function isPublicMailbox(domain: string): boolean {
  return new Set([
    'gmail.com',
    'yahoo.com',
    'hotmail.com',
    'outlook.com',
    'live.com',
    'icloud.com',
    'proton.me',
    'protonmail.com',
    'aol.com',
  ]).has(domain);
}

export function isIpAddress(hostname: string): boolean {
  return /^\d{1,3}(\.\d{1,3}){3}$/.test(hostname) || hostname.startsWith('[');
}
