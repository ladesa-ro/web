/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CalendarioLetivoCreateInputDto } from '../models/CalendarioLetivoCreateInputDto';
import type { CalendarioLetivoFindAllResultDto } from '../models/CalendarioLetivoFindAllResultDto';
import type { CalendarioLetivoFindOneResultDto } from '../models/CalendarioLetivoFindOneResultDto';
import type { CalendarioLetivoUpdateInputDto } from '../models/CalendarioLetivoUpdateInputDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CalendariosLetivosService {
	/**
	 * @param limit Limitar a quantidade de resultados por página.
	 * @param page Definir a página de consulta.
	 * @param search Busca textual.
	 * @param sortBy Ordenação.
	 * @returns CalendarioLetivoFindAllResultDto Resultados da busca de calendários letivos.
	 * @throws ApiError
	 */
	public static calendarioLetivoControllerCalendarioFindAll(
		limit?: any,
		page?: any,
		search?: any,
		sortBy?: any
	): CancelablePromise<CalendarioLetivoFindAllResultDto> {
		return __request(OpenAPI, {
			method: 'GET',
			url: '/calendarios-letivos',
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
	 * @returns CalendarioLetivoFindOneResultDto Calendário letivo criado.
	 * @throws ApiError
	 */
	public static calendarioLetivoControllerCampusCreate(
		requestBody: CalendarioLetivoCreateInputDto
	): CancelablePromise<CalendarioLetivoFindOneResultDto> {
		return __request(OpenAPI, {
			method: 'POST',
			url: '/calendarios-letivos',
			body: requestBody,
			mediaType: 'application/json',
			errors: {
				403: `O solicitante não tem permissão para executar esta ação.`,
				404: `Registro não encontrado.`,
			},
		});
	}
	/**
	 * @returns CalendarioLetivoFindOneResultDto Calendário letivo encontrado.
	 * @throws ApiError
	 */
	public static calendarioLetivoControllerCalendarioLetivoFindById(): CancelablePromise<CalendarioLetivoFindOneResultDto> {
		return __request(OpenAPI, {
			method: 'GET',
			url: '/calendarios-letivos/{id}',
			errors: {
				403: `O solicitante não tem permissão para executar esta ação.`,
				404: `Registro não encontrado.`,
			},
		});
	}
	/**
	 * @param requestBody
	 * @returns CalendarioLetivoFindOneResultDto Calendário letivo atualizado.
	 * @throws ApiError
	 */
	public static calendarioLetivoControllerCalendarioLetivoUpdate(
		requestBody: CalendarioLetivoUpdateInputDto
	): CancelablePromise<CalendarioLetivoFindOneResultDto> {
		return __request(OpenAPI, {
			method: 'PATCH',
			url: '/calendarios-letivos/{id}',
			body: requestBody,
			mediaType: 'application/json',
			errors: {
				403: `O solicitante não tem permissão para executar esta ação.`,
				404: `Registro não encontrado.`,
			},
		});
	}
	/**
	 * @returns any Calendário letivo removida.
	 * @throws ApiError
	 */
	public static calendarioLetivoControllerCalendarioLetivoDeleteOneById(): CancelablePromise<any> {
		return __request(OpenAPI, {
			method: 'DELETE',
			url: '/calendarios-letivos/{id}',
			errors: {
				403: `O solicitante não tem permissão para executar esta ação.`,
				404: `Registro não encontrado.`,
			},
		});
	}
}
