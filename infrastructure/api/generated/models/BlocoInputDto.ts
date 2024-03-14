/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ObjectUuidDto } from "./ObjectUuidDto";
export type BlocoInputDto = {
  /**
   * Nome do bloco.
   */
  nome: string;
  /**
   * Código / Letra / Número do bloco.
   */
  codigo: string;
  /**
   * Campus que o bloco pertence.
   */
  campus: ObjectUuidDto;
};
