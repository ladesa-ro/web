import { useQuery, type UndefinedInitialQueryOptions, type UseQueryDefinedReturnType } from '@tanstack/vue-query';
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

export const useQueryAndDefineData = async (
  scheduleSelectionData: Ref<OptionData[]>,
  scheduleSelectionIndex: number,
  queryFn: UndefinedInitialQueryOptions & any,
  mapFn: (item: any, index: number) => ParsedItem,
  savedQueries: UseQueryDefinedReturnType<any, any>[]
) => {
  try {
    const query = useQuery(queryFn);

    savedQueries.push(query);

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
