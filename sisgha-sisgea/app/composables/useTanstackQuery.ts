// this file contains the queryOptions functions that are called in another files
// to learn more, check out the tanstack query docs: https://tanstack.com/query/latest/docs/framework/vue/guides/query-options

import type {
  CampusFindOneByIdData,
  DisciplinaFindOneByIdData,
  TurmaFindOneByIdData,
  UsuarioFindOneByIdData,
} from '@ladesa-ro/api-client-fetch';
import { queryOptions } from '@tanstack/vue-query';

// campi

export const findCampusById = (id: CampusFindOneByIdData) =>
  queryOptions({
    queryKey: ['campus', 'campus::id', id],
    queryFn: async () => await useApiClient().campi.campusFindOneById(id),
  });

// disciplinas

export const findDisciplinaById = (id: DisciplinaFindOneByIdData) =>
  queryOptions({
    queryKey: ['disciplina', 'disciplina::id', id],
    queryFn: async () =>
      await useApiClient().disciplinas.disciplinaFindOneById(id),
  });

// turmas

export const findTurmaById = (id: TurmaFindOneByIdData) =>
  queryOptions({
    queryKey: ['turma', 'turma::id', id],
    queryFn: async () => await useApiClient().turmas.turmaFindOneById(id),
  });

export const listTurmas = () =>
  queryOptions({
    queryKey: ['turma', 'turmas-list'],
    queryFn: async () => await useApiClient().turmas.turmaList(),
  });

// usuários

export const findUserById = (id: UsuarioFindOneByIdData) =>
  queryOptions({
    queryKey: ['user', 'user::id', id],
    queryFn: async () => await useApiClient().usuarios.usuarioFindOneById(id),
  });

export const listUsers = () =>
  queryOptions({
    queryKey: ['user', 'users-list'],
    queryFn: async () => await useApiClient().usuarios.usuarioList(),
  });
