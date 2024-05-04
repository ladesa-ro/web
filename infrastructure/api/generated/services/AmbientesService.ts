/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AmbienteCreateInputDto } from '../models/AmbienteCreateInputDto';
import type { AmbienteFindAllResultDto } from '../models/AmbienteFindAllResultDto';
import type { AmbienteFindOneResultDto } from '../models/AmbienteFindOneResultDto';
import type { AmbienteUpdateInputDto } from '../models/AmbienteUpdateInputDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AmbientesService {
	/**
	 * @param limit Limitar a quantidade de resultados por página.
	 * @param page Definir a página de consulta.
	 * @param search Busca textual.
	 * @param filterBlocoId Filtrar resultados por ID de Bloco.
	 * @param filterBlocoCampusId Filtrar resultados por ID de Campus.
	 * @param sortBy Ordenação.
	 * @returns AmbienteFindAllResultDto Resultados da busca de ambientes.
	 * @throws ApiError
	 */
	public static ambienteControllerAmbienteFindAll(
		limit?: any,
		page?: any,
		search?: any,
		filterBlocoId?: any,
		filterBlocoCampusId?: any,
		sortBy?: any
	): CancelablePromise<AmbienteFindAllResultDto> {
		return __request(OpenAPI, {
			method: 'GET',
			url: '/ambientes',
			query: {
				limit: limit,
				page: page,
				search: search,
				'filter.bloco.id': filterBlocoId,
				'filter.bloco.campus.id': filterBlocoCampusId,
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
	 * @returns AmbienteFindOneResultDto Ambiente criado.
	 * @throws ApiError
	 */
	public static ambienteControllerAmbienteCreate(
		requestBody: AmbienteCreateInputDto
	): CancelablePromise<AmbienteFindOneResultDto> {
		return __request(OpenAPI, {
			method: 'POST',
			url: '/ambientes',
			body: requestBody,
			mediaType: 'application/json',
			errors: {
				403: `O solicitante não tem permissão para executar esta ação.`,
				404: `Registro não encontrado.`,
			},
		});
	}
	/**
	 * @returns AmbienteFindOneResultDto Ambiente encontrado.
	 * @throws ApiError
	 */
	public static ambienteControllerAmbienteFindById(): CancelablePromise<AmbienteFindOneResultDto> {
		return __request(OpenAPI, {
			method: 'GET',
			url: '/ambientes/{id}',
			errors: {
				403: `O solicitante não tem permissão para executar esta ação.`,
				404: `Registro não encontrado.`,
			},
		});
	}
	/**
	 * @param requestBody
	 * @returns AmbienteFindOneResultDto Ambiente atualizado.
	 * @throws ApiError
	 */
	public static ambienteControllerAmbienteUpdate(
		requestBody: AmbienteUpdateInputDto
	): CancelablePromise<AmbienteFindOneResultDto> {
		return __request(OpenAPI, {
			method: 'PATCH',
			url: '/ambientes/{id}',
			body: requestBody,
			mediaType: 'application/json',
			errors: {
				403: `O solicitante não tem permissão para executar esta ação.`,
				404: `Registro não encontrado.`,
			},
		});
	}
	/**
	 * @returns any Ambiente removido.
	 * @throws ApiError
	 */
	public static ambienteControllerAmbienteDeleteOneById(): CancelablePromise<any> {
		return __request(OpenAPI, {
			method: 'DELETE',
			url: '/ambientes/{id}',
			errors: {
				403: `O solicitante não tem permissão para executar esta ação.`,
				404: `Registro não encontrado.`,
			},
		});
	}
	/**
	 * @param id ID do registro.
	 * @returns binary Binário da imagem do ambiente.
	 * @throws ApiError
	 */
	public static ambienteControllerBlocoGetImagemCapa(
		id: any
	): CancelablePromise<Blob> {
		return __request(OpenAPI, {
			method: 'GET',
			url: '/ambientes/{id}/imagem/capa',
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
	public static ambienteControllerBlocoImagemCapaSave(
		id: string,
		formData: {
			file: Blob;
		}
	): CancelablePromise<any> {
		return __request(OpenAPI, {
			method: 'PUT',
			url: '/ambientes/{id}/imagem/capa',
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
