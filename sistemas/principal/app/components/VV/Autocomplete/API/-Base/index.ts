import type { MaybePromise } from '../../../../../typings';

export type IUIAutocompleteApiRetrieverOptions<
  Value = any,
  ResultItemDto = any,
> = {
  baseQueryKey: MaybeRef<any>[] | MaybeRef<any>;

  apiResourceGetRetriever: (value: Value) => MaybePromise<ResultItemDto | null>;
  apiResourceListRetriever: IApiBaseResourceListRetriever<ResultItemDto>;

  transformer: (item: ResultItemDto) => { label: string; value: Value };
};

/**
 * @deprecated
 */
export const createUIAutocompleteApiRetrieverOptions = <
  Value = any,
  ResultItemDto = any,
  T extends IUIAutocompleteApiRetrieverOptions<
    Value,
    ResultItemDto
  > = IUIAutocompleteApiRetrieverOptions<Value, ResultItemDto>,
>(
  options: T
) => options;
