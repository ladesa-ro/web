import { useQuery } from '@tanstack/vue-query';
import { type MaybeRef, computed, unref } from 'vue';
import {
  QuerySuspense,
  type QuerySuspenseBehaviour,
  QuerySuspenseBehaviourMode,
} from '../../../integrations';

export const useApiCursosFindOne = async (
  idRef: MaybeRef<string | null | undefined>,
  suspenseBehaviour?: QuerySuspenseBehaviour
) => {
  const apiClient = useApiClient();

  const query = useQuery({
    queryKey: ['cursos', computed(() => `curso::id::${unref(idRef)}`)],

    queryFn: async () => {
      const id = unref(idRef);
      if (id) {
        return apiClient.cursos.cursoFindOneById({
          id: id,
        });
      } else {
        return null;
      }
    },
  });

  const curso = computed(() => unref(query.data) ?? null);

  await QuerySuspense(
    query,
    suspenseBehaviour ?? { mode: QuerySuspenseBehaviourMode.AWALWAYS_WAIT }
  );

  return {
    query,
    curso,
  };
};
