import type { GradeHorariaItemInput } from '~/composables/ladesa-api/useGradesHorarias';
import type { GradeHorariaEditorGrade } from '~/composables/useGradeHorariaState';

export function useGradeHorariaSave(
  campusId: MaybeRef<string | null>,
  grades: Ref<GradeHorariaEditorGrade[]>,
  isEditing: Ref<boolean>,
  validate: () => string[],
  gradesHorarias: ReturnType<typeof useGradesHorarias>
) {
  const isSaving = ref(false);

  async function save() {
    const id = unref(campusId);
    if (!id) return;

    const errors = validate();
    if (errors.length > 0) {
      throw new Error(errors.join('\n'));
    }

    isSaving.value = true;
    try {
      const payload: GradeHorariaItemInput[] = grades.value.map(g => ({
        identificadorExterno: g.identificadorExterno,
        nome: g.nome,
        intervalos: g.intervalos,
      }));

      await gradesHorarias.replace(id, payload);
      await gradesHorarias.invalidate();
      isEditing.value = false;
    } finally {
      isSaving.value = false;
    }
  }

  return {
    isSaving,
    save,
  };
}
