import type { GradeHorariaItemInput } from '~/composables/ladesa-api/useGradesHorarias';
import type { GradeHorariaItemOutputDto } from '@ladesa-ro/web.api.client';
import { validarIntervalos } from '~/utils/horarios';

export interface GradeHorariaEditorGrade {
  identificadorExterno: string;
  nome: string;
  intervalos: Array<{ inicio: string; fim: string }>;
}

export function useGradeHorariaEditor(campusId: MaybeRef<string | null>) {
  const gradesHorarias = useGradesHorarias();
  const campusQuery = gradesHorarias.findByCampus(campusId);

  const isEditing = ref(false);
  const isSaving = ref(false);

  const grades = ref<GradeHorariaEditorGrade[]>([]);
  const serverGrades = ref<GradeHorariaEditorGrade[]>([]);

  const isDirty = computed(() => {
    return JSON.stringify(grades.value) !== JSON.stringify(serverGrades.value);
  });

  // Sync server data
  watch(
    () => campusQuery.data.value,
    (data) => {
      const items: GradeHorariaEditorGrade[] = (data?.data ?? []).map((g: GradeHorariaItemOutputDto) => ({
        identificadorExterno: g.identificadorExterno,
        nome: g.nome,
        intervalos: g.intervalos.map((i: { inicio: string; fim: string }) => ({ inicio: i.inicio, fim: i.fim })),
      }));
      serverGrades.value = JSON.parse(JSON.stringify(items));
      if (!isEditing.value) {
        grades.value = JSON.parse(JSON.stringify(items));
      }
    },
    { immediate: true },
  );

  function enterEditMode() {
    grades.value = JSON.parse(JSON.stringify(serverGrades.value));
    isEditing.value = true;
  }

  function cancelEdit() {
    grades.value = JSON.parse(JSON.stringify(serverGrades.value));
    isEditing.value = false;
  }

  function addGrade() {
    grades.value.push({
      identificadorExterno: crypto.randomUUID(),
      nome: '',
      intervalos: [],
    });
  }

  function removeGrade(index: number) {
    grades.value.splice(index, 1);
  }

  function addInterval(gradeIndex: number, periodo?: string) {
    const grade = grades.value[gradeIndex];
    if (!grade) return;

    // Determinar horário padrão e posição de inserção baseado no turno
    const defaults: Record<string, string> = {
      Matutino: '07:00',
      Vespertino: '13:00',
      Noturno: '19:00',
    };

    const defaultTime = periodo ? (defaults[periodo] ?? '') : '';

    // Encontrar o último intervalo desse turno para inserir logo após
    if (periodo && defaultTime) {
      const limites: Record<string, number> = {
        Matutino: 12,
        Vespertino: 18,
        Noturno: 24,
      };
      const limite = limites[periodo] ?? 24;
      const limiteInferior = periodo === 'Matutino' ? 0 : periodo === 'Vespertino' ? 12 : 18;

      let insertIndex = grade.intervalos.length;
      for (let i = grade.intervalos.length - 1; i >= 0; i--) {
        const h = parseInt(grade.intervalos[i]!.inicio.split(':')[0] ?? '0', 10);
        if (h >= limiteInferior && h < limite) {
          insertIndex = i + 1;
          break;
        }
      }

      // Usar o fim do último intervalo do turno como início do novo
      let inicio = defaultTime;
      if (insertIndex > 0) {
        const prev = grade.intervalos[insertIndex - 1];
        const prevHour = parseInt(prev!.fim.split(':')[0] ?? '0', 10);
        if (prevHour >= limiteInferior && prevHour < limite) {
          inicio = prev!.fim;
        }
      }

      grade.intervalos.splice(insertIndex, 0, { inicio, fim: '' });
    } else {
      grade.intervalos.push({ inicio: '', fim: '' });
    }
  }

  function removeInterval(gradeIndex: number, intervalIndex: number) {
    grades.value[gradeIndex]?.intervalos.splice(intervalIndex, 1);
  }

  function validate(): string[] {
    const errors: string[] = [];

    for (let i = 0; i < grades.value.length; i++) {
      const grade = grades.value[i]!;
      if (!grade.nome.trim()) {
        errors.push(`Grade ${i + 1}: nome é obrigatório`);
      }
      if (grade.intervalos.length === 0) {
        errors.push(`Grade "${grade.nome || i + 1}": deve ter pelo menos um intervalo`);
      }
      const result = validarIntervalos(grade.intervalos);
      if (!result.valid) {
        for (const err of result.errors) {
          errors.push(`Grade "${grade.nome || i + 1}": ${err}`);
        }
      }
    }

    return errors;
  }

  async function save() {
    const id = unref(campusId);
    if (!id) return;

    const errors = validate();
    if (errors.length > 0) {
      throw new Error(errors.join('\n'));
    }

    isSaving.value = true;
    try {
      const payload: GradeHorariaItemInput[] = grades.value.map((g) => ({
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
    grades,
    serverGrades,
    isEditing,
    isSaving,
    isDirty,
    isLoading: campusQuery.isLoading,
    enterEditMode,
    cancelEdit,
    addGrade,
    removeGrade,
    addInterval,
    removeInterval,
    validate,
    save,
  };
}
