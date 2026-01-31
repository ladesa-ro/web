// this file contains the queryOptions functions that are called in another files
// to learn more, check out the tanstack query docs: https://tanstack.com/query/latest/docs/framework/vue/guides/query-options

import { queryOptions } from '@tanstack/vue-query';
import type {
  CampusFindByIdData,
  CursoFindAllData,
  CursoFindByIdData,
  DisciplinaFindAllData,
  DisciplinaFindByIdData,
  OfertaFormacaoFindAllData,
  OfertaFormacaoFindByIdData,
  PerfilFindAllData,
  TurmaFindAllData,
  TurmaFindByIdData,
  UsuarioFindAllData,
  UsuarioFindByIdData,
} from '~/helpers/api-client';

// TODO: filtrar tudo pelo id do campus atual useCampusContext

// campi

export const findCampusById = (
  id: CampusFindByIdData,
  apiClient = useApiClient()
) =>
  queryOptions({
    queryKey: ['campus', 'campus::id', id],
    queryFn: async () => await apiClient.campi.campusFindById(id),
  });

// cursos

export const findCursoById = (
  id: CursoFindByIdData,
  apiClient = useApiClient()
) =>
  queryOptions({
    queryKey: ['curso', 'curso::id', id],
    queryFn: async () => await apiClient.cursos.cursoFindById(id),
  });

export const listCursos = (
  filter?: ComputedRef<CursoFindAllData>,
  apiClient: ApiClient = useApiClient()
) =>
  queryOptions({
    queryKey: ['curso', 'cursos-list', filter],
    queryFn: async () => await apiClient.cursos.cursoFindAll(unref(filter)),
  });

// disciplinas

export const findDisciplinaById = (
  id: DisciplinaFindByIdData,
  apiClient = useApiClient()
) =>
  queryOptions({
    queryKey: ['disciplina', 'disciplina::id', id],
    queryFn: async () => await apiClient.disciplinas.disciplinaFindById(id),
  });

export const listDisciplinas = (
  filter?: DisciplinaFindAllData,
  apiClient = useApiClient()
) =>
  queryOptions({
    queryKey: ['disciplina', 'disciplinas-list'],
    queryFn: async () => await apiClient.disciplinas.disciplinaFindAll(filter),
  });

// formações

export const findOfertaFormacaoById = (
  id: OfertaFormacaoFindByIdData,
  apiClient = useApiClient()
) =>
  queryOptions({
    queryKey: ['oferta-formacao', 'oferta-formacao::id', id],
    queryFn: async () =>
      await apiClient.ofertasFormacoes.ofertaFormacaoFindById(id),
  });

export const listOfertasFormacao = (
  filter?: ComputedRef<OfertaFormacaoFindAllData>,
  apiClient: ApiClient = useApiClient()
) =>
  queryOptions({
    queryKey: ['oferta-formacao', 'oferta-formacao-list', filter],
    queryFn: async () =>
      await apiClient.ofertasFormacoes.ofertaFormacaoFindAll(unref(filter)),
  });

// turmas

export const findTurmaById = (
  id: TurmaFindByIdData,
  apiClient = useApiClient()
) =>
  queryOptions({
    queryKey: ['turma', 'turma::id', id],
    queryFn: async () => await apiClient.turmas.turmaFindById(id),
  });

export const listTurmas = (
  filter?: ComputedRef<TurmaFindAllData>,
  apiClient: ApiClient = useApiClient()
) =>
  queryOptions({
    queryKey: ['turma', 'turmas-list', filter],
    queryFn: async () => apiClient.turmas.turmaFindAll(unref(filter)),
  });

// usuários

export const findUserById = (
  id: UsuarioFindByIdData,
  apiClient = useApiClient()
) =>
  queryOptions({
    queryKey: ['user', 'user::id', id],
    queryFn: async () => await apiClient.usuarios.usuarioFindById(id),
  });

export const listUsers = (
  filter?: UsuarioFindAllData,
  apiClient = useApiClient()
) =>
  queryOptions({
    queryKey: ['user', 'users-list'],
    queryFn: async () => await apiClient.usuarios.usuarioFindAll(filter),
  });

// perfis

export const listPerfis = (
  filter?: PerfilFindAllData,
  apiClient = useApiClient()
) =>
  queryOptions({
    queryKey: ['perfil', 'perfis-list'],
    queryFn: async () => await apiClient.perfis.perfilFindAll(filter),
  });
