/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TurmaCreateInputDto } from '../models/TurmaCreateInputDto';
import type { TurmaFindAllResultDto } from '../models/TurmaFindAllResultDto';
import type { TurmaFindOneResultDto } from '../models/TurmaFindOneResultDto';
import type { TurmaUpdateInputDto } from '../models/TurmaUpdateInputDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class TurmasService {
	/**
	 * @param limit Limitar a quantidade de resultados por página.
	 * @param page Definir a página de consulta.
	 * @param search Busca textual.
	 * @param filterAmbientePadraoAulaNome Filtrar resultados por nome do ambiente padrão de aula.
	 * @param filterAmbientePadraoAulaCodigo Filtrar resultados por código do ambiente padrão de aula.
	 * @param filterAmbientePadraoAulaCapacidade Filtrar resultados por capacidade do ambiente padrão de aula.
	 * @param filterAmbientePadraoAulaTipo Filtrar resultados por tipo do ambiente padrão de aula.
	 * @param filterCursoNome Filtrar resultados por nome do curso.
	 * @param filterCursoNomeAbreviado Filtrar resultados por nome abreviado do curso.
	 * @param filterCursoCampusId Filtrar resultados por ID do campus do curso.
	 * @param filterCursoModalidadeId Filtrar resultados por ID da modalidade do curso.
	 * @param filterCursoModalidadeNome Filtrar resultados por nome da modalidade do curso.
	 * @param filterCursoModalidadeSlug Filtrar resultados por slug da modalidade do curso.
	 * @param sortBy Ordenação.
	 * @returns TurmaFindAllResultDto Resultados da busca de turmas.
	 * @throws ApiError
	 */
	public static turmaControllerTurmaFindAll(
		limit?: any,
		page?: any,
		search?: any,
		filterAmbientePadraoAulaNome?: any,
		filterAmbientePadraoAulaCodigo?: any,
		filterAmbientePadraoAulaCapacidade?: any,
		filterAmbientePadraoAulaTipo?: any,
		filterCursoNome?: any,
		filterCursoNomeAbreviado?: any,
		filterCursoCampusId?: any,
		filterCursoModalidadeId?: any,
		filterCursoModalidadeNome?: any,
		filterCursoModalidadeSlug?: any,
		sortBy?: any
	): CancelablePromise<TurmaFindAllResultDto> {
		return __request(OpenAPI, {
			method: 'GET',
			url: '/turmas',
			query: {
				limit: limit,
				page: page,
				search: search,
				'filter.ambientePadraoAula.nome': filterAmbientePadraoAulaNome,
				'filter.ambientePadraoAula.codigo':
					filterAmbientePadraoAulaCodigo,
				'filter.ambientePadraoAula.capacidade':
					filterAmbientePadraoAulaCapacidade,
				'filter.ambientePadraoAula.tipo': filterAmbientePadraoAulaTipo,
				'filter.curso.nome': filterCursoNome,
				'filter.curso.nomeAbreviado': filterCursoNomeAbreviado,
				'filter.curso.campus.id': filterCursoCampusId,
				'filter.curso.modalidade.id': filterCursoModalidadeId,
				'filter.curso.modalidade.nome': filterCursoModalidadeNome,
				'filter.curso.modalidade.slug': filterCursoModalidadeSlug,
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
	 * @returns TurmaFindOneResultDto Turma criado.
	 * @throws ApiError
	 */
	public static turmaControllerTurmaCreate(
		requestBody: TurmaCreateInputDto
	): CancelablePromise<TurmaFindOneResultDto> {
		return __request(OpenAPI, {
			method: 'POST',
			url: '/turmas',
			body: requestBody,
			mediaType: 'application/json',
			errors: {
				403: `O solicitante não tem permissão para executar esta ação.`,
				404: `Registro não encontrado.`,
			},
		});
	}
	/**
	 * @returns TurmaFindOneResultDto Turma encontrado.
	 * @throws ApiError
	 */
	public static turmaControllerTurmaFindById(): CancelablePromise<TurmaFindOneResultDto> {
		return __request(OpenAPI, {
			method: 'GET',
			url: '/turmas/{id}',
			errors: {
				403: `O solicitante não tem permissão para executar esta ação.`,
				404: `Registro não encontrado.`,
			},
		});
	}
	/**
	 * @param requestBody
	 * @returns TurmaFindOneResultDto Turma atualizado.
	 * @throws ApiError
	 */
	public static turmaControllerTurmaUpdate(
		requestBody: TurmaUpdateInputDto
	): CancelablePromise<TurmaFindOneResultDto> {
		return __request(OpenAPI, {
			method: 'PATCH',
			url: '/turmas/{id}',
			body: requestBody,
			mediaType: 'application/json',
			errors: {
				403: `O solicitante não tem permissão para executar esta ação.`,
				404: `Registro não encontrado.`,
			},
		});
	}
	/**
	 * @returns any Turma removido.
	 * @throws ApiError
	 */
	public static turmaControllerTurmaDeleteOneById(): CancelablePromise<any> {
		return __request(OpenAPI, {
			method: 'DELETE',
			url: '/turmas/{id}',
			errors: {
				403: `O solicitante não tem permissão para executar esta ação.`,
				404: `Registro não encontrado.`,
			},
		});
	}
	/**
	 * @param id ID do registro.
	 * @returns binary Binário da imagem do turma.
	 * @throws ApiError
	 */
	public static turmaControllerTurmaGetImagemCapa(
		id: any
	): CancelablePromise<Blob> {
		return __request(OpenAPI, {
			method: 'GET',
			url: '/turmas/{id}/imagem/capa',
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
	public static turmaControllerTurmaImagemCapaSave(
		id: string,
		formData: {
			file: Blob;
		}
	): CancelablePromise<any> {
		return __request(OpenAPI, {
			method: 'PUT',
			url: '/turmas/{id}/imagem/capa',
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
