//

export type GenericInput = Record<string, any>;

export type PaginationOptions = {
  limit?: number | null;
  page?: number | null;
  search?: string | null;
  sortBy?: Array<string> | null;
};

export type PaginationSortBy<Properties extends string = string> = {
  sortBy?: Array<`${Properties}:${'ASC' | 'DESC'}` | string> | null;
};

export type PaginationFilters<Filters extends string = string> = Record<
  `filter${Filters}`,
  any[] | any | null | undefined
>;

export type IApiCoreListInput<
  Filters extends string = string,
  Sortables extends string = string,
> = GenericInput &
  PaginationOptions &
  PaginationSortBy<Sortables> &
  PaginationFilters<Filters>;

export type IApiCoreListOutput<ResultItemDto = unknown> = {
  data: ResultItemDto[];

  meta: {
    itemsPerPage: number;
    totalItems: number;
    currentPage: number;
    totalPages: number;

    sortBy: [string, string][];

    search: string;
    filter?: Record<string, any>;
  };

  links?: {
    next: string | null;
    last: string | null;
    first: string | null;
    current: string | null;
    previous: string | null;
  };
};
