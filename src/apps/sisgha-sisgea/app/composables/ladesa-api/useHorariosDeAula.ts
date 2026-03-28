import { useQuery } from '@tanstack/vue-query';
import { createInvalidate } from '~/composables/query-helpers';
import {
  horariosDeAulaFindAtual,
  horariosDeAulaReplace,
} from '@ladesa-ro/web.api.client';
import type {
  HorarioAulaItemInputDto,
  HorarioDeAulaListOutputDto,
} from '@ladesa-ro/web.api.client';

export const useHorariosDeAula = () => {
  const api = useApiClient();

  const keys = ['horarios-de-aula'] as const;

  const findAtual = (campusId: MaybeRef<string | null>) => {
    return useQuery<HorarioDeAulaListOutputDto>({
      queryKey: computed(() => [...keys, 'atual', unref(campusId)]),
      queryFn: () => {
        const id = unref(campusId);
        if (!id) return { data: [] };
        return api.call(horariosDeAulaFindAtual, {
          path: { campusId: id },
        });
      },
      enabled: computed(() => !!unref(campusId)),
    });
  };

  const replace = (campusId: string, horarios: HorarioAulaItemInputDto[]) => {
    return api.call(horariosDeAulaReplace, {
      path: { campusId },
      body: { horarios },
    });
  };

  const invalidate = createInvalidate(keys);

  return { keys, findAtual, replace, invalidate };
};
