import {
  createListQuery,
  createInfiniteListQuery,
  createFindOneQuery,
  createInvalidate,
} from '~/composables/query-helpers';
import type {
  ListFn,
  ListInfiniteFn,
  FindOneFn,
  CreateFn,
  UpdateFn,
  RemoveFn,
  InvalidateFn,
} from '~/composables/query-helpers';
import type {
  ModalidadeFindAllData,
  ModalidadeFindAllResponse,
  ModalidadeFindByIdResponse,
  ModalidadeCreateData,
  ModalidadeCreateResponse,
  ModalidadeUpdateData,
  ModalidadeUpdateResponse,
} from '@ladesa-ro/web.api.client';

export type IUseModalidades = {
  keys: readonly string[];
  list: ListFn<ModalidadeFindAllResponse, ModalidadeFindAllData>;
  listInfinite: ListInfiniteFn<
    ModalidadeFindAllResponse,
    ModalidadeFindAllData
  >;
  findOne: FindOneFn<ModalidadeFindByIdResponse>;
  create: CreateFn<
    ModalidadeCreateData['requestBody'],
    ModalidadeCreateResponse
  >;
  update: UpdateFn<
    ModalidadeUpdateData['requestBody'],
    ModalidadeUpdateResponse
  >;
  remove: RemoveFn;
  invalidate: InvalidateFn;
};

export const useModalidades = (): IUseModalidades => {
  const api = useApiClient();

  const keys = ['modalidades'] as const;

  const list = createListQuery({
    queryKey: keys,
    fetcher: (params?: ModalidadeFindAllData) =>
      api.modalidades.modalidadeFindAll(params),
  });

  const listInfinite = createInfiniteListQuery({
    queryKey: keys,
    fetcher: (params: ModalidadeFindAllData & { page: number }) =>
      api.modalidades.modalidadeFindAll(params),
  });

  const findOne = createFindOneQuery({
    queryKey: keys,
    fetcher: (id: string) => api.modalidades.modalidadeFindById({ id }),
  });

  const create = (data: ModalidadeCreateData['requestBody']) =>
    api.modalidades.modalidadeCreate({ requestBody: data });

  const update = (id: string, data: ModalidadeUpdateData['requestBody']) =>
    api.modalidades.modalidadeUpdate({ id, requestBody: data });

  const remove = (id: string) =>
    api.modalidades.modalidadeDeleteOneById({ id });

  const invalidate = createInvalidate(keys);

  return {
    keys,
    list,
    listInfinite,
    findOne,
    create,
    update,
    remove,
    invalidate,
  };
};
