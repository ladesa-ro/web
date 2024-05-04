/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BlocoCreateInputDto } from '../models/BlocoCreateInputDto';
import type { BlocoFindAllResultDto } from '../models/BlocoFindAllResultDto';
import type { BlocoFindOneResultDto } from '../models/BlocoFindOneResultDto';
import type { BlocoUpdateInputDto } from '../models/BlocoUpdateInputDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BlocosService {
	/**
	 * @param limit Limitar a quantidade de resultados por página.
	 * @param page Definir a página de consulta.
	 * @param search Busca textual.
	 * @param filterCampusId Filtrar resultados por ID de Campus.
	 * @param sortBy Ordenação.
	 * @returns BlocoFindAllResultDto Resultados da busca de blocos.
	 * @throws ApiError
	 */
	public static blocoControllerBlocoFindAll(
		limit?: any,
		page?: any,
		search?: any,
		filterCampusId?: any,
		sortBy?: any
	): CancelablePromise<BlocoFindAllResultDto> {
		return __request(OpenAPI, {
			method: 'GET',
			url: '/blocos',
			query: {
				limit: limit,
				page: page,
				search: search,
				'filter.campus.id': filterCampusId,
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
	 * @returns BlocoFindOneResultDto Bloco criado.
	 * @throws ApiError
	 */
	public static blocoControllerBlocoCreate(
		requestBody: BlocoCreateInputDto
	): CancelablePromise<BlocoFindOneResultDto> {
		return __request(OpenAPI, {
			method: 'POST',
			url: '/blocos',
			body: requestBody,
			mediaType: 'application/json',
			errors: {
				403: `O solicitante não tem permissão para executar esta ação.`,
				404: `Registro não encontrado.`,
			},
		});
	}
	/**
	 * @returns BlocoFindOneResultDto Bloco encontrado.
	 * @throws ApiError
	 */
	public static blocoControllerBlocoFindById(): CancelablePromise<BlocoFindOneResultDto> {
		return __request(OpenAPI, {
			method: 'GET',
			url: '/blocos/{id}',
			errors: {
				403: `O solicitante não tem permissão para executar esta ação.`,
				404: `Registro não encontrado.`,
			},
		});
	}
	/**
	 * @param id ID do registro.
	 * @param requestBody
	 * @returns BlocoFindOneResultDto Bloco atualizado.
	 * @throws ApiError
	 */
	public static blocoControllerBlocoUpdate(
		id: any,
		requestBody: BlocoUpdateInputDto
	): CancelablePromise<BlocoFindOneResultDto> {
		return __request(OpenAPI, {
			method: 'PATCH',
			url: '/blocos/{id}',
			path: {
				id: id,
			},
			body: requestBody,
			mediaType: 'application/json',
			errors: {
				403: `O solicitante não tem permissão para executar esta ação.`,
				404: `Registro não encontrado.`,
			},
		});
	}
	/**
	 * @param id ID do registro.
	 * @returns any Bloco removido.
	 * @throws ApiError
	 */
	public static blocoControllerBlocoDeleteOneById(
		id: any
	): CancelablePromise<any> {
		return __request(OpenAPI, {
			method: 'DELETE',
			url: '/blocos/{id}',
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
	 * @param id ID do registro.
	 * @returns binary Binário da imagem do bloco.
	 * @throws ApiError
	 */
	public static blocoControllerBlocoGetImagemCapa(
		id: any
	): CancelablePromise<Blob> {
		return __request(OpenAPI, {
			method: 'GET',
			url: '/blocos/{id}/imagem/capa',
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
	public static blocoControllerBlocoImagemCapaSave(
		id: string,
		formData: {
			file: Blob;
		}
	): CancelablePromise<any> {
		return __request(OpenAPI, {
			method: 'PUT',
			url: '/blocos/{id}/imagem/capa',
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
