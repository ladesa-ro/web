import { useQuery, type UseQueryReturnType } from '@tanstack/vue-query';
import { createInvalidate } from '~/composables/query-helpers';
import type { InvalidateFn } from '~/composables/query-helpers';
import {
  notificacaoFindAll,
  notificacaoContagemNaoLidas,
  notificacaoMarcarLida,
} from '@ladesa-ro/web.api.client';

export interface INotificacao {
  id: string;
  titulo: string;
  conteudo: string;
  lida: boolean;
  idUsuarioFk?: string;
  dateCreated: string;
}

export interface INotificacaoFindAllOutputDto {
  data: INotificacao[];
}

export interface INotificacaoContagemNaoLidasOutputDto {
  count: number;
}

type FindAllFn = () => UseQueryReturnType<INotificacaoFindAllOutputDto, Error>;

type ContagemNaoLidasFn = () => UseQueryReturnType<
  INotificacaoContagemNaoLidasOutputDto,
  Error
>;

type MarcarLidaFn = (id: string) => Promise<unknown>;

export type IUseNotificacoes = {
  keys: readonly string[];
  findAll: FindAllFn;
  contagemNaoLidas: ContagemNaoLidasFn;
  marcarLida: MarcarLidaFn;
  marcarTodasLidas: (ids: string[]) => Promise<void>;
  invalidate: InvalidateFn;
};

export const useNotificacoes = (): IUseNotificacoes => {
  const api = useApiClient();

  const keys = ['notificacoes'] as const;

  const findAll: FindAllFn = () => {
    return useQuery({
      queryKey: [...keys, 'list'],
      queryFn: () =>
        api.call(notificacaoFindAll) as Promise<INotificacaoFindAllOutputDto>,
      refetchInterval: 60000,
    });
  };

  const contagemNaoLidas: ContagemNaoLidasFn = () => {
    return useQuery({
      queryKey: [...keys, 'contagem-nao-lidas'],
      queryFn: () =>
        api.call(
          notificacaoContagemNaoLidas
        ) as Promise<INotificacaoContagemNaoLidasOutputDto>,
      refetchInterval: 60000,
    });
  };

  const marcarLida: MarcarLidaFn = id =>
    api.call(notificacaoMarcarLida, { path: { id } });

  const invalidate = createInvalidate(keys);

  const marcarTodasLidas = async (ids: string[]) => {
    await Promise.all(ids.map(id => marcarLida(id)));
    await invalidate();
  };

  return {
    keys,
    findAll,
    contagemNaoLidas,
    marcarLida,
    marcarTodasLidas,
    invalidate,
  };
};
