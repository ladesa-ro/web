/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { EstadoFindAllResultDto } from "../models/EstadoFindAllResultDto";
import type { EstadoFindOneResultDto } from "../models/EstadoFindOneResultDto";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
export class EstadosService {
  /**
   * @param page
   * @param limit
   * @param search
   * @param sortBy
   * @returns EstadoFindAllResultDto Listagem de todos os estados brasileiros cadastrados no sistema.
   * @throws ApiError
   */
  public static estadoControllerFindAll(
    page?: string,
    limit?: string,
    search?: string,
    sortBy?: string,
  ): CancelablePromise<EstadoFindAllResultDto> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/base/estados",
      query: {
        page: page,
        limit: limit,
        search: search,
        sortBy: sortBy,
      },
      errors: {
        403: `O solicitante não tem permissão para executar esta ação.`,
      },
    });
  }
  /**
   * @param uf Sigla do estado.
   * @returns EstadoFindOneResultDto Realiza a consulta a um estado por sigla da UF.
   * @throws ApiError
   */
  public static estadoControllerFindByUf(
    uf: string,
  ): CancelablePromise<EstadoFindOneResultDto> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/base/estados/uf/{uf}",
      path: {
        uf: uf,
      },
      errors: {
        403: `O solicitante não tem permissão para executar esta ação.`,
        404: `Registro não encontrado.`,
      },
    });
  }
  /**
   * @param id ID IBGE do estado.
   * @returns EstadoFindOneResultDto Realiza a consulta a um estado por ID IBGE do estado.
   * @throws ApiError
   */
  public static estadoControllerFindById(
    id: number,
  ): CancelablePromise<EstadoFindOneResultDto> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/base/estados/{id}",
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
