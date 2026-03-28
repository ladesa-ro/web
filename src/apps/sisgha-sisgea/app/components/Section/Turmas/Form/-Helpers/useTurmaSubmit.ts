import { useMutation, useQueryClient } from '@tanstack/vue-query';
import {
  turmaCreate,
  turmaUpdate,
  turmaUpdateImagemCapa,
} from '@ladesa-ro/web.api.client';
import type { TurmaFormOutput } from './typings';

export type ITurmaHandleSubmitOptions = {
  editId: string | null;
  values: TurmaFormOutput;
};

export const useTurmaSubmit = () => {
  const api = useApiClient();

  const queryClient = useQueryClient();

  const turmaSubmitBase = async (options: ITurmaHandleSubmitOptions) => {
    const { editId, values } = options;

    const { _, imagem, ...data } = values;

    let id;

    if (editId === null) {
      const turmaCriada = await api.call(turmaCreate, {
        body: { ...data },
      });

      id = turmaCriada.id;
    } else {
      await api.call(turmaUpdate, {
        path: { id: editId },
        body: { ...values },
      });

      id = editId;
    }

    if (imagem) {
      await api.call(turmaUpdateImagemCapa, {
        path: { id },
        body: { file: imagem },
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
