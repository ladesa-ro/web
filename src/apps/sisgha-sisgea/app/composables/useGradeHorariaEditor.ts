export type { GradeHorariaEditorGrade, BulkAddParams } from '~/composables/useGradeHorariaState';
export type { GradeValidationErrors } from '~/composables/useGradeHorariaValidation';

export function useGradeHorariaEditor(campusId: MaybeRef<string | null>) {
  const state = useGradeHorariaState(campusId);
  const validation = useGradeHorariaValidation(state.grades);
  const saving = useGradeHorariaSave(campusId, state.grades, state.isEditing, validation.validate, state.gradesHorarias);

  return {
    grades: state.grades,
    serverGrades: state.serverGrades,
    isEditing: state.isEditing,
    isSaving: saving.isSaving,
    isDirty: state.isDirty,
    isLoading: state.campusQuery.isFetching,
    enterEditMode: state.enterEditMode,
    cancelEdit: state.cancelEdit,
    addGrade: state.addGrade,
    removeGrade: state.removeGrade,
    addInterval: state.addInterval,
    removeInterval: state.removeInterval,
    removeIntervalsByPeriodo: state.removeIntervalsByPeriodo,
    clearAllIntervals: state.clearAllIntervals,
    generateBulkIntervals: state.generateBulkIntervals,
    addIntervalsBulk: state.addIntervalsBulk,
    validate: validation.validate,
    validationErrors: validation.validationErrors,
    save: saving.save,
  };
}
