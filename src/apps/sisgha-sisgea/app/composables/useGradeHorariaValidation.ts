import * as yup from 'yup';
import type { GradeHorariaEditorGrade } from '~/composables/useGradeHorariaState';

export interface GradeValidationErrors {
  nome?: string;
  intervalos: Record<number, string>;
  overlap?: string;
}

export function useGradeHorariaValidation(grades: Ref<GradeHorariaEditorGrade[]>) {
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

  return {
    validationErrors,
    validate,
  };
}
