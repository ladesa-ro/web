import type { MaybePromise } from '../../../../../typings';

export type IUseApiBaseResourceGetRetrivever<
  Id = any,
  ResultItemDto = unknown,
> = (id: Id) => MaybePromise<ResultItemDto>;
