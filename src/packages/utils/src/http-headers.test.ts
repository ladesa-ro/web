import { describe, expect, it } from 'vitest';
import {
  buildIdempotencyKeyHeaders,
  buildIfMatchHeaders,
  createIdempotencyKey,
} from './http-headers';

describe('createIdempotencyKey', () => {
  it('gera um uuid diferente a cada chamada', () => {
    const first = createIdempotencyKey();
    const second = createIdempotencyKey();

    expect(first).toMatch(/^[0-9a-f-]{36}$/);
    expect(first).not.toBe(second);
  });
});

describe('buildIdempotencyKeyHeaders', () => {
  it('monta o header com a chave recebida', () => {
    expect(buildIdempotencyKeyHeaders('abc')).toEqual({
      'Idempotency-Key': 'abc',
    });
  });
});

describe('buildIfMatchHeaders', () => {
  it('converte a versão para texto', () => {
    expect(buildIfMatchHeaders(7)).toEqual({ 'if-match': '7' });
  });
});
