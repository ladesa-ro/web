import type {
  CancelablePromise,
  CursoListResponse,
  Ladesa_ManagementService_Domain_Contracts_CursoListOutput as CursoOutput,
  Ladesa_ManagementService_Domain_Contracts_OfertaFormacaoListOutput as OfertaFormacaoOutput,
  TurmaListResponse,
  Ladesa_ManagementService_Domain_Contracts_TurmaListOutput as TurmaOutput,
} from '@ladesa-ro/management-service-client';
import { useQuery, type UseQueryReturnType } from '@tanstack/vue-query';
import type { ParsedItem } from './useOptionItems';

type QueryOfertaFormacao = UseQueryReturnType<OfertaFormacaoOutput, Error>;

type QueryCurso = UseQueryReturnType<CursoOutput, Error>;

type QueryTurma = UseQueryReturnType<TurmaOutput, Error>;

export type Queries = {
  formacao: QueryOfertaFormacao | null;
  curso: QueryCurso | null;
  turma: QueryTurma | null;
};

//

export type OptionData = {
  nome: 'Formação' | 'Curso' | 'Turma';
  content: ParsedItem[] | null;
  selected: ParsedItem | null;
};

const scheduleSelectionData: Ref<OptionData[]> = ref([
  {
    nome: 'Formação',
    content: null,
    selected: null,
  },
  {
    nome: 'Curso',
    content: null,
    selected: null,
  },
  {
    nome: 'Turma',
    content: null,
    selected: null,
  },
]);

export const setScheduleSelectionData = (data: OptionData[]) => {
  scheduleSelectionData.value = data;
};

export const getScheduleSelectionData = () => scheduleSelectionData;

export const clearScheduleSelectionData = () => {
  scheduleSelectionData.value = [
    {
      nome: 'Formação',
      content: null,
      selected: null,
    },
    {
      nome: 'Curso',
      content: null,
      selected: null,
    },
    {
      nome: 'Turma',
      content: null,
      selected: null,
    },
  ];
};

//

export const useQueryAndDefineData = async (
  query: QueryOfertaFormacao | QueryCurso | QueryTurma,
  scheduleSelectionData: Ref<OptionData[]>,
  scheduleSelectionIndex: number,
  mapFn: (item: any) => ParsedItem,
  queries: Ref<Queries>
) => {
  try {
    await query.refetch();

    const queryData = (await query.promise.value) as {
      data: any[];
      [key: string]: any;
    };

    scheduleSelectionData.value[scheduleSelectionIndex]!.content =
      queryData.data.map(mapFn);

    const anyItemSelected = computed(
      () =>
        scheduleSelectionData.value[scheduleSelectionIndex]!.selected !== null
    );

    if (scheduleSelectionIndex === 0) {
      queries.value.formacao = query as QueryOfertaFormacao;
    } else if (scheduleSelectionIndex === 1) {
      queries.value.curso = query as QueryCurso;
    } else if (scheduleSelectionIndex === 2) {
      queries.value.turma = query as QueryTurma;
    }

    return anyItemSelected;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const useQueryAndDefineDataThatDependOnOthers = (
  scheduleSelectionData: Ref<OptionData[]>,
  scheduleSelectionDataIndex: number,
  queryKey: string[],
  queryFn:
    | CancelablePromise<TurmaListResponse>
    | CancelablePromise<CursoListResponse>,
  mapFn: (item: any) => ParsedItem,
  queries: Ref<Queries>
) => {
  const query = useQuery({
    queryKey: queryKey,
    queryFn: async () => await queryFn,
    enabled: false,
  }) as QueryTurma | QueryCurso;

  const haveSelected = ref();

  watch(
    () => scheduleSelectionData.value[scheduleSelectionDataIndex - 1]?.selected,
    async newVal => {
      if (newVal !== null) {
        haveSelected.value = await useQueryAndDefineData(
          query,
          scheduleSelectionData,
          scheduleSelectionDataIndex,
          mapFn,
          queries
        );
      }
    }
  );

  return haveSelected;
};
