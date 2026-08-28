import dayjs from 'dayjs';

export type StatusSolicitacao = 'ABERTA' | 'APROVADA' | 'RECUSADA';
export type TipoOperacaoSolicitacao = 'MOVER' | 'REMOVER';

export const STATUS_TABS: { text: string; value: StatusSolicitacao }[] = [
  { text: 'Abertas', value: 'ABERTA' },
  { text: 'Aprovadas', value: 'APROVADA' },
  { text: 'Recusadas', value: 'RECUSADA' },
];

export function formatDataHora(data?: string | null, hora?: string | null) {
  if (!data) return '—';
  const formattedData = dayjs(data).format('DD/MM/YYYY');
  return hora ? `${formattedData} às ${hora.slice(0, 5)}` : formattedData;
}

export function formatTipoOperacao(tipo: TipoOperacaoSolicitacao) {
  return tipo === 'MOVER' ? 'Mover' : 'Remover';
}

export function formatStatus(status: StatusSolicitacao) {
  switch (status) {
    case 'ABERTA':
      return 'Aberta';
    case 'APROVADA':
      return 'Aprovada';
    case 'RECUSADA':
      return 'Recusada';
    default:
      return status;
  }
}
