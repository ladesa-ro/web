/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UsuarioFindOneResultDto } from "../models/UsuarioFindOneResultDto";
import type { UsuarioInputDto } from "../models/UsuarioInputDto";
import type { UsuarioUpdateWithoutIdInputDto } from "../models/UsuarioUpdateWithoutIdInputDto";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
export class UsuariosService {
  /**
   * @returns UsuarioFindOneResultDto Lista de todos os usuários cadastrados no sistema.
   * @throws ApiError
   */
  public static usuarioControllerUsuarioFindAll(): CancelablePromise<
    Array<UsuarioFindOneResultDto>
  > {
    return __request(OpenAPI, {
      method: "GET",
      url: "/usuarios",
      errors: {
        403: `O solicitante não tem permissão para executar esta ação.`,
      },
    });
  }
  /**
   * @param requestBody
   * @returns UsuarioFindOneResultDto Realiza o cadastro de um usuário.
   * @throws ApiError
   */
  public static usuarioControllerUsuarioCreate(
    requestBody: UsuarioInputDto,
  ): CancelablePromise<UsuarioFindOneResultDto> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/usuarios",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        403: `O solicitante não tem permissão para executar esta ação.`,
      },
    });
  }
  /**
   * @param id ID do usuário.
   * @returns UsuarioFindOneResultDto Realiza a consulta a um usuário por ID.
   * @throws ApiError
   */
  public static usuarioControllerUsuarioFindById(
    id: string,
  ): CancelablePromise<UsuarioFindOneResultDto> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/usuarios/{id}",
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
   * @param id ID do usuário.
   * @param requestBody
   * @returns UsuarioFindOneResultDto Realiza a alteração de um usuário.
   * @throws ApiError
   */
  public static usuarioControllerUsuarioUpdate(
    id: string,
    requestBody: UsuarioUpdateWithoutIdInputDto,
  ): CancelablePromise<UsuarioFindOneResultDto> {
    return __request(OpenAPI, {
      method: "PATCH",
      url: "/usuarios/{id}",
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
   * @param id ID do usuario.
   * @returns boolean Realiza a remoção de um usuário por ID.
   * @throws ApiError
   */
  public static usuarioControllerUsuarioDeleteOneById(
    id: string,
  ): CancelablePromise<boolean> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/usuarios/{id}",
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
