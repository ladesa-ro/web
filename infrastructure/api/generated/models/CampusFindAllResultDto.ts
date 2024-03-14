/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CampusFindOneResultDto } from "./CampusFindOneResultDto";
import type { PaginatedResultDtoMeta } from "./PaginatedResultDtoMeta";
export type CampusFindAllResultDto = {
  /**
   * Metadados da busca.
   */
  meta: PaginatedResultDtoMeta;
  /**
   * Resultados da busca.
   */
  data: Array<CampusFindOneResultDto>;
};
