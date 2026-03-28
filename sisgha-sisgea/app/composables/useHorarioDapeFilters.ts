import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { turmaFindAll, turmaFindById } from '@ladesa-ro/web.api.client';
import type { IEntityListModule } from '~/components/UI/API/List/Context/UIApiListContext';

export const useHorarioDapeFilters = () => {
  const schema = yup.object().shape({
    ofertaFormacaoId: yup.string().notRequired(),
    cursoId: yup.string().notRequired(),
  });

  const { values } = useForm({
    validationSchema: schema,
    initialValues: {
      ofertaFormacaoId: null,
      cursoId: null,
    },
  });

  const turmasFilters = computed(() => ({
    filterCursoId: values.cursoId,
    filterCursoOfertaFormacaoId: values.ofertaFormacaoId,
  }));

  const api = useApiClient();

  const turmasCrudModule = {
    baseQueryKeys: ['turmas'] as string[],
    list: (data?: any) => api.call(turmaFindAll, { query: data }),
    getOne: (id: string) => api.call(turmaFindById, { path: { id } }),
  } satisfies IEntityListModule;

  const turmasOptions = {
    crudModule: turmasCrudModule,
    filter: turmasFilters,
  };

  return { values, turmasOptions };
};
