/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ModalidadeFindAllResultDto } from "../models/ModalidadeFindAllResultDto";
import type { ModalidadeFindOneResultDto } from "../models/ModalidadeFindOneResultDto";
import type { ModalidadeInputDto } from "../models/ModalidadeInputDto";
import type { ModalidadeUpdateWithoutIdInputDto } from "../models/ModalidadeUpdateWithoutIdInputDto";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
export class ModalidadesService {
  /**
   * @param page
   * @param limit
   * @param search
   * @param sortBy
   * @returns ModalidadeFindAllResultDto Lista de todas as modalidades cadastrados no sistema.
   * @throws ApiError
   */
  public static modalidadeControllerModalidadeFindAll(
    page?: string,
    limit?: string,
    search?: string,
    sortBy?: string,
  ): CancelablePromise<ModalidadeFindAllResultDto> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/modalidades",
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
   * @param requestBody
   * @returns ModalidadeFindOneResultDto Realiza o cadastro de uma modalidade.
   * @throws ApiError
   */
  public static modalidadeControllerModalidadeCreate(
    requestBody: ModalidadeInputDto,
  ): CancelablePromise<ModalidadeFindOneResultDto> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/modalidades",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        403: `O solicitante não tem permissão para executar esta ação.`,
      },
    });
  }
  /**
   * @param id ID da modalidade.
   * @returns ModalidadeFindOneResultDto Realiza a consulta a uma modalidade por ID.
   * @throws ApiError
   */
  public static modalidadeControllerModalidadeFindById(
    id: string,
  ): CancelablePromise<ModalidadeFindOneResultDto> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/modalidades/{id}",
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
   * @param id ID da modalidade.
   * @param requestBody
   * @returns ModalidadeFindOneResultDto Realiza a alteração de uma modalidade.
   * @throws ApiError
   */
  public static modalidadeControllerModalidadeUpdate(
    id: string,
    requestBody: ModalidadeUpdateWithoutIdInputDto,
  ): CancelablePromise<ModalidadeFindOneResultDto> {
    return __request(OpenAPI, {
      method: "PATCH",
      url: "/modalidades/{id}",
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
   * @param id ID da modalidade.
   * @returns boolean Realiza a remoção de uma modalidade por ID.
   * @throws ApiError
   */
  public static modalidadeControllerModalidadeDeleteOneById(
    id: string,
  ): CancelablePromise<boolean> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/modalidades/{id}",
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
