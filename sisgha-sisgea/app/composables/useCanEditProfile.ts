import { computed } from 'vue';
import { useApiContext } from '../components/API/Context/setup-context';

export function useCanEditProfile(viewedUserId?: string | null) {
  const { usuario } = useApiContext();

  const canEdit = computed(() => {
    const loggedUser = unref(usuario);
    if (!loggedUser?.id || !viewedUserId) return false;
    return loggedUser.id === viewedUserId;
  });

  return { canEdit };
}