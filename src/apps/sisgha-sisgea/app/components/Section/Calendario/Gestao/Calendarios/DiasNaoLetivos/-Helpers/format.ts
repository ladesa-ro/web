import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import type { CalendarioLetivoDiaFindOneOutputDto } from '@ladesa-ro/web.api.client';

dayjs.locale('pt-br');

export function formatDate(data: string): string {
  return dayjs(data).format('DD/MM/YYYY');
}

export function formatDateShort(data: string): string {
  return dayjs(data).format('ddd, D MMM');
}

// TODO: remove Record cast after SDK regeneration includes 'cor' field in CalendarioLetivoDiaFindOneOutputDto
export function getDotColor(dia: CalendarioLetivoDiaFindOneOutputDto): string {
  return ((dia as Record<string, unknown>).cor as string) ?? '#6b7280';
}

export function getDiaLabel(dia: CalendarioLetivoDiaFindOneOutputDto): string {
  return dia.feriado || 'Dia não letivo';
}
