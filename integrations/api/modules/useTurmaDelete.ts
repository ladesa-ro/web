import type { MaybePromise } from '../../../typings';
import { useApiBaseResourceDelete } from '../base';

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
    return apiClient.turmas.turmaDeleteById({ id: id });
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
