/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BlocoFindOneResultDto } from './BlocoFindOneResultDto';
import type { PaginatedResultDtoLinks } from './PaginatedResultDtoLinks';
import type { PaginatedResultDtoMeta } from './PaginatedResultDtoMeta';
export type BlocoFindAllResultDto = {
	meta: PaginatedResultDtoMeta;
	/**
	 * Resultados da busca atual.
	 */
	data: Array<BlocoFindOneResultDto>;
	links: PaginatedResultDtoLinks;
};
