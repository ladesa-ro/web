/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DiarioProfessorCreateInputDto } from '../models/DiarioProfessorCreateInputDto';
import type { DiarioProfessorFindAllResultDto } from '../models/DiarioProfessorFindAllResultDto';
import type { DiarioProfessorFindOneResultDto } from '../models/DiarioProfessorFindOneResultDto';
import type { DiarioProfessorUpdateInputDto } from '../models/DiarioProfessorUpdateInputDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DiarioProfessorService {
	/**
	 * @param limit Limitar a quantidade de resultados por página.
	 * @param page Definir a página de consulta.
	 * @param search Busca textual.
	 * @param sortBy Ordenação.
	 * @returns DiarioProfessorFindAllResultDto Resultados da busca de vínculos entre diário e professor.
	 * @throws ApiError
	 */
	public static diarioProfessorControllerDiarioProfessorFindAll(
		limit?: any,
		page?: any,
		search?: any,
		sortBy?: any
	): CancelablePromise<DiarioProfessorFindAllResultDto> {
		return __request(OpenAPI, {
			method: 'GET',
			url: '/diario-professor',
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
	 * @returns DiarioProfessorFindOneResultDto Vínculo entre diário e professor criado.
	 * @throws ApiError
	 */
	public static diarioProfessorControllerDiarioProfessorCreate(
		requestBody: DiarioProfessorCreateInputDto
	): CancelablePromise<DiarioProfessorFindOneResultDto> {
		return __request(OpenAPI, {
			method: 'POST',
			url: '/diario-professor',
			body: requestBody,
			mediaType: 'application/json',
			errors: {
				403: `O solicitante não tem permissão para executar esta ação.`,
				404: `Registro não encontrado.`,
			},
		});
	}
	/**
	 * @returns DiarioProfessorFindOneResultDto Vínculo entre diário e professor encontrado.
	 * @throws ApiError
	 */
	public static diarioProfessorControllerDiarioProfessorFindById(): CancelablePromise<DiarioProfessorFindOneResultDto> {
		return __request(OpenAPI, {
			method: 'GET',
			url: '/diario-professor/{id}',
			errors: {
				403: `O solicitante não tem permissão para executar esta ação.`,
				404: `Registro não encontrado.`,
			},
		});
	}
	/**
	 * @param requestBody
	 * @returns DiarioProfessorFindOneResultDto Vínculo entre diário e professor atualizado.
	 * @throws ApiError
	 */
	public static diarioProfessorControllerDiarioProfessorUpdate(
		requestBody: DiarioProfessorUpdateInputDto
	): CancelablePromise<DiarioProfessorFindOneResultDto> {
		return __request(OpenAPI, {
			method: 'PATCH',
			url: '/diario-professor/{id}',
			body: requestBody,
			mediaType: 'application/json',
			errors: {
				403: `O solicitante não tem permissão para executar esta ação.`,
				404: `Registro não encontrado.`,
			},
		});
	}
	/**
	 * @returns any Vínculo entre diário e professor removido.
	 * @throws ApiError
	 */
	public static diarioProfessorControllerDiarioProfessorDeleteOneById(): CancelablePromise<any> {
		return __request(OpenAPI, {
			method: 'DELETE',
			url: '/diario-professor/{id}',
			errors: {
				403: `O solicitante não tem permissão para executar esta ação.`,
				404: `Registro não encontrado.`,
			},
		});
	}
}
