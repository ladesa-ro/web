import * as yup from 'yup';
import type { GradeHorariaItemInput } from '~/composables/ladesa-api/useGradesHorarias';
import type { GradeHorariaItemOutputDto } from '@ladesa-ro/web.api.client';

export interface GradeHorariaEditorGrade {
  identificadorExterno: string;
  nome: string;
  intervalos: Array<{ inicio: string; fim: string }>;
}

export interface GradeValidationErrors {
  nome?: string;
  intervalos: Record<number, string>;
  overlap?: string;
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

  function removeIntervalsByPeriodo(gradeIndex: number, periodo: string) {
    const grade = grades.value[gradeIndex];
    if (!grade) return;

    const limites: Record<string, [number, number]> = {
      Matutino: [0, 12],
      Vespertino: [12, 18],
      Noturno: [18, 24],
    };
    const [min, max] = limites[periodo] ?? [0, 24];

    grade.intervalos = grade.intervalos.filter((iv) => {
      const h = parseInt(iv.inicio.split(':')[0] ?? '0', 10);
      return h < min || h >= max;
    });
  }

  function clearAllIntervals(gradeIndex: number) {
    const grade = grades.value[gradeIndex];
    if (!grade) return;
    grade.intervalos = [];
  }

  const validationErrors = ref<Map<number, GradeValidationErrors>>(new Map());

  const intervaloSchema = yup.object().shape({
    inicio: yup.string().required('Início é obrigatório'),
    fim: yup.string().required('Término é obrigatório'),
  }).test(
    'inicio-antes-fim',
    'Início deve ser anterior ao término',
    (value) => !value.inicio || !value.fim || value.inicio < value.fim,
  );

  const gradeSchema = yup.object().shape({
    nome: yup.string().trim().required('Nome é obrigatório'),
    intervalos: yup.array().of(intervaloSchema).min(1, 'Deve ter ao menos 1 horário de aula').defined(),
  });

  function checkOverlaps(intervalos: Array<{ inicio: string; fim: string }>): Map<number, string> {
    const overlaps = new Map<number, string>();
    const indexed = intervalos
      .map((iv, idx) => ({ ...iv, idx }))
      .filter(iv => iv.inicio && iv.fim)
      .sort((a, b) => a.inicio.localeCompare(b.inicio));

    for (let k = 0; k < indexed.length - 1; k++) {
      const current = indexed[k]!;
      const next = indexed[k + 1]!;
      if (current.fim > next.inicio) {
        if (!overlaps.has(current.idx)) {
          overlaps.set(current.idx, 'Sobreposição com próximo horário');
        }
        if (!overlaps.has(next.idx)) {
          overlaps.set(next.idx, 'Sobreposição com horário anterior');
        }
      }
    }
    return overlaps;
  }

  function validate(): string[] {
    const result = new Map<number, GradeValidationErrors>();

    for (let i = 0; i < grades.value.length; i++) {
      const grade = grades.value[i]!;
      const errs: GradeValidationErrors = { intervalos: {} };
      let hasError = false;

      try {
        gradeSchema.validateSync(grade, { abortEarly: false });
      } catch (err) {
        if (err instanceof yup.ValidationError) {
          for (const inner of err.inner) {
            const path = inner.path ?? '';

            if (path === 'nome') {
              errs.nome = inner.message;
              hasError = true;
            } else if (path === 'intervalos') {
              errs.overlap = inner.message;
              hasError = true;
            } else {
              const intervaloMatch = path.match(/^intervalos\[(\d+)]/);
              if (intervaloMatch) {
                const idx = Number(intervaloMatch[1]);
                if (!errs.intervalos[idx]) {
                  errs.intervalos[idx] = inner.message;
                }
                hasError = true;
              }
            }
          }
        }
      }

      const overlaps = checkOverlaps(grade.intervalos);
      if (overlaps.size > 0) {
        errs.overlap = 'Existem horários com sobreposição';
        for (const [idx, msg] of overlaps) {
          if (!errs.intervalos[idx]) {
            errs.intervalos[idx] = msg;
          }
        }
        hasError = true;
      }

      if (hasError) {
        result.set(i, errs);
      }
    }

    validationErrors.value = result;

    const errors: string[] = [];
    for (const [i, errs] of result) {
      const label = grades.value[i]?.nome || `Grade ${i + 1}`;
      if (errs.nome) errors.push(`${label}: ${errs.nome}`);
      for (const msg of Object.values(errs.intervalos)) {
        errors.push(`${label}: ${msg}`);
      }
      if (errs.overlap) errors.push(`${label}: ${errs.overlap}`);
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
    removeIntervalsByPeriodo,
    clearAllIntervals,
    validate,
    validationErrors,
    save,
  };
}
