import { describe, expect, it } from 'vitest';
import {
  DAY_PERIODS,
  classifyDayPeriod,
  groupIntervalsByDayPeriod,
} from './time-of-day';

describe('classifyDayPeriod', () => {
  it.each([
    ['00:00', 'Matutino'],
    ['07:30', 'Matutino'],
    ['11:59', 'Matutino'],
    ['12:00', 'Vespertino'],
    ['17:59', 'Vespertino'],
    ['18:00', 'Noturno'],
    ['23:59', 'Noturno'],
  ])('classifica %s como %s', (time, expected) => {
    expect(classifyDayPeriod(time)).toBe(expected);
  });

  it('trata hora sem zero à esquerda', () => {
    expect(classifyDayPeriod('9:05')).toBe('Matutino');
  });

  it('cai no noturno quando a hora não é numérica', () => {
    expect(classifyDayPeriod('sem-hora')).toBe('Noturno');
  });
});

describe('groupIntervalsByDayPeriod', () => {
  it('devolve os três períodos mesmo sem intervalos', () => {
    expect(groupIntervalsByDayPeriod([]).map(g => g.nome)).toEqual([
      ...DAY_PERIODS,
    ]);
  });

  it('separa cada intervalo no seu período', () => {
    const grupos = groupIntervalsByDayPeriod([
      { inicio: '19:00', fim: '19:50' },
      { inicio: '07:30', fim: '08:20' },
      { inicio: '13:00', fim: '13:50' },
    ]);

    expect(grupos.map(g => g.intervalos.length)).toEqual([1, 1, 1]);
    expect(grupos[0]?.intervalos[0]?.inicio).toBe('07:30');
    expect(grupos[2]?.intervalos[0]?.inicio).toBe('19:00');
  });

  it('ordena os intervalos de cada período pelo início', () => {
    const [matutino] = groupIntervalsByDayPeriod([
      { inicio: '08:20', fim: '09:10' },
      { inicio: '07:30', fim: '08:20' },
    ]);

    expect(matutino?.intervalos.map(i => i.inicio)).toEqual(['07:30', '08:20']);
  });

  it('não altera o array recebido', () => {
    const intervalos = [
      { inicio: '08:20', fim: '09:10' },
      { inicio: '07:30', fim: '08:20' },
    ];

    groupIntervalsByDayPeriod(intervalos);

    expect(intervalos.map(i => i.inicio)).toEqual(['08:20', '07:30']);
  });
});
