import { MAX_FILE_BYTES, type ScanInput } from './contracts';

/** Sniff the supported signatures instead of trusting the filename or browser MIME value. */
export function validateDocument(input: Extract<ScanInput, { type: 'document' }>): void {
  if (!/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(input.fileData))
    throw new Error('The file could not be read. Select it again.');
  const bytes = Buffer.from(input.fileData, 'base64');
  if (bytes.length === 0 || bytes.length > MAX_FILE_BYTES)
    throw new Error('Choose a file smaller than 2 MB.');
  const signature =
    input.mimeType === 'application/pdf'
      ? bytes.subarray(0, 5).toString() === '%PDF-'
      : input.mimeType === 'image/png'
        ? bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))
        : bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  if (!signature)
    throw new Error('The file contents do not match its declared format. Use a PDF, PNG, or JPEG.');
}
