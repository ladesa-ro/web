import { useMutation, useQueryClient } from '@tanstack/vue-query';
import type { TurmaFormOutput } from './typings';

export type ITurmaHandleSubmitOptions = {
  editId: string | null;
  values: TurmaFormOutput;
};

export const useTurmaHandleDelete = () => {
  const apiClient = useApiClient();
  const queryClient = useQueryClient();

  const handleDeleteBase = async (id: string) => {
    await apiClient.turmas.turmaDeleteById({ id: id });
    await queryClient.invalidateQueries({ queryKey: ['turmas'] });
  };

  const mutationQuery = useMutation({
    mutationKey: ['turmas::delete'],
    mutationFn: handleDeleteBase,
  });

  const { mutateAsync } = mutationQuery;

  return {
    mutateAsync,
    mutationQuery,
    handleDeleteBase,
  };
};
