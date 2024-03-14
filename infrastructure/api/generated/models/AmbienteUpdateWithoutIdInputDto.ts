/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type AmbienteUpdateWithoutIdInputDto = {
  /**
   * Nome do ambiente/sala.
   */
  nome?: string;
  /**
   * Descrição do ambiente/sala.
   */
  descricao?: string;
  /**
   * Código do ambiente/sala.
   */
  codigo?: string;
  /**
   * Capacidade do ambiente/sala.
   */
  capacidade?: number | null;
  /**
   * Tipo do ambiente/sala. Ex.: sala aula, auditório, laboratório de química.
   */
  tipo?: string | null;
};
