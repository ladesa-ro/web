export function useCampusDoUsuario(userId: string, getCampusId?: boolean) {
  const campus = ref<string | null>(null);
  const apiClient = useApiClient();

  onMounted(async () => {
    try {
      const response = await apiClient.perfis.perfilList({
        filterUsuarioId: [userId],
      });
      const perfil = response.data?.[0];

      if(getCampusId) campus.value = perfil?.campus?.id || null;
      else campus.value = perfil?.campus?.apelido || null;
    } catch (error) {
      console.error('Erro ao buscar campus do usuário:', error);
    }
  });

  return { campus };
}