/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BlocoFindAllResultDto } from "../models/BlocoFindAllResultDto";
import type { BlocoFindOneResultDto } from "../models/BlocoFindOneResultDto";
import type { BlocoInputDto } from "../models/BlocoInputDto";
import type { BlocoUpdateWithoutIdInputDto } from "../models/BlocoUpdateWithoutIdInputDto";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
export class BlocosService {
  /**
   * @param page
   * @param limit
   * @param search
   * @param sortBy
   * @param filterCampusId
   * @returns BlocoFindAllResultDto Lista de todos os blocos cadastrados no sistema.
   * @throws ApiError
   */
  public static blocoControllerBlocoFindAll(
    page?: string,
    limit?: string,
    search?: string,
    sortBy?: string,
    filterCampusId?: string,
  ): CancelablePromise<BlocoFindAllResultDto> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/blocos",
      query: {
        page: page,
        limit: limit,
        search: search,
        sortBy: sortBy,
        "filter.campus.id": filterCampusId,
      },
      errors: {
        403: `O solicitante não tem permissão para executar esta ação.`,
      },
    });
  }
  /**
   * @param requestBody
   * @returns BlocoFindOneResultDto Realiza o cadastro de um bloco.
   * @throws ApiError
   */
  public static blocoControllerBlocoCreate(
    requestBody: BlocoInputDto,
  ): CancelablePromise<BlocoFindOneResultDto> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/blocos",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        403: `O solicitante não tem permissão para executar esta ação.`,
      },
    });
  }
  /**
   * @param id ID do bloco.
   * @returns BlocoFindOneResultDto Realiza a consulta a um bloco por ID.
   * @throws ApiError
   */
  public static blocoControllerBlocoFindById(
    id: string,
  ): CancelablePromise<BlocoFindOneResultDto> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/blocos/{id}",
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
   * @param id ID do bloco.
   * @param requestBody
   * @returns BlocoFindOneResultDto Realiza a alteração de um bloco.
   * @throws ApiError
   */
  public static blocoControllerBlocoUpdate(
    id: string,
    requestBody: BlocoUpdateWithoutIdInputDto,
  ): CancelablePromise<BlocoFindOneResultDto> {
    return __request(OpenAPI, {
      method: "PATCH",
      url: "/blocos/{id}",
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
   * @param id ID do bloco.
   * @returns boolean Realiza a remoção de um bloco por ID.
   * @throws ApiError
   */
  public static blocoControllerBlocoDeleteOneById(
    id: string,
  ): CancelablePromise<boolean> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/blocos/{id}",
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
