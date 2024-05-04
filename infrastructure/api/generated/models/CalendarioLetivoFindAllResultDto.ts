/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CalendarioLetivoFindOneResultDto } from './CalendarioLetivoFindOneResultDto';
import type { PaginatedResultDtoLinks } from './PaginatedResultDtoLinks';
import type { PaginatedResultDtoMeta } from './PaginatedResultDtoMeta';
export type CalendarioLetivoFindAllResultDto = {
	meta: PaginatedResultDtoMeta;
	/**
	 * Resultados da busca atual.
	 */
	data: Array<CalendarioLetivoFindOneResultDto>;
	links: PaginatedResultDtoLinks;
};
