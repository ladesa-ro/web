/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PaginatedResultDtoMeta } from "./PaginatedResultDtoMeta";
import type { TurmaFindOneResultDto } from "./TurmaFindOneResultDto";
export type TurmaFindAllResultDto = {
  /**
   * Metadados da busca.
   */
  meta: PaginatedResultDtoMeta;
  /**
   * Resultados da busca.
   */
  data: Array<TurmaFindOneResultDto>;
};
