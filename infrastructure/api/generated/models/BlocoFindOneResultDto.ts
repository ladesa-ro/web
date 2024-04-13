/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CampusFindOneResultDto } from "./CampusFindOneResultDto";
export type BlocoFindOneResultDto = {
  /**
   * ID do bloco
   */
  id: string;
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
  campus: CampusFindOneResultDto;
};
