import type { GradeHorariaItemOutputDto } from '@ladesa-ro/web.api.client';
import type { Periodo } from '~/utils/horarios';

export interface GradeHorariaEditorGrade {
  identificadorExterno: string;
  nome: string;
  intervalos: Array<{ inicio: string; fim: string }>;
}

export interface BulkAddParams {
  startTime: string;
  classCount: number;
  classDuration: number;
  breakDuration: number;
  breakAfterClass: number;
  periodo: Periodo;
  mode: 'append' | 'replace';
}

export function useGradeHorariaState(campusId: MaybeRef<string | null>) {
  const gradesHorarias = useGradesHorarias();
  const campusQuery = gradesHorarias.findByCampus(campusId);

  const isEditing = ref(false);

  const grades = ref<GradeHorariaEditorGrade[]>([]);
  const serverGrades = ref<GradeHorariaEditorGrade[]>([]);

  const isDirty = computed(() => {
    return JSON.stringify(grades.value) !== JSON.stringify(serverGrades.value);
  });

  // Sync server data
  watch(
    () => campusQuery.data.value,
    data => {
      const items: GradeHorariaEditorGrade[] = (data?.data ?? []).map(
        (g: GradeHorariaItemOutputDto) => ({
          identificadorExterno: g.identificadorExterno,
          nome: g.nome,
          intervalos: g.intervalos.map(
            (i: { inicio: string; fim: string }) => ({
              inicio: i.inicio,
              fim: i.fim,
            })
          ),
        })
      );
      serverGrades.value = JSON.parse(JSON.stringify(items));
      if (!isEditing.value) {
        grades.value = JSON.parse(JSON.stringify(items));
      }
    },
    { immediate: true }
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

    // Determinar horario padrao e posicao de insercao baseado no turno
    const defaults: Record<string, string> = {
      Matutino: '07:00',
      Vespertino: '13:00',
      Noturno: '19:00',
    };

    const defaultTime = periodo ? (defaults[periodo] ?? '') : '';

    // Encontrar o ultimo intervalo desse turno para inserir logo apos
    if (periodo && defaultTime) {
      const limites: Record<string, number> = {
        Matutino: 12,
        Vespertino: 18,
        Noturno: 24,
      };
      const limite = limites[periodo] ?? 24;
      const limiteInferior =
        periodo === 'Matutino' ? 0 : periodo === 'Vespertino' ? 12 : 18;

      let insertIndex = grade.intervalos.length;
      for (let i = grade.intervalos.length - 1; i >= 0; i--) {
        const h = parseInt(
          grade.intervalos[i]!.inicio.split(':')[0] ?? '0',
          10
        );
        if (h >= limiteInferior && h < limite) {
          insertIndex = i + 1;
          break;
        }
      }

      // Usar o fim do ultimo intervalo do turno como inicio do novo
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

    grade.intervalos = grade.intervalos.filter(iv => {
      const h = parseInt(iv.inicio.split(':')[0] ?? '0', 10);
      return h < min || h >= max;
    });
  }

  function clearAllIntervals(gradeIndex: number) {
    const grade = grades.value[gradeIndex];
    if (!grade) return;
    grade.intervalos = [];
  }

  function addMinutes(time: string, minutes: number): string {
    const [h, m] = time.split(':').map(Number) as [number, number];
    const total = h * 60 + m + minutes;
    const hh = String(Math.floor(total / 60) % 24).padStart(2, '0');
    const mm = String(total % 60).padStart(2, '0');
    return `${hh}:${mm}`;
  }

  function generateBulkIntervals(
    params: BulkAddParams
  ): Array<{ inicio: string; fim: string }> {
    const intervals: Array<{ inicio: string; fim: string }> = [];
    let cursor = params.startTime;

    for (let i = 1; i <= params.classCount; i++) {
      const fim = addMinutes(cursor, params.classDuration);
      intervals.push({ inicio: cursor, fim });
      cursor = fim;
      if (
        params.breakAfterClass > 0 &&
        i === params.breakAfterClass &&
        i < params.classCount
      ) {
        cursor = addMinutes(cursor, params.breakDuration);
      }
    }

    return intervals;
  }

  function addIntervalsBulk(gradeIndex: number, params: BulkAddParams) {
    const grade = grades.value[gradeIndex];
    if (!grade) return;

    if (params.mode === 'replace') {
      removeIntervalsByPeriodo(gradeIndex, params.periodo);
    }

    const newIntervals = generateBulkIntervals(params);
    grade.intervalos.push(...newIntervals);
    grade.intervalos.sort((a, b) => a.inicio.localeCompare(b.inicio));
  }

  return {
    gradesHorarias,
    campusQuery,
    grades,
    serverGrades,
    isEditing,
    isDirty,
    enterEditMode,
    cancelEdit,
    addGrade,
    removeGrade,
    addInterval,
    removeInterval,
    removeIntervalsByPeriodo,
    clearAllIntervals,
    generateBulkIntervals,
    addIntervalsBulk,
  };
}
