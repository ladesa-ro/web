/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ArquivosService {
	/**
	 * @param id ID do registro.
	 * @param acessoRecursoNome Acesso via recurso: nome
	 * @param acessoRecursoId Acesso via recurso: id
	 * @returns binary Binário do arquivo consultado.
	 * @throws ApiError
	 */
	public static arquivoControllerGetFile(
		id: string,
		acessoRecursoNome: string,
		acessoRecursoId: string
	): CancelablePromise<Blob> {
		return __request(OpenAPI, {
			method: 'GET',
			url: '/arquivos/{id}',
			path: {
				id: id,
			},
			query: {
				'acesso.recurso.nome': acessoRecursoNome,
				'acesso.recurso.id': acessoRecursoId,
			},
			errors: {
				403: `O solicitante não tem permissão para executar esta ação.`,
				404: `Registro não encontrado.`,
			},
		});
	}
}
