/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CidadeFindOneResultDto } from "./CidadeFindOneResultDto";
export type EnderecoFindOneResultDto = {
  /**
   * ID do endereço.
   */
  id: string;
  /**
   * CEP do endereço.
   */
  cep: string;
  /**
   * Logradouro do endereço.
   */
  logradouro: string;
  /**
   * Número do endereço.
   */
  numero: number;
  /**
   * Bairro do endereço.
   */
  bairro: string;
  /**
   * Complemento do endereço.
   */
  complemento: string | null;
  /**
   * Ponto de referência do endereço.
   */
  pontoReferencia: string | null;
  /**
   * Consulta à cidade do endereço.
   */
  cidade: CidadeFindOneResultDto;
};
