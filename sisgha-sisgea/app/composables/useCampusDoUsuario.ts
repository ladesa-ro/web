import { useApiContext } from '~/composables/api-context/setup';

export function useCampusDoUsuario(userId?: MaybeRef<string | null>) {
  const campusId = ref<string | null>(null);
  const campusApelido = ref<string | null>(null);
  const isLoading = ref(false);

  const api = useApiClient();

  const fetchCampus = async (id: string) => {
    isLoading.value = true;
    try {
      const response = await api.perfis.perfilFindAll({
        filterUsuarioId: [id],
      } as any);
      const perfil = response.data?.[0];
      campusId.value = perfil?.campus?.id ?? null;
      campusApelido.value = perfil?.campus?.apelido ?? null;
    } catch (error) {
      console.error('Erro ao buscar campus do usuário:', error);
    } finally {
      isLoading.value = false;
    }
  };

  if (userId) {
    const resolvedId = unref(userId);
    if (resolvedId) {
      onMounted(() => fetchCampus(resolvedId));
    }

    if (isRef(userId)) {
      watch(userId, newId => {
        if (newId) fetchCampus(newId);
      });
    }
  }

  return { campusId, campusApelido, isLoading, fetchCampus };
}
