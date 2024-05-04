/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UsuarioCreateInputDto } from '../models/UsuarioCreateInputDto';
import type { UsuarioFindAllResultDto } from '../models/UsuarioFindAllResultDto';
import type { UsuarioFindOneResultDto } from '../models/UsuarioFindOneResultDto';
import type { UsuarioUpdateInputDto } from '../models/UsuarioUpdateInputDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UsuariosService {
	/**
	 * @param limit Limitar a quantidade de resultados por página.
	 * @param page Definir a página de consulta.
	 * @param search Busca textual.
	 * @param sortBy Ordenação.
	 * @returns UsuarioFindAllResultDto Resultados da busca de usuarios.
	 * @throws ApiError
	 */
	public static usuarioControllerUsuarioFindAll(
		limit?: any,
		page?: any,
		search?: any,
		sortBy?: any
	): CancelablePromise<UsuarioFindAllResultDto> {
		return __request(OpenAPI, {
			method: 'GET',
			url: '/usuarios',
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
	 * @returns UsuarioFindOneResultDto Usuario criado.
	 * @throws ApiError
	 */
	public static usuarioControllerUsuarioCreate(
		requestBody: UsuarioCreateInputDto
	): CancelablePromise<UsuarioFindOneResultDto> {
		return __request(OpenAPI, {
			method: 'POST',
			url: '/usuarios',
			body: requestBody,
			mediaType: 'application/json',
			errors: {
				403: `O solicitante não tem permissão para executar esta ação.`,
				404: `Registro não encontrado.`,
			},
		});
	}
	/**
	 * @returns UsuarioFindOneResultDto Usuario encontrado.
	 * @throws ApiError
	 */
	public static usuarioControllerUsuarioFindById(): CancelablePromise<UsuarioFindOneResultDto> {
		return __request(OpenAPI, {
			method: 'GET',
			url: '/usuarios/{id}',
			errors: {
				403: `O solicitante não tem permissão para executar esta ação.`,
				404: `Registro não encontrado.`,
			},
		});
	}
	/**
	 * @param id ID do registro.
	 * @param requestBody
	 * @returns UsuarioFindOneResultDto Usuario atualizado.
	 * @throws ApiError
	 */
	public static usuarioControllerUsuarioUpdate(
		id: any,
		requestBody: UsuarioUpdateInputDto
	): CancelablePromise<UsuarioFindOneResultDto> {
		return __request(OpenAPI, {
			method: 'PATCH',
			url: '/usuarios/{id}',
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
	 * @returns any Usuario removido.
	 * @throws ApiError
	 */
	public static usuarioControllerUsuarioDeleteOneById(
		id: any
	): CancelablePromise<any> {
		return __request(OpenAPI, {
			method: 'DELETE',
			url: '/usuarios/{id}',
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
	 * @param id ID do registro.
	 * @returns binary Binário da imagem de capa do usuario.
	 * @throws ApiError
	 */
	public static usuarioControllerUsuarioGetImagemCapa(
		id: any
	): CancelablePromise<Blob> {
		return __request(OpenAPI, {
			method: 'GET',
			url: '/usuarios/{id}/imagem/capa',
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
	public static usuarioControllerUsuarioImagemCapaSave(
		id: string,
		formData: {
			file: Blob;
		}
	): CancelablePromise<any> {
		return __request(OpenAPI, {
			method: 'PUT',
			url: '/usuarios/{id}/imagem/capa',
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
	/**
	 * @param id ID do registro.
	 * @returns binary Binário da imagem de perfil do usuario.
	 * @throws ApiError
	 */
	public static usuarioControllerUsuarioGetImagemPerfil(
		id: any
	): CancelablePromise<Blob> {
		return __request(OpenAPI, {
			method: 'GET',
			url: '/usuarios/{id}/imagem/perfil',
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
	 * @returns any Imagem de perfil definida.
	 * @throws ApiError
	 */
	public static usuarioControllerUsuarioImagemPerfilSave(
		id: string,
		formData: {
			file: Blob;
		}
	): CancelablePromise<any> {
		return __request(OpenAPI, {
			method: 'PUT',
			url: '/usuarios/{id}/imagem/perfil',
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
