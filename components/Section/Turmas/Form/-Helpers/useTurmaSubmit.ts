import { useMutation, useQueryClient } from '@tanstack/vue-query';
import type { TurmaFormOutput } from './typings';

export type ITurmaHandleSubmitOptions = {
  editId: string | null;
  values: TurmaFormOutput;
};

export const useTurmaSubmit = () => {
  const apiClient = useApiClient();

  const queryClient = useQueryClient();

  const turmaSubmitBase = async (options: ITurmaHandleSubmitOptions) => {
    const { editId, values } = options;

    const { _, imagem, ...data } = values;

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

  const query = useMutation({
    mutationKey: ['turmas::submit'],
    mutationFn: turmaSubmitBase,
  });

  const { mutateAsync: handleSubmit } = query;

  return {
    query,
    //
    handleSubmit,
    //
    turmaSubmitBase,
    turmaSubmit: handleSubmit,
  };
};
