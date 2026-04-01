import { useQuery } from '@tanstack/vue-query';
import { createInvalidate } from '~/composables/query-helpers';
import {
  gradeHorariaFindByCampus,
  gradeHorariaReplace,
} from '@ladesa-ro/web.api.client';
import type { GradeHorariaListOutputDto } from '@ladesa-ro/web.api.client';

export interface GradeHorariaItemInput {
  identificadorExterno: string;
  nome: string;
  intervalos: Array<{ inicio: string; fim: string }>;
}

export const useGradesHorarias = () => {
  const api = useApiClient();

  const keys = ['grades-horarias'] as const;

  const findByCampus = (campusId: MaybeRef<string | null>) => {
    return useQuery<GradeHorariaListOutputDto>({
      queryKey: computed(() => [...keys, unref(campusId)]),
      queryFn: () => {
        const id = unref(campusId);
        if (!id) return { data: [] };
        return api.call(gradeHorariaFindByCampus, {
          path: { campusId: id },
        });
      },
      enabled: computed(() => !!unref(campusId)),
    });
  };

  const replace = (campusId: string, gradesHorarias: GradeHorariaItemInput[]) => {
    return api.call(gradeHorariaReplace, {
      path: { campusId },
      body: { gradesHorarias },
    });
  };

  const invalidate = createInvalidate(keys);

  return { keys, findByCampus, replace, invalidate };
};
