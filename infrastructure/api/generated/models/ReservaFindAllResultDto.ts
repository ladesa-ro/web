/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PaginatedResultDtoMeta } from "./PaginatedResultDtoMeta";
import type { ReservaFindOneResultDto } from "./ReservaFindOneResultDto";
export type ReservaFindAllResultDto = {
  /**
   * Metadados da busca.
   */
  meta: PaginatedResultDtoMeta;
  /**
   * Resultados da busca.
   */
  data: Array<ReservaFindOneResultDto>;
};
