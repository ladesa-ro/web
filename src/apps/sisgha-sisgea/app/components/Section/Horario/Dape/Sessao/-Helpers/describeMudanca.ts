import type { HorarioEdicaoDiferencaEntradaOutputRestDto } from '@ladesa-ro/web.api.client';

export type CampoDescricao = {
  chave: string;
  rotulo: string;
  antes?: string;
  depois?: string;
};

function humanizarChave(chave: string): string {
  const espacado = chave
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/Id$/, '')
    .trim();

  return espacado.charAt(0).toUpperCase() + espacado.slice(1).toLowerCase();
}

function formatarValor(valor: unknown): string {
  if (valor === null || valor === undefined) return '—';
  if (typeof valor === 'string') return valor;
  if (typeof valor === 'number' || typeof valor === 'boolean') {
    return String(valor);
  }

  return JSON.stringify(valor);
}

export function descreverCampos(
  antes: Record<string, unknown> | undefined,
  depois: Record<string, unknown> | undefined
): CampoDescricao[] {
  const chaves = new Set([
    ...Object.keys(antes ?? {}),
    ...Object.keys(depois ?? {}),
  ]);

  return Array.from(chaves).map(chave => ({
    chave,
    rotulo: humanizarChave(chave),
    antes: antes ? formatarValor(antes[chave]) : undefined,
    depois: depois ? formatarValor(depois[chave]) : undefined,
  }));
}

export function descreverEntrada(
  entrada: HorarioEdicaoDiferencaEntradaOutputRestDto
): CampoDescricao[] {
  return descreverCampos(entrada.antes, entrada.depois);
}
