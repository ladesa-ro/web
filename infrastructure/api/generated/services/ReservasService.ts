/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ReservaFindAllResultDto } from "../models/ReservaFindAllResultDto";
import type { ReservaFindOneResultDto } from "../models/ReservaFindOneResultDto";
import type { ReservaInputDto } from "../models/ReservaInputDto";
import type { ReservaUpdateWithoutIdInputDto } from "../models/ReservaUpdateWithoutIdInputDto";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
export class ReservasService {
  /**
   * @param page
   * @param limit
   * @param search
   * @param sortBy
   * @returns ReservaFindAllResultDto Lista de "reserva" cadastrados no sistema.
   * @throws ApiError
   */
  public static reservaControllerReservaFindAll(
    page?: string,
    limit?: string,
    search?: string,
    sortBy?: string,
  ): CancelablePromise<ReservaFindAllResultDto> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/reservas",
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
   * @returns ReservaFindOneResultDto Realiza o cadastro de "reserva".
   * @throws ApiError
   */
  public static reservaControllerReservaCreate(
    requestBody: ReservaInputDto,
  ): CancelablePromise<ReservaFindOneResultDto> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/reservas",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        403: `O solicitante não tem permissão para executar esta ação.`,
      },
    });
  }
  /**
   * @param id ID da reserva.
   * @returns ReservaFindOneResultDto Realiza a consulta a "reserva"" por ID.
   * @throws ApiError
   */
  public static reservaControllerReservaFindById(
    id: string,
  ): CancelablePromise<ReservaFindOneResultDto> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/reservas/{id}",
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
   * @param id ID de "reserva".
   * @param requestBody
   * @returns ReservaFindOneResultDto Realiza a alteração de "reserva".
   * @throws ApiError
   */
  public static reservaControllerReservaUpdate(
    id: string,
    requestBody: ReservaUpdateWithoutIdInputDto,
  ): CancelablePromise<ReservaFindOneResultDto> {
    return __request(OpenAPI, {
      method: "PATCH",
      url: "/reservas/{id}",
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
   * @param id ID de "reserva".
   * @returns boolean Realiza a remoção de "reserva" por ID.
   * @throws ApiError
   */
  public static reservaControllerReservaDeleteOneById(
    id: string,
  ): CancelablePromise<boolean> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/reservas/{id}",
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
