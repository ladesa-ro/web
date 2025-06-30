// this file contains the queryOptions functions that are called in another files
// to learn more, check out the tanstack query docs: https://tanstack.com/query/latest/docs/framework/vue/guides/query-options

import type { UsuarioFindOneByIdData } from '@ladesa-ro/api-client-fetch';
import { queryOptions } from '@tanstack/vue-query';

export const findUserById = (id: UsuarioFindOneByIdData) => {
  return queryOptions({
    queryKey: ['user', 'user::id', id],
    queryFn: async () => await useApiClient().usuarios.usuarioFindOneById(id),
  });
};
