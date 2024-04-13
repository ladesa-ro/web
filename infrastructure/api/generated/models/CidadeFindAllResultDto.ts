/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CidadeFindOneResultDto } from "./CidadeFindOneResultDto";
import type { PaginatedResultDtoMeta } from "./PaginatedResultDtoMeta";
export type CidadeFindAllResultDto = {
  /**
   * Metadados da busca.
   */
  meta: PaginatedResultDtoMeta;
  /**
   * Resultados da busca.
   */
  data: Array<CidadeFindOneResultDto>;
};
