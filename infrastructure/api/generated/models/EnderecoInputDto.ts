/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ObjectIdDto } from "./ObjectIdDto";
export type EnderecoInputDto = {
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
   * Cidade do endereço.
   */
  cidade: ObjectIdDto;
};
