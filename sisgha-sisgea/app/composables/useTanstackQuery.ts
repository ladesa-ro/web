// this file contains the queryOptions functions that are called in another files
// to learn more, check out the tanstack query docs: https://tanstack.com/query/latest/docs/framework/vue/guides/query-options

import type {
  CampusFindOneByIdData,
  CursoFindOneByIdData,
  CursoListData,
  DisciplinaFindOneByIdData,
  OfertaFormacaoFindOneByIdData,
  OfertaFormacaoListData,
  TurmaFindOneByIdData,
  TurmaListData,
  UsuarioFindOneByIdData,
  UsuarioListData,
} from '@ladesa-ro/management-service-client';
import { queryOptions } from '@tanstack/vue-query';

const apiClient = useApiClient();

// campi

export const findCampusById = (id: CampusFindOneByIdData) =>
  queryOptions({
    queryKey: ['campus', 'campus::id', id],
    queryFn: async () => await apiClient.campi.campusFindOneById(id),
  });

// cursos

export const findCursoById = (id: CursoFindOneByIdData) =>
  queryOptions({
    queryKey: ['curso', 'curso::id', id],
    queryFn: async () => await apiClient.cursos.cursoFindOneById(id),
  });

export const listCursos = (filter?: CursoListData) =>
  queryOptions({
    queryKey: ['cursos', 'cursos-list'],
    queryFn: async () => await apiClient.cursos.cursoList(filter),
  });

// disciplinas

export const findDisciplinaById = (id: DisciplinaFindOneByIdData) =>
  queryOptions({
    queryKey: ['disciplina', 'disciplina::id', id],
    queryFn: async () => await apiClient.disciplinas.disciplinaFindOneById(id),
  });

// formações

export const findOfertaFormacaoById = (id: OfertaFormacaoFindOneByIdData) =>
  queryOptions({
    queryKey: ['oferta-formacao', 'oferta-formacao::id', id],
    queryFn: async () =>
      await apiClient.ofertasFormacoes.ofertaFormacaoFindOneById(id),
  });

export const listOfertasFormacao = (filter?: OfertaFormacaoListData) =>
  queryOptions({
    queryKey: ['ofertas-formacao', 'oferta-formacao-list'],
    queryFn: async () =>
      await apiClient.ofertasFormacoes.ofertaFormacaoList(filter),
  });

// turmas

export const findTurmaById = (id: TurmaFindOneByIdData) =>
  queryOptions({
    queryKey: ['turma', 'turma::id', id],
    queryFn: async () => await apiClient.turmas.turmaFindOneById(id),
  });

export const listTurmas = (filter?: TurmaListData) =>
  queryOptions({
    queryKey: ['turma', 'turmas-list'],
    queryFn: async () => await apiClient.turmas.turmaList(filter),
  });

// usuários

export const findUserById = (id: UsuarioFindOneByIdData) =>
  queryOptions({
    queryKey: ['user', 'user::id', id],
    queryFn: async () => await apiClient.usuarios.usuarioFindOneById(id),
  });

export const listUsers = (filter?: UsuarioListData) =>
  queryOptions({
    queryKey: ['user', 'users-list'],
    queryFn: async () => await apiClient.usuarios.usuarioList(filter),
  });
