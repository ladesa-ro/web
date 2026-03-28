import { useQuery } from '@tanstack/vue-query';
import { usuarioFindById } from '@ladesa-ro/web.api.client';

export const useApiUsuarioPerfisAtivos = async (
  idRef: MaybeRef<string | null | undefined>
) => {
  const api = useApiClient();

  const query = useQuery({
    queryKey: [
      'usuarios',
      computed(() => `usuario::id::${unref(idRef)}`),
      'vinculos_ativos',
    ],

    queryFn: async () => {
      const id = unref(idRef);
      if (id) {
        const usuario = await api.call(usuarioFindById, { path: { id } });
        return {
          data: (usuario?.vinculos ?? []).filter((v: any) => v.ativo),
        };
      } else {
        return null;
      }
    },
  });

  const vinculosAtivos = computed(() => unref(query.data)?.data ?? null);

  await query.suspense();

  return { query, vinculosAtivos };
};
