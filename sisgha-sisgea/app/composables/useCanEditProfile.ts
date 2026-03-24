import { computed } from 'vue';
import { useApiContext } from '~/composables/api-context/setup';

export function useCanEditProfile(viewedUserId?: string | null) {
  const { usuario } = useApiContext();

  const canEdit = computed(() => {
    const loggedUser = unref(usuario);
    if (!loggedUser?.id || !viewedUserId) return false;
    return loggedUser.id === viewedUserId;
  });

  return { canEdit };
}