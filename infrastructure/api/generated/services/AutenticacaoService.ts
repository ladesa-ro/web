/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AutenticacaoDefinirSenhaInputDto } from '../models/AutenticacaoDefinirSenhaInputDto';
import type { AutenticacaoDefinirSenhaResultDto } from '../models/AutenticacaoDefinirSenhaResultDto';
import type { AutenticacaoLoginInputDto } from '../models/AutenticacaoLoginInputDto';
import type { AutenticacaoLoginResultDto } from '../models/AutenticacaoLoginResultDto';
import type { AutenticacaoQuemSouEuResultDto } from '../models/AutenticacaoQuemSouEuResultDto';
import type { AutenticacaoRefreshInputDto } from '../models/AutenticacaoRefreshInputDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AutenticacaoService {
	/**
	 * @returns AutenticacaoQuemSouEuResultDto Informações sobre o usuário autenticado.
	 * @throws ApiError
	 */
	public static autenticacaoControllerQuemSouEu(): CancelablePromise<AutenticacaoQuemSouEuResultDto> {
		return __request(OpenAPI, {
			method: 'GET',
			url: '/autenticacao/quem-sou-eu',
			errors: {
				403: `O solicitante não tem permissão para executar esta ação.`,
				404: `Registro não encontrado.`,
			},
		});
	}
	/**
	 * @param requestBody
	 * @returns AutenticacaoLoginResultDto Credenciais de acesso do login.
	 * @throws ApiError
	 */
	public static autenticacaoControllerLogin(
		requestBody: AutenticacaoLoginInputDto
	): CancelablePromise<AutenticacaoLoginResultDto> {
		return __request(OpenAPI, {
			method: 'POST',
			url: '/autenticacao/login',
			body: requestBody,
			mediaType: 'application/json',
			errors: {
				403: `O solicitante não tem permissão para executar esta ação.`,
				404: `Registro não encontrado.`,
			},
		});
	}
	/**
	 * @param requestBody
	 * @returns AutenticacaoLoginResultDto Credenciais de acesso do login.
	 * @throws ApiError
	 */
	public static autenticacaoControllerRefresh(
		requestBody: AutenticacaoRefreshInputDto
	): CancelablePromise<AutenticacaoLoginResultDto> {
		return __request(OpenAPI, {
			method: 'POST',
			url: '/autenticacao/login/refresh',
			body: requestBody,
			mediaType: 'application/json',
			errors: {
				403: `O solicitante não tem permissão para executar esta ação.`,
				404: `Registro não encontrado.`,
			},
		});
	}
	/**
	 * @param requestBody
	 * @returns AutenticacaoDefinirSenhaResultDto Resultado da definição inicial de senha.
	 * @throws ApiError
	 */
	public static autenticacaoControllerDefinirSenha(
		requestBody: AutenticacaoDefinirSenhaInputDto
	): CancelablePromise<AutenticacaoDefinirSenhaResultDto> {
		return __request(OpenAPI, {
			method: 'POST',
			url: '/autenticacao/definir-senha',
			body: requestBody,
			mediaType: 'application/json',
			errors: {
				403: `O solicitante não tem permissão para executar esta ação.`,
				404: `Registro não encontrado.`,
			},
		});
	}
}
