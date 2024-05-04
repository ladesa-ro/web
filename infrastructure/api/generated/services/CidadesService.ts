/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CidadeFindAllResultDto } from '../models/CidadeFindAllResultDto';
import type { CidadeFindOneResultDto } from '../models/CidadeFindOneResultDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CidadesService {
	/**
	 * @param limit Limitar a quantidade de resultados por página.
	 * @param page Definir a página de consulta.
	 * @param search Busca textual.
	 * @param filterEstadoId Filtrar resultados por ID de Estado.
	 * @param filterEstadoNome Filtrar resultados por Nome de Estado.
	 * @param filterEstadoSigla Filtrar resultados por Sigla de Estado.
	 * @param sortBy Ordenação.
	 * @returns CidadeFindAllResultDto Resultados da busca de cidades.
	 * @throws ApiError
	 */
	public static cidadeControllerFindAll(
		limit?: any,
		page?: any,
		search?: any,
		filterEstadoId?: any,
		filterEstadoNome?: any,
		filterEstadoSigla?: any,
		sortBy?: any
	): CancelablePromise<CidadeFindAllResultDto> {
		return __request(OpenAPI, {
			method: 'GET',
			url: '/base/cidades',
			query: {
				limit: limit,
				page: page,
				search: search,
				'filter.estado.id': filterEstadoId,
				'filter.estado.nome': filterEstadoNome,
				'filter.estado.sigla': filterEstadoSigla,
				sortBy: sortBy,
			},
			errors: {
				403: `O solicitante não tem permissão para executar esta ação.`,
				404: `Registro não encontrado.`,
			},
		});
	}
	/**
	 * @returns CidadeFindOneResultDto Cidade encontrada.
	 * @throws ApiError
	 */
	public static cidadeControllerFindById(): CancelablePromise<CidadeFindOneResultDto> {
		return __request(OpenAPI, {
			method: 'GET',
			url: '/base/cidades/{id}',
			errors: {
				403: `O solicitante não tem permissão para executar esta ação.`,
				404: `Registro não encontrado.`,
			},
		});
	}
}
