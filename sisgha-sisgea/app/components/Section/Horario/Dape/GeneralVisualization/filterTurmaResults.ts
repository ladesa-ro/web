import type { Ladesa_ManagementService_Domain_Contracts_TurmaListOutput as TurmaListOutput } from '@ladesa-ro/management-service-client';

export const filterTurmaResultsBySearch = (
  turmasCompleteList: Ref<TurmaListOutput | undefined>,
  searchBarValue: Ref<string>
) => {
  const turmasParsedItems = computed(() => {
    if (turmasCompleteList.value) {
      return turmasCompleteList.value?.data.map(turma => {
        return {
          label: turma.periodo + ' - ' + turma.curso.nomeAbreviado,
          value: turma.id,
        };
      });
    }
  });

  const filteredTurmas = computed(() => {
    if (turmasParsedItems.value) {
      const searchedTurmas = filterItemsBySearch(
        turmasParsedItems.value,
        searchBarValue.value
      );

      const removedUnsearchedTurmas = turmasCompleteList.value?.data.filter(
        turma => {
          const searchedTurma = searchedTurmas.find(
            searchedTurma => turma.id === searchedTurma.value
          );

          return searchedTurma !== undefined;
        }
      );

      return removedUnsearchedTurmas;
    }
  });

  return filteredTurmas;
};
