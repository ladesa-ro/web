/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AmbienteFindAllResultDto } from "../models/AmbienteFindAllResultDto";
import type { AmbienteFindOneResultDto } from "../models/AmbienteFindOneResultDto";
import type { AmbienteInputDto } from "../models/AmbienteInputDto";
import type { AmbienteUpdateWithoutIdInputDto } from "../models/AmbienteUpdateWithoutIdInputDto";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
export class AmbientesService {
  /**
   * @param page
   * @param limit
   * @param search
   * @param sortBy
   * @param filterBlocoId
   * @param filterBlocoCampusId
   * @returns AmbienteFindAllResultDto Lista de todos os ambientes cadastrados no sistema.
   * @throws ApiError
   */
  public static ambienteControllerAmbienteFindAll(
    page?: string,
    limit?: string,
    search?: string,
    sortBy?: string,
    filterBlocoId?: string,
    filterBlocoCampusId?: string,
  ): CancelablePromise<AmbienteFindAllResultDto> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/ambientes",
      query: {
        page: page,
        limit: limit,
        search: search,
        sortBy: sortBy,
        "filter.bloco.id": filterBlocoId,
        "filter.bloco.campus.id": filterBlocoCampusId,
      },
      errors: {
        403: `O solicitante não tem permissão para executar esta ação.`,
      },
    });
  }
  /**
   * @param requestBody
   * @returns AmbienteFindOneResultDto Realiza o cadastro de um ambiente.
   * @throws ApiError
   */
  public static ambienteControllerAmbienteCreate(
    requestBody: AmbienteInputDto,
  ): CancelablePromise<AmbienteFindOneResultDto> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/ambientes",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        403: `O solicitante não tem permissão para executar esta ação.`,
      },
    });
  }
  /**
   * @param id ID do ambiente.
   * @returns AmbienteFindOneResultDto Realiza a consulta a um ambiente por ID.
   * @throws ApiError
   */
  public static ambienteControllerAmbienteFindById(
    id: string,
  ): CancelablePromise<AmbienteFindOneResultDto> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/ambientes/{id}",
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
   * @param id ID do ambiente.
   * @param requestBody
   * @returns AmbienteFindOneResultDto Realiza a alteração de um ambiente.
   * @throws ApiError
   */
  public static ambienteControllerAmbienteUpdate(
    id: string,
    requestBody: AmbienteUpdateWithoutIdInputDto,
  ): CancelablePromise<AmbienteFindOneResultDto> {
    return __request(OpenAPI, {
      method: "PATCH",
      url: "/ambientes/{id}",
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
   * @param id ID do ambiente.
   * @returns boolean Realiza a remoção de um ambiente por ID.
   * @throws ApiError
   */
  public static ambienteControllerAmbienteDeleteOneById(
    id: string,
  ): CancelablePromise<boolean> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/ambientes/{id}",
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
