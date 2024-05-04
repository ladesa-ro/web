/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DiarioCreateInputDto } from '../models/DiarioCreateInputDto';
import type { DiarioFindAllResultDto } from '../models/DiarioFindAllResultDto';
import type { DiarioFindOneResultDto } from '../models/DiarioFindOneResultDto';
import type { DiarioUpdateInputDto } from '../models/DiarioUpdateInputDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DiariosService {
	/**
	 * @param limit Limitar a quantidade de resultados por página.
	 * @param page Definir a página de consulta.
	 * @param search Busca textual.
	 * @param filterTurmaId Filtrar resultados por ID de Turma.
	 * @param filterDisciplinaId Filtrar resultados por ID de Disciplina.
	 * @param filterAmbientePadraoId Filtrar resultados por ID de Ambiente Padrão.
	 * @param sortBy Ordenação.
	 * @returns DiarioFindAllResultDto Resultados da busca de diários.
	 * @throws ApiError
	 */
	public static diarioControllerDiarioFindAll(
		limit?: any,
		page?: any,
		search?: any,
		filterTurmaId?: any,
		filterDisciplinaId?: any,
		filterAmbientePadraoId?: any,
		sortBy?: any
	): CancelablePromise<DiarioFindAllResultDto> {
		return __request(OpenAPI, {
			method: 'GET',
			url: '/diarios',
			query: {
				limit: limit,
				page: page,
				search: search,
				'filter.turma.id': filterTurmaId,
				'filter.disciplina.id': filterDisciplinaId,
				'filter.ambientePadrao.id': filterAmbientePadraoId,
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
	 * @returns DiarioFindOneResultDto Diario criado.
	 * @throws ApiError
	 */
	public static diarioControllerDiarioCreate(
		requestBody: DiarioCreateInputDto
	): CancelablePromise<DiarioFindOneResultDto> {
		return __request(OpenAPI, {
			method: 'POST',
			url: '/diarios',
			body: requestBody,
			mediaType: 'application/json',
			errors: {
				403: `O solicitante não tem permissão para executar esta ação.`,
				404: `Registro não encontrado.`,
			},
		});
	}
	/**
	 * @returns DiarioFindOneResultDto Diario encontrado.
	 * @throws ApiError
	 */
	public static diarioControllerDiarioFindById(): CancelablePromise<DiarioFindOneResultDto> {
		return __request(OpenAPI, {
			method: 'GET',
			url: '/diarios/{id}',
			errors: {
				403: `O solicitante não tem permissão para executar esta ação.`,
				404: `Registro não encontrado.`,
			},
		});
	}
	/**
	 * @param requestBody
	 * @returns DiarioFindOneResultDto Diario atualizado.
	 * @throws ApiError
	 */
	public static diarioControllerDiarioUpdate(
		requestBody: DiarioUpdateInputDto
	): CancelablePromise<DiarioFindOneResultDto> {
		return __request(OpenAPI, {
			method: 'PATCH',
			url: '/diarios/{id}',
			body: requestBody,
			mediaType: 'application/json',
			errors: {
				403: `O solicitante não tem permissão para executar esta ação.`,
				404: `Registro não encontrado.`,
			},
		});
	}
	/**
	 * @returns any Diario removido.
	 * @throws ApiError
	 */
	public static diarioControllerDiarioDeleteOneById(): CancelablePromise<any> {
		return __request(OpenAPI, {
			method: 'DELETE',
			url: '/diarios/{id}',
			errors: {
				403: `O solicitante não tem permissão para executar esta ação.`,
				404: `Registro não encontrado.`,
			},
		});
	}
}
