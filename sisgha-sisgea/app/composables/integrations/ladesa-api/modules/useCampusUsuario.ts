export function useCampusDoUsuario(userId: string) {
  const campus = ref<string | null>(null);
  const apiClient = useApiClient();

  onMounted(async () => {
    try {
      const response = await apiClient.perfis.perfilFindAll({
        filterUsuarioId: [userId],
      });
      const perfil = response.data?.[0];

      campus.value = perfil?.campus?.apelido || null;
    } catch (error) {
      console.error('Erro ao buscar campus do usuário:', error);
    }
  });

  return { campus };
}
