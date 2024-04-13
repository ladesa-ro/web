/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BlocoFindOneResultDto } from "./BlocoFindOneResultDto";
import type { PaginatedResultDtoMeta } from "./PaginatedResultDtoMeta";
export type BlocoFindAllResultDto = {
  /**
   * Metadados da busca.
   */
  meta: PaginatedResultDtoMeta;
  /**
   * Resultados da busca.
   */
  data: Array<BlocoFindOneResultDto>;
};
