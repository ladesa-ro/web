/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { EstadoFindOneResultDto } from "./EstadoFindOneResultDto";
export type CidadeFindOneResultDto = {
  /**
   * ID IBGE da cidade.
   */
  id: number;
  /**
   * Nome oficial da cidade.
   */
  nome: string;
  /**
   * Estado brasileiro o qual a cidade pertence.
   */
  estado: EstadoFindOneResultDto;
};
