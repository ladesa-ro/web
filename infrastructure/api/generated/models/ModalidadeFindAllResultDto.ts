/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ModalidadeFindOneResultDto } from './ModalidadeFindOneResultDto';
import type { PaginatedResultDtoLinks } from './PaginatedResultDtoLinks';
import type { PaginatedResultDtoMeta } from './PaginatedResultDtoMeta';
export type ModalidadeFindAllResultDto = {
	meta: PaginatedResultDtoMeta;
	/**
	 * Resultados da busca atual.
	 */
	data: Array<ModalidadeFindOneResultDto>;
	links: PaginatedResultDtoLinks;
};
