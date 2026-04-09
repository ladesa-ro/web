import type { IContextDiariosFormGeral, IPreferenciaAgrupamento } from '../Contexto';

export function useDisciplinasConfigEdit(
  editId: string | null | undefined,
  contexto: IContextDiariosFormGeral,
) {
  const isEditMode = !!editId;
  if (!isEditMode) return;

  const diarios = useDiarios();

  const editDiarioQuery = diarios.findOne(computed(() => editId ?? null));

  const editProfsQuery = diarios.listProfessores(editId!);

  const editPrefsQuery = diarios.listPreferenciasAgrupamento(editId!);

  watch(
    [
      () => editDiarioQuery.data.value,
      () => editProfsQuery?.data.value,
      () => editPrefsQuery?.data.value,
    ],
    ([diario, profsData, prefsData]) => {
      if (!diario) return;
      if (contexto.disciplinasConfig.value.length > 0) return;

      contexto.turmaSelecionada.value = diario.turma as Record<string, unknown>;
      contexto.turmaId.value = diario.turma.id;
      contexto.calendarioLetivoId.value = diario.calendarioLetivo.id;

      const curso = diario.turma?.curso as Record<string, unknown> | undefined;
      contexto.cursoId.value = (curso?.id as string) ?? null;

      const professorIds = (profsData?.data ?? []).map(
        (p: Record<string, unknown>) =>
          ((p.perfil as Record<string, unknown>)?.id as string) ?? '',
      ).filter(Boolean);

      const existingPrefs = (prefsData?.data ?? []) as Record<string, unknown>[];
      const preferenciasAgrupamento: IPreferenciaAgrupamento[] =
        existingPrefs.length > 0
          ? existingPrefs.map((p) => ({
              modo: (p.modo as string as IPreferenciaAgrupamento['modo']) ?? 'DEFINIDO',
              ordem: (p.ordem as number) ?? 1,
              diaSemanaIso: (p.diaSemanaIso as number | null) ?? null,
              aulasSeguidas: (p.aulasSeguidas as number) ?? 1,
              dataInicio: (p.dataInicio as string) ?? '',
              dataFim: (p.dataFim as string | null) ?? null,
            }))
          : [
              {
                modo: 'DEFINIDO' as const,
                ordem: 1,
                diaSemanaIso: null,
                aulasSeguidas: 1,
                dataInicio: '',
                dataFim: null,
              },
            ];

      const modoAgrupamento = preferenciasAgrupamento[0]?.modo ?? 'DEFINIDO';

      contexto.disciplinasConfig.value = [
        {
          disciplinaId: diario.disciplina.id,
          disciplina: {
            id: '',
            disciplinaId: diario.disciplina.id,
            disciplinaNome: diario.disciplina.nome,
            cargaHoraria: null,
            numeroPeriodo: 0,
          },
          accordionOpen: true,
          activeTab: 'dias',
          modoAgrupamento,
          preferenciasAgrupamento,
          professoresSelecionados: professorIds,
        },
      ];

      contexto.isLoadingEdit.value = false;
    },
    { immediate: true },
  );
}
