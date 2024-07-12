export type IBaseApiSearchInput = Record<string, any> & {
  limit?: number;
  page?: number;
  search?: string;
  sortBy?: Array<string>;
} & Record<`filter${string}`, any[] | undefined>;

export type IBaseApiSearchResponse<T = unknown> = Record<string, any> & {
  data: T[];
  meta: any;
  links: any;
};

export type IBaseApiSearchFn<
  ResultItemDto,
  SearchInputDto extends IBaseApiSearchInput = IBaseApiSearchInput,
> = (data: SearchInputDto) => Promise<IBaseApiSearchResponse<ResultItemDto>>;
