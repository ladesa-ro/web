/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CampusCreateInputDto } from '../models/CampusCreateInputDto';
import type { CampusFindAllResultDto } from '../models/CampusFindAllResultDto';
import type { CampusFindOneResultDto } from '../models/CampusFindOneResultDto';
import type { CampusUpdateInputDto } from '../models/CampusUpdateInputDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CampiService {
	/**
	 * @param limit Limitar a quantidade de resultados por página.
	 * @param page Definir a página de consulta.
	 * @param search Busca textual.
	 * @param filterCampusId Filtrar resultados por ID de Campus.
	 * @param filterEnderecoCidadeId Filtrar resultados por ID de Cidade.
	 * @param filterEnderecoCidadeNome Filtrar resultados por Nome de Cidade.
	 * @param filterEnderecoCidadeEstadoId Filtrar resultados por ID de Estado.
	 * @param filterEnderecoCidadeEstadoNome Filtrar resultados por Nome de Estado.
	 * @param filterEnderecoCidadeEstadoSigla Filtrar resultados por Sigla de Estado.
	 * @param sortBy Ordenação.
	 * @returns CampusFindAllResultDto Resultados da busca de campi.
	 * @throws ApiError
	 */
	public static campusControllerCampusFindAll(
		limit?: any,
		page?: any,
		search?: any,
		filterCampusId?: any,
		filterEnderecoCidadeId?: any,
		filterEnderecoCidadeNome?: any,
		filterEnderecoCidadeEstadoId?: any,
		filterEnderecoCidadeEstadoNome?: any,
		filterEnderecoCidadeEstadoSigla?: any,
		sortBy?: any
	): CancelablePromise<CampusFindAllResultDto> {
		return __request(OpenAPI, {
			method: 'GET',
			url: '/campi',
			query: {
				limit: limit,
				page: page,
				search: search,
				'filter.campus.id': filterCampusId,
				'filter.endereco.cidade.id': filterEnderecoCidadeId,
				'filter.endereco.cidade.nome': filterEnderecoCidadeNome,
				'filter.endereco.cidade.estado.id':
					filterEnderecoCidadeEstadoId,
				'filter.endereco.cidade.estado.nome':
					filterEnderecoCidadeEstadoNome,
				'filter.endereco.cidade.estado.sigla':
					filterEnderecoCidadeEstadoSigla,
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
	 * @returns CampusFindOneResultDto Campus criado.
	 * @throws ApiError
	 */
	public static campusControllerCampusCreate(
		requestBody: CampusCreateInputDto
	): CancelablePromise<CampusFindOneResultDto> {
		return __request(OpenAPI, {
			method: 'POST',
			url: '/campi',
			body: requestBody,
			mediaType: 'application/json',
			errors: {
				403: `O solicitante não tem permissão para executar esta ação.`,
				404: `Registro não encontrado.`,
			},
		});
	}
	/**
	 * @returns CampusFindOneResultDto Campus encontrado.
	 * @throws ApiError
	 */
	public static campusControllerCampusFindById(): CancelablePromise<CampusFindOneResultDto> {
		return __request(OpenAPI, {
			method: 'GET',
			url: '/campi/{id}',
			errors: {
				403: `O solicitante não tem permissão para executar esta ação.`,
				404: `Registro não encontrado.`,
			},
		});
	}
	/**
	 * @param id ID do registro.
	 * @param requestBody
	 * @returns CampusFindOneResultDto Campus atualizado.
	 * @throws ApiError
	 */
	public static campusControllerCampusUpdate(
		id: any,
		requestBody: CampusUpdateInputDto
	): CancelablePromise<CampusFindOneResultDto> {
		return __request(OpenAPI, {
			method: 'PATCH',
			url: '/campi/{id}',
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
	 * @returns any Campus removido.
	 * @throws ApiError
	 */
	public static campusControllerCampusDeleteOneById(
		id: any
	): CancelablePromise<any> {
		return __request(OpenAPI, {
			method: 'DELETE',
			url: '/campi/{id}',
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
