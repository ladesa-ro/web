/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CampusFindAllResultDto } from "../models/CampusFindAllResultDto";
import type { CampusFindOneResultDto } from "../models/CampusFindOneResultDto";
import type { CampusInputDto } from "../models/CampusInputDto";
import type { CampusUpdateWithoutIdInputDto } from "../models/CampusUpdateWithoutIdInputDto";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
export class CampiService {
  /**
   * @param page
   * @param limit
   * @param search
   * @param sortBy
   * @param filterEnderecoCidadeId
   * @param filterEnderecoCidadeNome
   * @param filterEnderecoCidadeEstadoId
   * @param filterEnderecoCidadeEstadoNome
   * @param filterEnderecoCidadeEstadoSigla
   * @returns CampusFindAllResultDto Listagem de todos os campi cadastrados no sistema.
   * @throws ApiError
   */
  public static campusControllerCampusFindAll(
    page?: string,
    limit?: string,
    search?: string,
    sortBy?: string,
    filterEnderecoCidadeId?: string,
    filterEnderecoCidadeNome?: string,
    filterEnderecoCidadeEstadoId?: string,
    filterEnderecoCidadeEstadoNome?: string,
    filterEnderecoCidadeEstadoSigla?: string,
  ): CancelablePromise<CampusFindAllResultDto> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/campi",
      query: {
        page: page,
        limit: limit,
        search: search,
        sortBy: sortBy,
        "filter.endereco.cidade.id": filterEnderecoCidadeId,
        "filter.endereco.cidade.nome": filterEnderecoCidadeNome,
        "filter.endereco.cidade.estado.id": filterEnderecoCidadeEstadoId,
        "filter.endereco.cidade.estado.nome": filterEnderecoCidadeEstadoNome,
        "filter.endereco.cidade.estado.sigla": filterEnderecoCidadeEstadoSigla,
      },
      errors: {
        403: `O solicitante não tem permissão para executar esta ação.`,
      },
    });
  }
  /**
   * @param requestBody
   * @returns CampusFindOneResultDto Realiza o cadastro de um campus.
   * @throws ApiError
   */
  public static campusControllerCampusCreate(
    requestBody: CampusInputDto,
  ): CancelablePromise<CampusFindOneResultDto> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/campi",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        403: `O solicitante não tem permissão para executar esta ação.`,
      },
    });
  }
  /**
   * @param id ID do campus.
   * @returns CampusFindOneResultDto Realiza a consulta a um campus por ID.
   * @throws ApiError
   */
  public static campusControllerCampusFindById(
    id: string,
  ): CancelablePromise<CampusFindOneResultDto> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/campi/{id}",
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
   * @param id ID do campus.
   * @param requestBody
   * @returns CampusFindOneResultDto Realiza a alteração de um campus.
   * @throws ApiError
   */
  public static campusControllerCampusUpdate(
    id: string,
    requestBody: CampusUpdateWithoutIdInputDto,
  ): CancelablePromise<CampusFindOneResultDto> {
    return __request(OpenAPI, {
      method: "PATCH",
      url: "/campi/{id}",
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
   * @param id ID do campus.
   * @returns boolean Realiza a remoção de um campus por ID.
   * @throws ApiError
   */
  public static campusControllerCampusDeleteOneById(
    id: string,
  ): CancelablePromise<boolean> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/campi/{id}",
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
