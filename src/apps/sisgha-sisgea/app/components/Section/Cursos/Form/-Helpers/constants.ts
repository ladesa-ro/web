export const DURACAO_LABELS: Record<number, string> = {
  12: 'Anual',
  6: 'Semestral',
  4: 'Quadrimestral',
};

export function getDuracaoLabel(meses: number | null | undefined): string {
  if (!meses) return '';
  return DURACAO_LABELS[meses] ?? `${meses} meses`;
}

export function getQuantidadePeriodosLabel(meses: number | null | undefined): string {
  if (meses === 12) return 'Quantidade de períodos (anos)';
  if (meses === 6) return 'Quantidade de períodos (semestres)';
  if (meses === 4) return 'Quantidade de períodos (quadrimestres)';
  if (meses) return `Quantidade de períodos (${meses} meses)`;
  return 'Quantidade de períodos';
}
