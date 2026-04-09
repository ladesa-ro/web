import type { GradeHorariaItemOutputDto } from '@ladesa-ro/web.api.client';
import type { DayShift } from '~/composables/useAvailability';
import { agruparPorPeriodo, toDisplayFormat } from '~/utils/horarios';

export function useTurmaGradeSelection(campusId: MaybeRef<string | null>) {
  const gradesHorarias = useGradesHorarias();

  const campusGradesQuery = gradesHorarias.findByCampus(
    computed(() => unref(campusId) ?? null)
  );

  const campusGrades = computed(() => campusGradesQuery.data.value?.data ?? []);

  const selectedGradeIdentifier = ref<string | null>(null);

  watch(
    campusGrades,
    grades => {
      if (grades.length > 0 && !selectedGradeIdentifier.value) {
        selectedGradeIdentifier.value = grades[0]!.identificadorExterno;
      }
    },
    { immediate: true }
  );

  const selectedGrade = computed(
    (): GradeHorariaItemOutputDto | null =>
      campusGrades.value.find(
        (g: GradeHorariaItemOutputDto) =>
          g.identificadorExterno === selectedGradeIdentifier.value
      ) ?? null
  );

  const campusShifts = computed<DayShift[]>(() => {
    const grade = selectedGrade.value;
    if (!grade) return [];
    const intervalos = grade.intervalos.map(
      (item: { inicio: string; fim: string }) => ({
        inicio: item.inicio,
        fim: item.fim,
      })
    );
    const grupos = agruparPorPeriodo(intervalos);
    return grupos
      .map(g => ({
        title: g.nome.toLowerCase(),
        times: g.intervalos.map(i => toDisplayFormat(i.inicio)),
      }))
      .filter(s => s.times.length > 0);
  });

  const allCampusTimes = computed(() =>
    campusShifts.value.flatMap(s => s.times)
  );

  return {
    campusGradesQuery,
    campusGrades,
    selectedGradeIdentifier,
    selectedGrade,
    campusShifts,
    allCampusTimes,
    campusScheduleLoading: campusGradesQuery.isLoading,
  };
}
