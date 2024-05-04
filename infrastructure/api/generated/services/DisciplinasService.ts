/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DisciplinaCreateInputDto } from '../models/DisciplinaCreateInputDto';
import type { DisciplinaFindAllResultDto } from '../models/DisciplinaFindAllResultDto';
import type { DisciplinaFindOneResultDto } from '../models/DisciplinaFindOneResultDto';
import type { DisciplinaUpdateInputDto } from '../models/DisciplinaUpdateInputDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DisciplinasService {
	/**
	 * @param limit Limitar a quantidade de resultados por página.
	 * @param page Definir a página de consulta.
	 * @param search Busca textual.
	 * @param sortBy Ordenação.
	 * @returns DisciplinaFindAllResultDto Resultados da busca de disciplinas.
	 * @throws ApiError
	 */
	public static disciplinaControllerDisciplinaFindAll(
		limit?: any,
		page?: any,
		search?: any,
		sortBy?: any
	): CancelablePromise<DisciplinaFindAllResultDto> {
		return __request(OpenAPI, {
			method: 'GET',
			url: '/disciplinas',
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
	 * @returns DisciplinaFindOneResultDto Disciplina criado.
	 * @throws ApiError
	 */
	public static disciplinaControllerDisciplinaCreate(
		requestBody: DisciplinaCreateInputDto
	): CancelablePromise<DisciplinaFindOneResultDto> {
		return __request(OpenAPI, {
			method: 'POST',
			url: '/disciplinas',
			body: requestBody,
			mediaType: 'application/json',
			errors: {
				403: `O solicitante não tem permissão para executar esta ação.`,
				404: `Registro não encontrado.`,
			},
		});
	}
	/**
	 * @returns DisciplinaFindOneResultDto Disciplina encontrado.
	 * @throws ApiError
	 */
	public static disciplinaControllerDisciplinaFindById(): CancelablePromise<DisciplinaFindOneResultDto> {
		return __request(OpenAPI, {
			method: 'GET',
			url: '/disciplinas/{id}',
			errors: {
				403: `O solicitante não tem permissão para executar esta ação.`,
				404: `Registro não encontrado.`,
			},
		});
	}
	/**
	 * @param requestBody
	 * @returns DisciplinaFindOneResultDto Disciplina atualizado.
	 * @throws ApiError
	 */
	public static disciplinaControllerDisciplinaUpdate(
		requestBody: DisciplinaUpdateInputDto
	): CancelablePromise<DisciplinaFindOneResultDto> {
		return __request(OpenAPI, {
			method: 'PATCH',
			url: '/disciplinas/{id}',
			body: requestBody,
			mediaType: 'application/json',
			errors: {
				403: `O solicitante não tem permissão para executar esta ação.`,
				404: `Registro não encontrado.`,
			},
		});
	}
	/**
	 * @returns any Disciplina removido.
	 * @throws ApiError
	 */
	public static disciplinaControllerDisciplinaDeleteOneById(): CancelablePromise<any> {
		return __request(OpenAPI, {
			method: 'DELETE',
			url: '/disciplinas/{id}',
			errors: {
				403: `O solicitante não tem permissão para executar esta ação.`,
				404: `Registro não encontrado.`,
			},
		});
	}
	/**
	 * @param id ID do registro.
	 * @returns binary Binário da imagem do disciplina.
	 * @throws ApiError
	 */
	public static disciplinaControllerDisciplinaGetImagemCapa(
		id: any
	): CancelablePromise<Blob> {
		return __request(OpenAPI, {
			method: 'GET',
			url: '/disciplinas/{id}/imagem/capa',
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
	public static disciplinaControllerDisciplinaImagemCapaSave(
		id: string,
		formData: {
			file: Blob;
		}
	): CancelablePromise<any> {
		return __request(OpenAPI, {
			method: 'PUT',
			url: '/disciplinas/{id}/imagem/capa',
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
