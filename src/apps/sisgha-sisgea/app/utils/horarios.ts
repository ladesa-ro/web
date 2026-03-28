export type Periodo = 'Matutino' | 'Vespertino' | 'Noturno';

export type Intervalo = { inicio: string; fim: string };

export type PeriodoGroup = {
  nome: Periodo;
  intervalos: Intervalo[];
};

export function classificarPeriodo(inicio: string): Periodo {
  const hour = parseInt(inicio.split(':')[0] ?? '0', 10);
  if (hour < 12) return 'Matutino';
  if (hour < 18) return 'Vespertino';
  return 'Noturno';
}

export function agruparPorPeriodo(intervalos: Intervalo[]): PeriodoGroup[] {
  const groups: Record<Periodo, Intervalo[]> = {
    Matutino: [],
    Vespertino: [],
    Noturno: [],
  };

  for (const i of intervalos) {
    groups[classificarPeriodo(i.inicio)].push(i);
  }

  for (const g of Object.values(groups)) {
    g.sort((a, b) => a.inicio.localeCompare(b.inicio));
  }

  return (['Matutino', 'Vespertino', 'Noturno'] as Periodo[]).map(nome => ({
    nome,
    intervalos: groups[nome],
  }));
}

export function achatarPeriodos(periodos: PeriodoGroup[]): Intervalo[] {
  return periodos.flatMap(p => p.intervalos);
}

export function validarIntervalos(intervalos: Intervalo[]): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  for (const i of intervalos) {
    if (!i.inicio || !i.fim) {
      errors.push(`Intervalo incompleto: início e término são obrigatórios.`);
      continue;
    }
    if (i.inicio >= i.fim) {
      errors.push(
        `Intervalo ${i.inicio}-${i.fim}: início deve ser anterior ao término.`
      );
    }
  }

  const sorted = [...intervalos]
    .filter(i => i.inicio && i.fim)
    .sort((a, b) => a.inicio.localeCompare(b.inicio));

  for (let i = 0; i < sorted.length - 1; i++) {
    const current = sorted[i]!;
    const next = sorted[i + 1]!;
    if (current.fim > next.inicio) {
      errors.push(
        `Sobreposição entre ${current.inicio}-${current.fim} e ${next.inicio}-${next.fim}.`
      );
    }
  }

  return { valid: errors.length === 0, errors };
}

export function toApiFormat(time: string): string {
  return time.length === 5 ? `${time}:00` : time;
}

export function toDisplayFormat(time: string): string {
  return time.substring(0, 5);
}
