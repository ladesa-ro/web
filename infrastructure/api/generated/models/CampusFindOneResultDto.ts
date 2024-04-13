/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { EnderecoFindOneResultDto } from "./EnderecoFindOneResultDto";
export type CampusFindOneResultDto = {
  /**
   * ID do campus
   */
  id: string;
  /**
   * Nome fantasia do campus.
   */
  nomeFantasia: string;
  /**
   * Razão social do campus.
   */
  razaoSocial: string;
  /**
   * Apelido do campus.
   */
  apelido: string;
  /**
   * CNPJ do campus.
   */
  cnpj: string;
  /**
   * Endereço do campus.
   */
  endereco: EnderecoFindOneResultDto;
};
