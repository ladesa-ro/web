/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DiarioFindAllResultDto } from "../models/DiarioFindAllResultDto";
import type { DiarioFindOneResultDto } from "../models/DiarioFindOneResultDto";
import type { DiarioInputDto } from "../models/DiarioInputDto";
import type { DiarioUpdateWithoutIdInputDto } from "../models/DiarioUpdateWithoutIdInputDto";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
export class DiariosService {
  /**
   * @param page
   * @param limit
   * @param search
   * @param sortBy
   * @param filterTurmaId
   * @param filterDisciplinaId
   * @param filterAmbientePadraoId
   * @returns DiarioFindAllResultDto Lista de "diario" cadastrados no sistema.
   * @throws ApiError
   */
  public static diarioControllerDiarioFindAll(
    page?: string,
    limit?: string,
    search?: string,
    sortBy?: string,
    filterTurmaId?: string,
    filterDisciplinaId?: string,
    filterAmbientePadraoId?: string,
  ): CancelablePromise<DiarioFindAllResultDto> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/diarios",
      query: {
        page: page,
        limit: limit,
        search: search,
        sortBy: sortBy,
        "filter.turma.id": filterTurmaId,
        "filter.disciplina.id": filterDisciplinaId,
        "filter.ambientePadrao.id": filterAmbientePadraoId,
      },
      errors: {
        403: `O solicitante não tem permissão para executar esta ação.`,
      },
    });
  }
  /**
   * @param requestBody
   * @returns DiarioFindOneResultDto Realiza o cadastro de "diario".
   * @throws ApiError
   */
  public static diarioControllerDiarioCreate(
    requestBody: DiarioInputDto,
  ): CancelablePromise<DiarioFindOneResultDto> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/diarios",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        403: `O solicitante não tem permissão para executar esta ação.`,
      },
    });
  }
  /**
   * @param id ID da diario.
   * @returns DiarioFindOneResultDto Realiza a consulta a um diario por ID.
   * @throws ApiError
   */
  public static diarioControllerDiarioFindById(
    id: string,
  ): CancelablePromise<DiarioFindOneResultDto> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/diarios/{id}",
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
   * @param id ID de "diario".
   * @param requestBody
   * @returns DiarioFindOneResultDto Realiza a alteração de "diario".
   * @throws ApiError
   */
  public static diarioControllerDiarioUpdate(
    id: string,
    requestBody: DiarioUpdateWithoutIdInputDto,
  ): CancelablePromise<DiarioFindOneResultDto> {
    return __request(OpenAPI, {
      method: "PATCH",
      url: "/diarios/{id}",
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
   * @param id ID de "diario".
   * @returns boolean Realiza a remoção de "diario" por ID.
   * @throws ApiError
   */
  public static diarioControllerDiarioDeleteOneById(
    id: string,
  ): CancelablePromise<boolean> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/diarios/{id}",
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
