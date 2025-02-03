import type { TurmaListData } from '@ladesa-ro/api-client-fetch';
import type { MaybePromise } from '../../../../typings';
import { useApiBaseResourceDelete, useApiBaseResourceGet } from '../base';

export const turmasBaseQueryKey = ['turmas'];

export type IUseTurmaHandleDeleteOptions = {
  afterSuccess?: () => MaybePromise<any>;
};

export const useTurmaDelete = (options: IUseTurmaHandleDeleteOptions = {}) => {
  const { afterSuccess } = options;

  //

  const apiClient = useApiClient();

  const canDeleteCheck = async () => {
    const canDelete = window.confirm(
      'Você tem certeza de que deseja deletar esta turma?'
    );

    return canDelete;
  };

  const turmaDeleteExecutor = async (id: string) => {
    return apiClient.turmas.turmaDeleteOneById({ id: id });
  };

  return useApiBaseResourceDelete({
    canDeleteCheck,
    executor: turmaDeleteExecutor,

    mutationKey: ['turmas::delete'],

    invalidators: [
      {
        filter: {
          queryKey: ['turmas'],
        },
      },
    ],

    afterDeleteSuccess: afterSuccess,
  });
};

export const useTurmaGet = async (
  idRef: MaybeRef<string | null | undefined>
) => {
  const turmaGetRetriever = useTurmaGetRetriever();

  return useApiBaseResourceGet({
    id: idRef,
    baseQueryKey: turmasBaseQueryKey,
    apiResourceGetRetriever: turmaGetRetriever,
  });
};

export const useTurmaGetRetriever = () => {
  const apiClient = useApiClient();

  return (id: string) => {
    return apiClient.turmas.turmaFindOneById({ id });
  };
};

export const useTurmasRetriever = () => {
  const apiClient = useApiClient();

  return (data: TurmaListData) => {
    return apiClient.turmas.turmaList(data);
  };
};
