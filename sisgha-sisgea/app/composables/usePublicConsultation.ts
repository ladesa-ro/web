import type { CancelablePromise } from '@ladesa-ro/management-service-client';
import { useQuery, type UseQueryReturnType } from '@tanstack/vue-query';
import type { ParsedItem } from './useOptionItems';

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
  query: UseQueryReturnType<any, any>,
  scheduleSelectionData: Ref<OptionData[]>,
  scheduleSelectionIndex: number,
  mapFn: (item: any) => ParsedItem
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

    return anyItemSelected;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const useQueryAndDefineDataWithWatcher = (
  scheduleSelectionData: Ref<OptionData[]>,
  scheduleSelectionDataIndex: number,
  queryKey: string[],
  queryFn: CancelablePromise<any>,
  mapFn: (item: any) => ParsedItem,
  queries: Ref<UseQueryReturnType<any, any>[]>
) => {
  const query = useQuery({
    queryKey: queryKey,
    queryFn: async () => await queryFn,
    enabled: false,
  });

  const haveSelected = ref();

  watch(
    () => scheduleSelectionData.value[scheduleSelectionDataIndex - 1]?.selected,
    async newVal => {
      if (newVal !== null) {
        haveSelected.value = await useQueryAndDefineData(
          query,
          scheduleSelectionData,
          scheduleSelectionDataIndex,
          mapFn
        );

        queries.value.push(query);
      }
    }
  );

  return haveSelected;
};

//

export const hydratateSelectedItemsNamesWithScheduleSelectionData = () => {
  if (
    scheduleSelectionData.value.find(
      selectionItem => selectionItem.selected !== null
    )
  ) {
    return false;
  }

  const itemsNamesKeys = Object.keys(selectedItemsNames);

  const selectedNames: SelectedItemsNames = {} as SelectedItemsNames;

  scheduleSelectionData.value.forEach((itemData, index) => {
    const key = itemsNamesKeys[index];
    if (!key) return;
    selectedNames[key] = itemData.selected!.label;
  });

  selectedItemsNames.value = selectedNames;

  return true;
};

// the ref below is setted in SectionConsultaSelectionList.vue and getted in AppbarPublicConsultation.vue

export type SelectedItemsNames = {
  formacao: null | string;
  curso: null | string;
  turma: null | string;
  [key: string]: null | string;
};

const selectedItemsNames = ref<SelectedItemsNames>({
  formacao: null,
  curso: null,
  turma: null,
});

export const setSelectedItems = (data: SelectedItemsNames) => {
  selectedItemsNames.value = data;
};

export const getSelectedItems = () => selectedItemsNames;

export const clearSelectedItems = () => {
  selectedItemsNames.value = { formacao: null, curso: null, turma: null };
};
