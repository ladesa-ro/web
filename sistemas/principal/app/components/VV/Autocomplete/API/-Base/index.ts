import type { MaybePromise } from '../../../../../typings';
import type { IApiBaseResourceListRetriever } from '../../../../../utils/integrations/api/base/list.base';

export type IUIAutocompleteApiRetrieverOptions<
  Value = any,
  ResultItemDto = any,
> = {
  baseQueryKey: MaybeRef<any>[] | MaybeRef<any>;

  apiResourceGetRetriever: (value: Value) => MaybePromise<ResultItemDto | null>;
  apiResourceListRetriever: IApiBaseResourceListRetriever<ResultItemDto>;

  transformer: (item: ResultItemDto) => { label: string; value: Value };
};

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
