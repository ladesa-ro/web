/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CursoFindAllResultDto } from "../models/CursoFindAllResultDto";
import type { CursoFindOneResultDto } from "../models/CursoFindOneResultDto";
import type { CursoInputDto } from "../models/CursoInputDto";
import type { CursoUpdateWithoutIdInputDto } from "../models/CursoUpdateWithoutIdInputDto";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
export class CursosService {
  /**
   * @param page
   * @param limit
   * @param search
   * @param sortBy
   * @param filterCampusId
   * @param filterCampusCnpj
   * @param filterCampusRazaoSocial
   * @param filterCampusNomeFantasia
   * @param filterModalidadeId
   * @param filterModalidadeNome
   * @param filterModalidadeSlug
   * @returns CursoFindAllResultDto Lista de "curso" cadastrados no sistema.
   * @throws ApiError
   */
  public static cursoControllerCursoFindAll(
    page?: string,
    limit?: string,
    search?: string,
    sortBy?: string,
    filterCampusId?: string,
    filterCampusCnpj?: string,
    filterCampusRazaoSocial?: string,
    filterCampusNomeFantasia?: string,
    filterModalidadeId?: string,
    filterModalidadeNome?: string,
    filterModalidadeSlug?: string,
  ): CancelablePromise<CursoFindAllResultDto> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/cursos",
      query: {
        page: page,
        limit: limit,
        search: search,
        sortBy: sortBy,
        "filter.campus.id": filterCampusId,
        "filter.campus.cnpj": filterCampusCnpj,
        "filter.campus.razaoSocial": filterCampusRazaoSocial,
        "filter.campus.nomeFantasia": filterCampusNomeFantasia,
        "filter.modalidade.id": filterModalidadeId,
        "filter.modalidade.nome": filterModalidadeNome,
        "filter.modalidade.slug": filterModalidadeSlug,
      },
      errors: {
        403: `O solicitante não tem permissão para executar esta ação.`,
      },
    });
  }
  /**
   * @param requestBody
   * @returns CursoFindOneResultDto Realiza o cadastro de "curso".
   * @throws ApiError
   */
  public static cursoControllerCursoCreate(
    requestBody: CursoInputDto,
  ): CancelablePromise<CursoFindOneResultDto> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/cursos",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        403: `O solicitante não tem permissão para executar esta ação.`,
      },
    });
  }
  /**
   * @param id ID da curso.
   * @returns CursoFindOneResultDto Realiza a consulta a "curso"" por ID.
   * @throws ApiError
   */
  public static cursoControllerCursoFindById(
    id: string,
  ): CancelablePromise<CursoFindOneResultDto> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/cursos/{id}",
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
   * @param id ID de "curso".
   * @param requestBody
   * @returns CursoFindOneResultDto Realiza a alteração de "curso".
   * @throws ApiError
   */
  public static cursoControllerCursoUpdate(
    id: string,
    requestBody: CursoUpdateWithoutIdInputDto,
  ): CancelablePromise<CursoFindOneResultDto> {
    return __request(OpenAPI, {
      method: "PATCH",
      url: "/cursos/{id}",
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
   * @param id ID de "curso".
   * @returns boolean Realiza a remoção de "curso" por ID.
   * @throws ApiError
   */
  public static cursoControllerCursoDeleteOneById(
    id: string,
  ): CancelablePromise<boolean> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/cursos/{id}",
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
