import { useForm } from 'vee-validate';
import * as yup from 'yup';

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
    list: (data?: any) => api.turmas.turmaFindAll(data),
    getOne: (id: string) => api.turmas.turmaFindById({ id }),
  } as any;

  const turmasOptions = {
    crudModule: turmasCrudModule,
    filter: turmasFilters,
  };

  return { values, turmasOptions };
};
