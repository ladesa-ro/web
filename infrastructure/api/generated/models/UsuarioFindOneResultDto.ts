/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UsuarioFindOneResultDtoVinculoAtivo } from "./UsuarioFindOneResultDtoVinculoAtivo";
export type UsuarioFindOneResultDto = {
  /**
   * ID do usuário.
   */
  id: string;
  /**
   * Nome do usuário.
   */
  nome: string;
  /**
   * Matrícula Siape do usuário.
   */
  matriculaSiape: string;
  /**
   * E-mail do usuário.
   */
  email: string;
  /**
   * Vínculos ativos do usuário.
   */
  vinculosAtivos: UsuarioFindOneResultDtoVinculoAtivo;
};
