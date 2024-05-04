/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type AutenticacaoLoginResultDto = {
	/**
	 * Token de acesso.
	 */
	accessToken: string | null;
	/**
	 * Tipo do token.
	 */
	tokenType: string | null;
	/**
	 * Token de identificação.
	 */
	idToken: string | null;
	/**
	 * Token de refresh.
	 */
	refreshToken: string | null;
	/**
	 * Tempo de expiração do token.
	 */
	expiresIn: number | null;
	/**
	 * Tempo de expiração do token.
	 */
	expiresAt: number | null;
	/**
	 * Estado da sessão.
	 */
	sessionState: string | null;
	/**
	 * Escopo da autenticação.
	 */
	scope: string | null;
};
