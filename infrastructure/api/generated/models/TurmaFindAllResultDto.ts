/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PaginatedResultDtoMeta } from "./PaginatedResultDtoMeta";
export type TurmaFindAllResultDto = {
  /**
   * Metadados da busca.
   */
  meta: PaginatedResultDtoMeta;
  /**
   * Resultados da busca.
   */
  data: Array<TurmaFindAllResultDto>;
};
