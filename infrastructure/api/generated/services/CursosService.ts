/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CursoCreateInputDto } from '../models/CursoCreateInputDto';
import type { CursoFindAllResultDto } from '../models/CursoFindAllResultDto';
import type { CursoFindOneResultDto } from '../models/CursoFindOneResultDto';
import type { CursoUpdateInputDto } from '../models/CursoUpdateInputDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CursosService {
	/**
	 * @param limit Limitar a quantidade de resultados por página.
	 * @param page Definir a página de consulta.
	 * @param search Busca textual.
	 * @param filterCampusId Filtrar resultados por ID de Campus.
	 * @param filterCampusCnpj Filtrar resultados por CNPJ de Campus.
	 * @param filterCampusRazaoSocial Filtrar resultados por Razão Social de Campus.
	 * @param filterCampusNomeFantasia Filtrar resultados por Nome Fantasia de Campus.
	 * @param filterModalidadeId Filtrar resultados por ID de Modalidade.
	 * @param filterModalidadeNome Filtrar resultados por Nome de Modalidade.
	 * @param filterModalidadeSlug Filtrar resultados por Slug de Modalidade.
	 * @param sortBy Ordenação.
	 * @returns CursoFindAllResultDto Resultados da busca de cursos.
	 * @throws ApiError
	 */
	public static cursoControllerCursoFindAll(
		limit?: any,
		page?: any,
		search?: any,
		filterCampusId?: any,
		filterCampusCnpj?: any,
		filterCampusRazaoSocial?: any,
		filterCampusNomeFantasia?: any,
		filterModalidadeId?: any,
		filterModalidadeNome?: any,
		filterModalidadeSlug?: any,
		sortBy?: any
	): CancelablePromise<CursoFindAllResultDto> {
		return __request(OpenAPI, {
			method: 'GET',
			url: '/cursos',
			query: {
				limit: limit,
				page: page,
				search: search,
				'filter.campus.id': filterCampusId,
				'filter.campus.cnpj': filterCampusCnpj,
				'filter.campus.razaoSocial': filterCampusRazaoSocial,
				'filter.campus.nomeFantasia': filterCampusNomeFantasia,
				'filter.modalidade.id': filterModalidadeId,
				'filter.modalidade.nome': filterModalidadeNome,
				'filter.modalidade.slug': filterModalidadeSlug,
				sortBy: sortBy,
			},
			errors: {
				403: `O solicitante não tem permissão para executar esta ação.`,
				404: `Registro não encontrado.`,
			},
		});
	}
	/**
	 * @param requestBody
	 * @returns CursoFindOneResultDto Curso criado.
	 * @throws ApiError
	 */
	public static cursoControllerCursoCreate(
		requestBody: CursoCreateInputDto
	): CancelablePromise<CursoFindOneResultDto> {
		return __request(OpenAPI, {
			method: 'POST',
			url: '/cursos',
			body: requestBody,
			mediaType: 'application/json',
			errors: {
				403: `O solicitante não tem permissão para executar esta ação.`,
				404: `Registro não encontrado.`,
			},
		});
	}
	/**
	 * @returns CursoFindOneResultDto Curso encontrado.
	 * @throws ApiError
	 */
	public static cursoControllerCursoFindById(): CancelablePromise<CursoFindOneResultDto> {
		return __request(OpenAPI, {
			method: 'GET',
			url: '/cursos/{id}',
			errors: {
				403: `O solicitante não tem permissão para executar esta ação.`,
				404: `Registro não encontrado.`,
			},
		});
	}
	/**
	 * @param requestBody
	 * @returns CursoFindOneResultDto Curso atualizado.
	 * @throws ApiError
	 */
	public static cursoControllerCursoUpdate(
		requestBody: CursoUpdateInputDto
	): CancelablePromise<CursoFindOneResultDto> {
		return __request(OpenAPI, {
			method: 'PATCH',
			url: '/cursos/{id}',
			body: requestBody,
			mediaType: 'application/json',
			errors: {
				403: `O solicitante não tem permissão para executar esta ação.`,
				404: `Registro não encontrado.`,
			},
		});
	}
	/**
	 * @returns any Curso removido.
	 * @throws ApiError
	 */
	public static cursoControllerCursoDeleteOneById(): CancelablePromise<any> {
		return __request(OpenAPI, {
			method: 'DELETE',
			url: '/cursos/{id}',
			errors: {
				403: `O solicitante não tem permissão para executar esta ação.`,
				404: `Registro não encontrado.`,
			},
		});
	}
	/**
	 * @param id ID do registro.
	 * @returns binary Binário da imagem do curso.
	 * @throws ApiError
	 */
	public static cursoControllerCursoGetImagemCapa(
		id: any
	): CancelablePromise<Blob> {
		return __request(OpenAPI, {
			method: 'GET',
			url: '/cursos/{id}/imagem/capa',
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
	 * @param id
	 * @param formData
	 * @returns any Imagem de capa definida.
	 * @throws ApiError
	 */
	public static cursoControllerCursoImagemCapaSave(
		id: string,
		formData: {
			file: Blob;
		}
	): CancelablePromise<any> {
		return __request(OpenAPI, {
			method: 'PUT',
			url: '/cursos/{id}/imagem/capa',
			path: {
				id: id,
			},
			formData: formData,
			mediaType: 'multipart/form-data',
			errors: {
				403: `O solicitante não tem permissão para executar esta ação.`,
				404: `Registro não encontrado.`,
			},
		});
	}
}
