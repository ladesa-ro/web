import { useApiBaseResourceDelete } from '../../../../../integrations';
import type { MaybePromise } from '../../../../../typings';

export type IUseTurmaHandleDeleteOptions = {
  afterSuccess?: () => MaybePromise<any>;
};

export const useTurmaHandleDelete = (
  options: IUseTurmaHandleDeleteOptions = {}
) => {
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
