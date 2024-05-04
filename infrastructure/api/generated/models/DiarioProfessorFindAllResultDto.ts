/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DiarioProfessorFindOneResultDto } from './DiarioProfessorFindOneResultDto';
import type { PaginatedResultDtoLinks } from './PaginatedResultDtoLinks';
import type { PaginatedResultDtoMeta } from './PaginatedResultDtoMeta';
export type DiarioProfessorFindAllResultDto = {
	meta: PaginatedResultDtoMeta;
	/**
	 * Resultados da busca atual.
	 */
	data: Array<DiarioProfessorFindOneResultDto>;
	links: PaginatedResultDtoLinks;
};
