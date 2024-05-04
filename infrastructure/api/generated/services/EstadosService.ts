/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { EstadoFindAllResultDto } from '../models/EstadoFindAllResultDto';
import type { EstadoFindOneResultDto } from '../models/EstadoFindOneResultDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class EstadosService {
	/**
	 * @param limit Limitar a quantidade de resultados por página.
	 * @param page Definir a página de consulta.
	 * @param search Busca textual.
	 * @param sortBy Ordenação.
	 * @returns EstadoFindAllResultDto Resultados da busca de estados.
	 * @throws ApiError
	 */
	public static estadoControllerFindAll(
		limit?: any,
		page?: any,
		search?: any,
		sortBy?: any
	): CancelablePromise<EstadoFindAllResultDto> {
		return __request(OpenAPI, {
			method: 'GET',
			url: '/base/estados',
			query: {
				limit: limit,
				page: page,
				search: search,
				sortBy: sortBy,
			},
			errors: {
				403: `O solicitante não tem permissão para executar esta ação.`,
				404: `Registro não encontrado.`,
			},
		});
	}
	/**
	 * @returns EstadoFindOneResultDto Estado encontrado.
	 * @throws ApiError
	 */
	public static estadoControllerFindByUf(): CancelablePromise<EstadoFindOneResultDto> {
		return __request(OpenAPI, {
			method: 'GET',
			url: '/base/estados/uf/{uf}',
			errors: {
				403: `O solicitante não tem permissão para executar esta ação.`,
				404: `Registro não encontrado.`,
			},
		});
	}
	/**
	 * @returns EstadoFindOneResultDto Estado encontrado.
	 * @throws ApiError
	 */
	public static estadoControllerFindById(): CancelablePromise<EstadoFindOneResultDto> {
		return __request(OpenAPI, {
			method: 'GET',
			url: '/base/estados/{id}',
			errors: {
				403: `O solicitante não tem permissão para executar esta ação.`,
				404: `Registro não encontrado.`,
			},
		});
	}
}
