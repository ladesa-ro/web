/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { EstadoFindOneResultDto } from "./EstadoFindOneResultDto";
import type { PaginatedResultDtoMeta } from "./PaginatedResultDtoMeta";
export type EstadoFindAllResultDto = {
  /**
   * Metadados da busca.
   */
  meta: PaginatedResultDtoMeta;
  /**
   * Resultados da busca.
   */
  data: Array<EstadoFindOneResultDto>;
};
