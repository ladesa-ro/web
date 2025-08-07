// this file contains the queryOptions functions that are called in another files
// to learn more, check out the tanstack query docs: https://tanstack.com/query/latest/docs/framework/vue/guides/query-options

import type {
  TurmaFindOneByIdData,
  UsuarioFindOneByIdData,
} from '@ladesa-ro/api-client-fetch';
import { queryOptions } from '@tanstack/vue-query';

// usuários

export const findUserById = (id: UsuarioFindOneByIdData) => {
  return queryOptions({
    queryKey: ['user', 'user::id', id],
    queryFn: async () => await useApiClient().usuarios.usuarioFindOneById(id),
  });
};

export const listUsers = () => {
  return queryOptions({
    queryKey: ['user', 'users-list'],
    queryFn: async () => await useApiClient().usuarios.usuarioList(),
  });
}

// turmas

export const findTurmaById = (id: TurmaFindOneByIdData) => {
  return queryOptions({
    queryKey: ['turma', 'turma::id', id],
    queryFn: async () => await useApiClient().turmas.turmaFindOneById(id),
  });
};

export const listTurmas = () => {
  return queryOptions({
    queryKey: ['turma', 'turmas-list'],
    queryFn: async () => await useApiClient().turmas.turmaList(),
  });
};
