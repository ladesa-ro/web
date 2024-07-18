import { useMutation, useQueryClient } from '@tanstack/vue-query';
import type { TurmaFormOutput } from './typings';

export type ITurmaHandleSubmitOptions = {
  editId: string | null;
  values: TurmaFormOutput;
};

export const useTurmaHandleSubmit = () => {
  const apiClient = useApiClient();

  const queryClient = useQueryClient();

  const turmaHandleSubmitBase = async (options: ITurmaHandleSubmitOptions) => {
    const { editId, values } = options;

    const { imagem, ...data } = values;

    let id;

    if (editId === null) {
      const turmaCriada = await apiClient.turmas.turmaCreate({
        requestBody: { ...data },
      });

      id = turmaCriada.id;
    } else {
      await apiClient.turmas.turmaUpdateById({
        id: editId,

        requestBody: {
          ...values,
        },
      });

      id = editId;
    }

    if (imagem) {
      await apiClient.turmas.turmaSetCoverImage({
        id: id,
        formData: { file: imagem },
      });
    }

    await queryClient.invalidateQueries({
      queryKey: ['turmas'],
    });
  };

  const mutationQuery = useMutation({
    mutationKey: ['turmas::create'],
    mutationFn: turmaHandleSubmitBase,
  });

  const { mutateAsync } = mutationQuery;

  return {
    mutateAsync,
    mutationQuery,
    turmaHandleSubmitBase,
  };
};
