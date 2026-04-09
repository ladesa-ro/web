import type { FormValidationResult } from 'vee-validate';
import type {
  IContextDiariosFormGeral,
  IPreferenciaAgrupamento,
} from '../Contexto';

export function useDisciplinasConfigSubmit(
  editId: Ref<string | null | undefined>,
  contexto: IContextDiariosFormGeral,
  emit: { close: () => void },
  formValidate:
    | (() => Promise<FormValidationResult<Record<string, unknown>>>)
    | undefined
) {
  const diarios = useDiarios();
  const { showToast } = useToast();
  const confirmDelete = useConfirmDelete();

  const isEditMode = computed(() => !!editId.value);
  const isBusy = ref(false);
  const imagemFile = ref<File | Blob | null>(null);

  const canSubmit = computed(() => {
    if (!contexto.turmaId.value) return false;
    if (!contexto.calendarioLetivoId.value) return false;
    if (contexto.disciplinasConfig.value.length === 0) return false;
    return true;
  });

  function getDataInicioFallback(): string {
    return new Date().toISOString().split('T')[0] ?? '';
  }

  function mapPreferencias(prefs: IPreferenciaAgrupamento[]) {
    return prefs.map(p => ({
      modo: p.modo,
      ordem: p.ordem,
      diaSemanaIso: p.diaSemanaIso,
      aulasSeguidas: p.aulasSeguidas,
      dataInicio: p.dataInicio || getDataInicioFallback(),
      dataFim: p.dataFim,
    }));
  }

  async function submitCreate() {
    const diariosComDias = contexto.disciplinasConfig.value.filter(
      dc => dc.preferenciasAgrupamento.length > 0
    );

    if (diariosComDias.length === 0) {
      showToast(
        'cadastro',
        'error',
        'Nenhuma disciplina possui dias de aula configurados.'
      );
      return;
    }

    const payload = {
      turma: { id: contexto.turmaId.value! },
      calendarioLetivo: { id: contexto.calendarioLetivoId.value! },
      diarios: diariosComDias.map(dc => ({
        disciplina: { id: dc.disciplinaId },
        ativo: true,
        professores: dc.professoresSelecionados.map(perfilId => ({
          perfilId,
          situacao: true,
        })),
        preferenciasAgrupamento: mapPreferencias(dc.preferenciasAgrupamento),
      })),
    };

    await diarios.batchCreate(payload);
    showToast('cadastro', 'success');
  }

  async function submitEdit(id: string) {
    const dc = contexto.disciplinasConfig.value[0];
    if (!dc) return;

    await diarios.bulkReplaceProfessores(id, {
      professores: dc.professoresSelecionados.map(perfilId => ({
        perfilId,
        situacao: true,
      })),
    });

    await diarios.bulkReplacePreferenciasAgrupamento(id, {
      preferenciasAgrupamento: mapPreferencias(dc.preferenciasAgrupamento),
    });

    if (imagemFile.value) {
      await diarios.uploadCover(id, imagemFile.value);
    }

    showToast('atualizacao', 'success');
  }

  async function onSubmit() {
    if (isBusy.value) return;

    if (formValidate) {
      const { valid, errors } = await formValidate();
      if (!valid) {
        const firstError = Object.values(errors)[0];
        if (firstError) {
          showToast(
            isEditMode.value ? 'atualizacao' : 'cadastro',
            'error',
            firstError
          );
        }
        return;
      }
    }

    isBusy.value = true;

    try {
      if (isEditMode.value && editId.value) {
        await submitEdit(editId.value);
      } else {
        await submitCreate();
      }

      await diarios.invalidate();
      emit.close();
    } catch {
      showToast(isEditMode.value ? 'atualizacao' : 'cadastro', 'error');
    } finally {
      isBusy.value = false;
    }
  }

  async function onDelete() {
    if (!editId.value) return;
    const confirmed = await confirmDelete.confirm();
    if (!confirmed) return;

    try {
      await diarios.remove(editId.value);
      await diarios.invalidate();
      showToast('delete', 'success');
      emit.close();
    } catch {
      showToast('delete', 'error');
    }
  }

  return {
    onSubmit,
    onDelete,
    canSubmit,
    isBusy,
    imagemFile,
    confirmDelete,
  };
}
