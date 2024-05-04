/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ReservaCreateInputDto } from '../models/ReservaCreateInputDto';
import type { ReservaFindAllResultDto } from '../models/ReservaFindAllResultDto';
import type { ReservaFindOneResultDto } from '../models/ReservaFindOneResultDto';
import type { ReservaUpdateInputDto } from '../models/ReservaUpdateInputDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ReservasService {
	/**
	 * @param limit Limitar a quantidade de resultados por página.
	 * @param page Definir a página de consulta.
	 * @param search Busca textual.
	 * @param sortBy Ordenação.
	 * @returns ReservaFindAllResultDto Resultados da busca de reservas.
	 * @throws ApiError
	 */
	public static reservaControllerReservaFindAll(
		limit?: any,
		page?: any,
		search?: any,
		sortBy?: any
	): CancelablePromise<ReservaFindAllResultDto> {
		return __request(OpenAPI, {
			method: 'GET',
			url: '/reservas',
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
	 * @returns ReservaFindOneResultDto Reserva criada.
	 * @throws ApiError
	 */
	public static reservaControllerReservaCreate(
		requestBody: ReservaCreateInputDto
	): CancelablePromise<ReservaFindOneResultDto> {
		return __request(OpenAPI, {
			method: 'POST',
			url: '/reservas',
			body: requestBody,
			mediaType: 'application/json',
			errors: {
				403: `O solicitante não tem permissão para executar esta ação.`,
				404: `Registro não encontrado.`,
			},
		});
	}
	/**
	 * @returns ReservaFindOneResultDto Reserva encontrada.
	 * @throws ApiError
	 */
	public static reservaControllerReservaFindById(): CancelablePromise<ReservaFindOneResultDto> {
		return __request(OpenAPI, {
			method: 'GET',
			url: '/reservas/{id}',
			errors: {
				403: `O solicitante não tem permissão para executar esta ação.`,
				404: `Registro não encontrado.`,
			},
		});
	}
	/**
	 * @param id ID do registro.
	 * @param requestBody
	 * @returns ReservaFindOneResultDto Reserva atualizada.
	 * @throws ApiError
	 */
	public static reservaControllerReservaUpdate(
		id: any,
		requestBody: ReservaUpdateInputDto
	): CancelablePromise<ReservaFindOneResultDto> {
		return __request(OpenAPI, {
			method: 'PATCH',
			url: '/reservas/{id}',
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
	 * @returns any Reserva removida.
	 * @throws ApiError
	 */
	public static reservaControllerReservaDeleteOneById(
		id: any
	): CancelablePromise<any> {
		return __request(OpenAPI, {
			method: 'DELETE',
			url: '/reservas/{id}',
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
