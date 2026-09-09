export function createIdempotencyKey(): string {
  return crypto.randomUUID();
}

export function buildIdempotencyKeyHeaders(key: string): {
  'Idempotency-Key': string;
} {
  return { 'Idempotency-Key': key };
}

export function buildIfMatchHeaders(version: number): { 'if-match': string } {
  return { 'if-match': String(version) };
}
