import { describe, expect, it } from 'vitest';
import { ensureSeconds, stripSeconds } from './time-format';

describe('ensureSeconds', () => {
  it('acrescenta os segundos quando faltam', () => {
    expect(ensureSeconds('07:30')).toBe('07:30:00');
  });

  it('deixa intacto o horário que já tem segundos', () => {
    expect(ensureSeconds('07:30:45')).toBe('07:30:45');
  });

  it('não mexe em texto de outro tamanho', () => {
    expect(ensureSeconds('7:30')).toBe('7:30');
    expect(ensureSeconds('')).toBe('');
  });
});

describe('stripSeconds', () => {
  it('corta os segundos', () => {
    expect(stripSeconds('07:30:45')).toBe('07:30');
  });

  it('deixa intacto o horário já sem segundos', () => {
    expect(stripSeconds('07:30')).toBe('07:30');
  });

  it('devolve vazio para entrada vazia', () => {
    expect(stripSeconds('')).toBe('');
  });
});
