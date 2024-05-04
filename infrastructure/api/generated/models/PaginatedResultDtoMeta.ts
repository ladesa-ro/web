/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PaginatedResultDtoMetaFilter } from './PaginatedResultDtoMetaFilter';
import type { PaginatedResultDtoMetaSortBy } from './PaginatedResultDtoMetaSortBy';
export type PaginatedResultDtoMeta = {
	itemsPerPage: number;
	totalItems: number;
	currentPage: number;
	totalPages: number;
	search: string;
	sortBy: Array<PaginatedResultDtoMetaSortBy>;
	filter: Array<PaginatedResultDtoMetaFilter>;
};
