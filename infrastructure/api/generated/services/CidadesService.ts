/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CidadeFindAllResultDto } from "../models/CidadeFindAllResultDto";
import type { CidadeFindOneResultDto } from "../models/CidadeFindOneResultDto";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
export class CidadesService {
  /**
   * @param page
   * @param limit
   * @param search
   * @param sortBy
   * @param filterEstadoId
   * @param filterEstadoNome
   * @param filterEstadoSigla
   * @returns CidadeFindAllResultDto Lista de todas as cidades brasileiras cadastradas no sistema.
   * @throws ApiError
   */
  public static cidadeControllerFindAll(
    page?: string,
    limit?: string,
    search?: string,
    sortBy?: string,
    filterEstadoId?: string,
    filterEstadoNome?: string,
    filterEstadoSigla?: string,
  ): CancelablePromise<CidadeFindAllResultDto> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/base/cidades",
      query: {
        page: page,
        limit: limit,
        search: search,
        sortBy: sortBy,
        "filter.estado.id": filterEstadoId,
        "filter.estado.nome": filterEstadoNome,
        "filter.estado.sigla": filterEstadoSigla,
      },
      errors: {
        403: `O solicitante não tem permissão para executar esta ação.`,
      },
    });
  }
  /**
   * @param id ID IBGE da Cidade.
   * @returns CidadeFindOneResultDto Retorna a consulta a uma cidade por ID IBGE.
   * @throws ApiError
   */
  public static cidadeControllerFindById(
    id: number,
  ): CancelablePromise<CidadeFindOneResultDto> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/base/cidades/{id}",
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
