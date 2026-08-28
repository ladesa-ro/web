import { perfilUpdate } from '@ladesa-ro/web.api.client';
import { createInvalidate } from '~/composables/query-helpers';

export const usePerfil = () => {
  const api = useApiClient();
  const keys = ['perfil'] as const;

  const update = (
    id: string,
    dados: { cargaMaximaSemanal?: number | null }
  ) => api.call(perfilUpdate, { path: { id }, body: dados });

  const invalidate = createInvalidate(keys);

  return { keys, update, invalidate };
};
