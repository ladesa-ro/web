/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type AutenticacaoLoginResultDto = {
  /**
   * Token de acesso.
   */
  access_token: string | null;
  /**
   * Tipo de token de acesso.
   */
  token_type: string | null;
  /**
   * ID token.
   */
  id_token: string | null;
  /**
   * Refresh token.
   */
  refresh_token: string | null;
  /**
   * Quanto tempo para expirar o token (em segundos).
   */
  expires_in: number | null;
  /**
   * Data de expiração (em segundos unix).
   */
  expires_at: number | null;
  /**
   * Estado da sessão.
   */
  session_state: string | null;
  /**
   * Escopo do token de acesso.
   */
  scope: string | null;
};
