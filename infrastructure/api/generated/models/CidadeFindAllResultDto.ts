/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CidadeFindOneResultDto } from './CidadeFindOneResultDto';
import type { PaginatedResultDtoLinks } from './PaginatedResultDtoLinks';
import type { PaginatedResultDtoMeta } from './PaginatedResultDtoMeta';
export type CidadeFindAllResultDto = {
	meta: PaginatedResultDtoMeta;
	/**
	 * Resultados da busca atual.
	 */
	data: Array<CidadeFindOneResultDto>;
	links: PaginatedResultDtoLinks;
};
