/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TurmaFindAllResultDto } from "../models/TurmaFindAllResultDto";
import type { TurmaFindOneResultDto } from "../models/TurmaFindOneResultDto";
import type { TurmaInputDto } from "../models/TurmaInputDto";
import type { TurmaUpdateWithoutIdInputDto } from "../models/TurmaUpdateWithoutIdInputDto";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
export class TurmasService {
  /**
   * @param page
   * @param limit
   * @param search
   * @param sortBy
   * @param filterAmbientePadraoAulaNome
   * @param filterAmbientePadraoAulaCodigo
   * @param filterAmbientePadraoAulaCapacidade
   * @param filterAmbientePadraoAulaTipo
   * @param filterCursoNome
   * @param filterCursoNomeAbreviado
   * @param filterCursoCampusId
   * @param filterCursoModalidadeId
   * @param filterCursoModalidadeNome
   * @param filterCursoModalidadeSlug
   * @returns TurmaFindAllResultDto Lista de "turma" cadastrados no sistema.
   * @throws ApiError
   */
  public static turmaControllerTurmaFindAll(
    page?: string,
    limit?: string,
    search?: string,
    sortBy?: string,
    filterAmbientePadraoAulaNome?: string,
    filterAmbientePadraoAulaCodigo?: string,
    filterAmbientePadraoAulaCapacidade?: string,
    filterAmbientePadraoAulaTipo?: string,
    filterCursoNome?: string,
    filterCursoNomeAbreviado?: string,
    filterCursoCampusId?: string,
    filterCursoModalidadeId?: string,
    filterCursoModalidadeNome?: string,
    filterCursoModalidadeSlug?: string,
  ): CancelablePromise<TurmaFindAllResultDto> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/turmas",
      query: {
        page: page,
        limit: limit,
        search: search,
        sortBy: sortBy,
        "filter.ambientePadraoAula.nome": filterAmbientePadraoAulaNome,
        "filter.ambientePadraoAula.codigo": filterAmbientePadraoAulaCodigo,
        "filter.ambientePadraoAula.capacidade":
          filterAmbientePadraoAulaCapacidade,
        "filter.ambientePadraoAula.tipo": filterAmbientePadraoAulaTipo,
        "filter.curso.nome": filterCursoNome,
        "filter.curso.nomeAbreviado": filterCursoNomeAbreviado,
        "filter.curso.campus.id": filterCursoCampusId,
        "filter.curso.modalidade.id": filterCursoModalidadeId,
        "filter.curso.modalidade.nome": filterCursoModalidadeNome,
        "filter.curso.modalidade.slug": filterCursoModalidadeSlug,
      },
      errors: {
        403: `O solicitante não tem permissão para executar esta ação.`,
      },
    });
  }
  /**
   * @param requestBody
   * @returns TurmaFindOneResultDto Realiza o cadastro de "turma".
   * @throws ApiError
   */
  public static turmaControllerTurmaCreate(
    requestBody: TurmaInputDto,
  ): CancelablePromise<TurmaFindOneResultDto> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/turmas",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        403: `O solicitante não tem permissão para executar esta ação.`,
      },
    });
  }
  /**
   * @param id ID da turma.
   * @returns TurmaFindOneResultDto Realiza a consulta a "turma"" por ID.
   * @throws ApiError
   */
  public static turmaControllerTurmaFindById(
    id: string,
  ): CancelablePromise<TurmaFindOneResultDto> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/turmas/{id}",
      path: {
        id: id,
      },
      errors: {
        403: `O solicitante não tem permissão para executar esta ação.`,
        404: `Registro não encontrado.`,
      },
    });
  }
  /**
   * @param id ID de "turma".
   * @param requestBody
   * @returns TurmaFindOneResultDto Realiza a alteração de "turma".
   * @throws ApiError
   */
  public static turmaControllerTurmaUpdate(
    id: string,
    requestBody: TurmaUpdateWithoutIdInputDto,
  ): CancelablePromise<TurmaFindOneResultDto> {
    return __request(OpenAPI, {
      method: "PATCH",
      url: "/turmas/{id}",
      path: {
        id: id,
      },
      body: requestBody,
      mediaType: "application/json",
      errors: {
        403: `O solicitante não tem permissão para executar esta ação.`,
        404: `Registro não encontrado.`,
      },
    });
  }
  /**
   * @param id ID de "turma".
   * @returns boolean Realiza a remoção de "turma" por ID.
   * @throws ApiError
   */
  public static turmaControllerTurmaDeleteOneById(
    id: string,
  ): CancelablePromise<boolean> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/turmas/{id}",
      path: {
        id: id,
      },
      errors: {
        403: `O solicitante não tem permissão para executar esta ação.`,
        404: `Registro não encontrado.`,
      },
    });
  }
}
