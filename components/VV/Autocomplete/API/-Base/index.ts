import type { IApiBaseResourceListRetriever } from '../../../../../integrations';

export type IUIAutocompleteApiRetrieverOptions<
  ResultItemDto extends any = any,
> = {
  baseQueryKey: MaybeRef<any>[] | MaybeRef<any>;
  apiBaseResourceListRetriever: IApiBaseResourceListRetriever<ResultItemDto>;
};

export const createUIAutocompleteApiRetrieverOptions = <
  ResultItemDto extends any = any,
  T extends
    IUIAutocompleteApiRetrieverOptions<ResultItemDto> = IUIAutocompleteApiRetrieverOptions<ResultItemDto>,
>(
  options: T
) => options;
