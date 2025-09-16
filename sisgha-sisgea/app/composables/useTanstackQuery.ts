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

// campi

export const findCampusById = (id: CampusFindOneByIdData, apiClient = useApiClient()) =>
  queryOptions({
    queryKey: ['campus', 'campus::id', id],
    queryFn: async () => await apiClient.campi.campusFindOneById(id),
  });

// cursos

export const findCursoById = (id: CursoFindOneByIdData, apiClient = useApiClient()) =>
  queryOptions({
    queryKey: ['curso', 'curso::id', id],
    queryFn: async () => await apiClient.cursos.cursoFindOneById(id),
  });

export const listCursos = (filter?: ComputedRef<CursoListData>, apiClient: ApiClient = useApiClient()) =>
  queryOptions({
    queryKey: ['cursos', 'cursos-list', filter],
    queryFn: async () => await apiClient.cursos.cursoList(unref(filter)),
  });

// disciplinas

export const findDisciplinaById = (id: DisciplinaFindOneByIdData, apiClient = useApiClient()) =>
  queryOptions({
    queryKey: ['disciplina', 'disciplina::id', id],
    queryFn: async () =>
      await apiClient.disciplinas.disciplinaFindOneById(id),
  });

// formações

export const findOfertaFormacaoById = (id: OfertaFormacaoFindOneByIdData, apiClient = useApiClient()) =>
  queryOptions({
    queryKey: ['oferta-formacao', 'oferta-formacao::id', id],
    queryFn: async () =>
      await apiClient.ofertasFormacoes.ofertaFormacaoFindOneById(id),
  });

export const listOfertasFormacao = (filter?: ComputedRef<OfertaFormacaoListData>, apiClient: ApiClient = useApiClient()) =>
  queryOptions({
    queryKey: ['ofertas-formacao', 'oferta-formacao-list', filter],
    queryFn: async () =>
      await apiClient.ofertasFormacoes.ofertaFormacaoList(unref(filter)),
  });

// turmas

export const findTurmaById = (id: TurmaFindOneByIdData, apiClient = useApiClient()) =>
  queryOptions({
    queryKey: ['turma', 'turma::id', id],
    queryFn: async () => await apiClient.turmas.turmaFindOneById(id),
  });

export const listTurmas = (filter?: ComputedRef<TurmaListData>, apiClient: ApiClient = useApiClient()) =>
  queryOptions({
    queryKey: ['turma', 'turmas-list', filter],
    queryFn: async () => apiClient.turmas.turmaList(unref(filter)),
  });

// usuários

export const findUserById = (id: UsuarioFindOneByIdData, apiClient = useApiClient()) =>
  queryOptions({
    queryKey: ['user', 'user::id', id],
    queryFn: async () => await apiClient.usuarios.usuarioFindOneById(id),
  });

export const listUsers = (filter?: UsuarioListData, apiClient = useApiClient()) =>
  queryOptions({
    queryKey: ['user', 'users-list'],
    queryFn: async () => await apiClient.usuarios.usuarioList(filter),
  });
