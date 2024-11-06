export type IGenericListItem = {
  id: string | number;
};

export type GenericInput = Record<string, any>;

export type PaginationOptions = {
  limit?: number;
  page?: number;
  search?: string;
  sortBy?: Array<string>;
};

export type PaginationSortBy<Properties extends string = string> = {
  sortBy?: Array<`${Properties}:${'ASC' | 'DESC'}` | string>;
};

export type PaginationFilters<Filters extends string = string> = Record<
  `filter${Filters}`,
  any[] | undefined
>;

export type IApiBaseResourceListRetrieverInput<
  Filters extends string = string,
  Sortables extends string = string,
> = GenericInput &
  PaginationOptions &
  PaginationSortBy<Sortables> &
  PaginationFilters<Filters>;

export type IApiBaseResourceListRetrieverResponse<ResultItemDto = unknown> = {
  data: ResultItemDto[];
  meta: {
    itemsPerPage: number;
    totalItems: number;
    currentPage: number;
    totalPages: number;
    sortBy: { mode: string; property: string }[];
    search: string;
    filter: unknown[];
  };
  links: {
    next: string | null;
    last: string | null;
    first: string | null;
    current: string | null;
    previous: string | null;
  };
};

export type IApiBaseResourceListRetriever<
  ListRetrieverResultItemDto = IGenericListItem,
  SearchInputDto extends
    IApiBaseResourceListRetrieverInput = IApiBaseResourceListRetrieverInput,
> = (
  data: SearchInputDto
) => Promise<IApiBaseResourceListRetrieverResponse<ListRetrieverResultItemDto>>;
