export function buildIdempotencyKeyHeaders(key: string): {
  'Idempotency-Key': string;
} {
  return { 'Idempotency-Key': key };
}

export function createIdempotencyKey(): string {
  return crypto.randomUUID();
}
