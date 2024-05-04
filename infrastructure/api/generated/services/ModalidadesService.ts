/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ModalidadeCreateInputDto } from '../models/ModalidadeCreateInputDto';
import type { ModalidadeFindAllResultDto } from '../models/ModalidadeFindAllResultDto';
import type { ModalidadeFindOneResultDto } from '../models/ModalidadeFindOneResultDto';
import type { ModalidadeUpdateInputDto } from '../models/ModalidadeUpdateInputDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ModalidadesService {
	/**
	 * @param limit Limitar a quantidade de resultados por página.
	 * @param page Definir a página de consulta.
	 * @param search Busca textual.
	 * @param sortBy Ordenação.
	 * @returns ModalidadeFindAllResultDto Resultados da busca de modalidades.
	 * @throws ApiError
	 */
	public static modalidadeControllerModalidadeFindAll(
		limit?: any,
		page?: any,
		search?: any,
		sortBy?: any
	): CancelablePromise<ModalidadeFindAllResultDto> {
		return __request(OpenAPI, {
			method: 'GET',
			url: '/modalidades',
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
	 * @param requestBody
	 * @returns ModalidadeFindOneResultDto Modalidade criada.
	 * @throws ApiError
	 */
	public static modalidadeControllerModalidadeCreate(
		requestBody: ModalidadeCreateInputDto
	): CancelablePromise<ModalidadeFindOneResultDto> {
		return __request(OpenAPI, {
			method: 'POST',
			url: '/modalidades',
			body: requestBody,
			mediaType: 'application/json',
			errors: {
				403: `O solicitante não tem permissão para executar esta ação.`,
				404: `Registro não encontrado.`,
			},
		});
	}
	/**
	 * @returns ModalidadeFindOneResultDto Modalidade encontrada.
	 * @throws ApiError
	 */
	public static modalidadeControllerModalidadeFindById(): CancelablePromise<ModalidadeFindOneResultDto> {
		return __request(OpenAPI, {
			method: 'GET',
			url: '/modalidades/{id}',
			errors: {
				403: `O solicitante não tem permissão para executar esta ação.`,
				404: `Registro não encontrado.`,
			},
		});
	}
	/**
	 * @param requestBody
	 * @returns ModalidadeFindOneResultDto Modalidade atualizada.
	 * @throws ApiError
	 */
	public static modalidadeControllerModalidadeUpdate(
		requestBody: ModalidadeUpdateInputDto
	): CancelablePromise<ModalidadeFindOneResultDto> {
		return __request(OpenAPI, {
			method: 'PATCH',
			url: '/modalidades/{id}',
			body: requestBody,
			mediaType: 'application/json',
			errors: {
				403: `O solicitante não tem permissão para executar esta ação.`,
				404: `Registro não encontrado.`,
			},
		});
	}
	/**
	 * @returns any Modalidade removida.
	 * @throws ApiError
	 */
	public static modalidadeControllerModalidadeDeleteOneById(): CancelablePromise<any> {
		return __request(OpenAPI, {
			method: 'DELETE',
			url: '/modalidades/{id}',
			errors: {
				403: `O solicitante não tem permissão para executar esta ação.`,
				404: `Registro não encontrado.`,
			},
		});
	}
}
