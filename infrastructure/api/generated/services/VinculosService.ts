/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { VinculoFindAllResultDto } from '../models/VinculoFindAllResultDto';
import type { VinculoFindOneResultDto } from '../models/VinculoFindOneResultDto';
import type { VinculoUpdateInputDto } from '../models/VinculoUpdateInputDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class VinculosService {
	/**
	 * @param limit Limitar a quantidade de resultados por página.
	 * @param page Definir a página de consulta.
	 * @param search Busca textual.
	 * @param sortBy Ordenação.
	 * @returns VinculoFindAllResultDto Resultados da busca de vínculos de um usuário aos campi.
	 * @throws ApiError
	 */
	public static vinculoControllerFindAll(
		limit?: any,
		page?: any,
		search?: any,
		sortBy?: any
	): CancelablePromise<VinculoFindAllResultDto> {
		return __request(OpenAPI, {
			method: 'GET',
			url: '/vinculos',
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
	 * @returns VinculoFindOneResultDto Vínculo de usuário a um campus atualizado.
	 * @throws ApiError
	 */
	public static vinculoControllerVinculoSetVinculos(
		requestBody: VinculoUpdateInputDto
	): CancelablePromise<VinculoFindOneResultDto> {
		return __request(OpenAPI, {
			method: 'POST',
			url: '/vinculos',
			body: requestBody,
			mediaType: 'application/json',
			errors: {
				403: `O solicitante não tem permissão para executar esta ação.`,
				404: `Registro não encontrado.`,
			},
		});
	}
}
