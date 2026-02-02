import type {
  TurmaFindOneOutputDto,
  UsuarioFindOneOutputDto,
} from '~/helpers/api-client';

type ScheduleOwner =
  | Ref<TurmaFindOneOutputDto, TurmaFindOneOutputDto>
  | Ref<UsuarioFindOneOutputDto, UsuarioFindOneOutputDto>
  | Ref<undefined>;

export const getOwnerName = (
  isLoading: Ref<boolean>,
  isProfessor: boolean,
  scheduleOwner: ScheduleOwner
) => {
  return computed(() => {
    if (
      !isLoading.value &&
      isProfessor &&
      scheduleOwner.value !== undefined &&
      'nome' in scheduleOwner.value
    ) {
      return scheduleOwner.value.nome ?? 'Nome não disponível';
    } else if (
      !isLoading.value &&
      !isProfessor &&
      scheduleOwner.value !== undefined &&
      'periodo' in scheduleOwner.value &&
      'curso' in scheduleOwner.value
    ) {
      return (
        (scheduleOwner.value.periodo ?? 'Período não disponível') +
        ' - ' +
        (scheduleOwner.value.curso.nomeAbreviado ?? 'Curso não disponível')
      );
    }
  });
};
