type GenericInput = Record<string, any>;

type PaginationOptions = {
  limit?: number;
  page?: number;
  search?: string;
  sortBy?: Array<string>;
};

type PaginationSortBy<Properties extends string = string> = {
  sortBy?: Array<`${Properties}:${'ASC' | 'DESC'}`>;
};

type PaginationFilters<Filters extends string = string> = Record<
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
  meta: any;
  links: any;
};

export type IApiBaseResourceListRetriever<
  ListRetrieverResultItemDto,
  SearchInputDto extends
    IApiBaseResourceListRetrieverInput = IApiBaseResourceListRetrieverInput,
> = (
  data: SearchInputDto
) => Promise<IApiBaseResourceListRetrieverResponse<ListRetrieverResultItemDto>>;
