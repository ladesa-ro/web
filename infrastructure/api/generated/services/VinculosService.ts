/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UsuarioVinculoCampusFindAllResultDto } from "../models/UsuarioVinculoCampusFindAllResultDto";
import type { UsuarioVinculoCampusSetVinculosInputDto } from "../models/UsuarioVinculoCampusSetVinculosInputDto";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
export class VinculosService {
  /**
   * @param search
   * @param filterAtivo
   * @param filterCargo
   * @param filterCampusId
   * @param filterUsuarioId
   * @returns UsuarioVinculoCampusFindAllResultDto Lista de todos os usuários cadastrados no sistema.
   * @throws ApiError
   */
  public static usuarioVinculoCampusControllerFindAll(
    search?: string,
    filterAtivo?: string,
    filterCargo?: string,
    filterCampusId?: string,
    filterUsuarioId?: string,
  ): CancelablePromise<UsuarioVinculoCampusFindAllResultDto> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/vinculos",
      query: {
        search: search,
        "filter.ativo": filterAtivo,
        "filter.cargo": filterCargo,
        "filter.campus.id": filterCampusId,
        "filter.usuario.id": filterUsuarioId,
      },
      errors: {
        403: `O solicitante não tem permissão para executar esta ação.`,
      },
    });
  }
  /**
   * @param requestBody
   * @returns UsuarioVinculoCampusFindAllResultDto Altera os vínculos de um determinado usuário em um campus.
   * @throws ApiError
   */
  public static usuarioVinculoCampusControllerVinculoSetVinculos(
    requestBody: UsuarioVinculoCampusSetVinculosInputDto,
  ): CancelablePromise<UsuarioVinculoCampusFindAllResultDto> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/vinculos",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        403: `O solicitante não tem permissão para executar esta ação.`,
        404: `Registro não encontrado.`,
      },
    });
  }
}
