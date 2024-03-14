/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DisciplinaFindAllResultDto } from "../models/DisciplinaFindAllResultDto";
import type { DisciplinaFindOneResultDto } from "../models/DisciplinaFindOneResultDto";
import type { DisciplinaInputDto } from "../models/DisciplinaInputDto";
import type { DisciplinaUpdateWithoutIdInputDto } from "../models/DisciplinaUpdateWithoutIdInputDto";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
export class DisciplinasService {
  /**
   * @param page
   * @param limit
   * @param search
   * @param sortBy
   * @returns DisciplinaFindAllResultDto Lista de "disciplina" cadastrados no sistema.
   * @throws ApiError
   */
  public static disciplinaControllerDisciplinaFindAll(
    page?: string,
    limit?: string,
    search?: string,
    sortBy?: string,
  ): CancelablePromise<DisciplinaFindAllResultDto> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/disciplinas",
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
   * @returns DisciplinaFindOneResultDto Realiza o cadastro de "disciplina".
   * @throws ApiError
   */
  public static disciplinaControllerDisciplinaCreate(
    requestBody: DisciplinaInputDto,
  ): CancelablePromise<DisciplinaFindOneResultDto> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/disciplinas",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        403: `O solicitante não tem permissão para executar esta ação.`,
      },
    });
  }
  /**
   * @param id ID da disciplina.
   * @returns DisciplinaFindOneResultDto Realiza a consulta a "disciplina"" por ID.
   * @throws ApiError
   */
  public static disciplinaControllerDisciplinaFindById(
    id: string,
  ): CancelablePromise<DisciplinaFindOneResultDto> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/disciplinas/{id}",
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
   * @param id ID de "disciplina".
   * @param requestBody
   * @returns DisciplinaFindOneResultDto Realiza a alteração de "disciplina".
   * @throws ApiError
   */
  public static disciplinaControllerDisciplinaUpdate(
    id: string,
    requestBody: DisciplinaUpdateWithoutIdInputDto,
  ): CancelablePromise<DisciplinaFindOneResultDto> {
    return __request(OpenAPI, {
      method: "PATCH",
      url: "/disciplinas/{id}",
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
   * @param id ID de "disciplina".
   * @returns boolean Realiza a remoção de "disciplina" por ID.
   * @throws ApiError
   */
  public static disciplinaControllerDisciplinaDeleteOneById(
    id: string,
  ): CancelablePromise<boolean> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/disciplinas/{id}",
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
