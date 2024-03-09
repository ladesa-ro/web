import { useQueryClient } from "@tanstack/vue-query";
import castArray from "lodash-es/castArray";
import { BaseAPIActionConstructor } from "../../../../infrastructure/api/api-actions/BaseAPIAction";

export type IAppContextAPI = Awaited<ReturnType<typeof createAppContextAPI>>;

export const createAppContextAPI = () => {
  const gql = useGql();
  const queryClient = useQueryClient();

  const invoke = async <InputDto, Result>(
    apiActionConstructor: BaseAPIActionConstructor<InputDto, Result>,
    inputDto: InputDto,
  ) => {
    const apiAction = new apiActionConstructor(appContextAPI);
    const result = await apiAction.invoke(inputDto);
    return result;
  };

  const buildSchema = <InputDto, Result>(
    apiActionConstructor: BaseAPIActionConstructor<InputDto, Result>,
  ) => {
    const apiAction = new apiActionConstructor(appContextAPI);
    const schema = apiAction.buildSchema();
    return schema;
  };

  const invalidateQueries = async (keys: string | string[]) => {
    await queryClient.invalidateQueries({
      queryKey: [
        // ...
        ...castArray(keys),
      ],
    });
  };

  const appContextAPI = {
    gql,

    invoke,
    buildSchema,

    invalidateQueries,
  } as const;

  return appContextAPI;
};
