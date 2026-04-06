<script setup lang="ts">
import { useForm } from 'vee-validate';
import { createAndProvideContextDiariosFormGeral } from './Contexto';
import { diariosFormSchema } from './-Helpers/schema';

const props = defineProps<{
  editId?: string | null;
}>();

const emit = defineEmits<{
  close: [];
}>();

const contexto = createAndProvideContextDiariosFormGeral(
  computed(() => props.editId ?? null)
);

const { validate, setValues, values } = useForm({
  validationSchema: diariosFormSchema,
  initialValues: diariosFormSchema.getDefault(),
  keepValuesOnUnmount: true,
});

// Provide form utilities to children
provide('diarios-form-validate', validate);
provide('diarios-form-values', values);

// Sync context → form state (context is source of truth for data flow)
watch(
  [
    () => contexto.calendarioLetivoId.value,
    () => contexto.ofertaFormacaoId.value,
    () => contexto.cursoId.value,
    () => contexto.turmaId.value,
  ],
  ([calendarioId, ofertaId, cursoId, turmaId]) => {
    setValues({
      calendarioLetivoId: calendarioId ?? '',
      ofertaFormacaoId: ofertaId ?? undefined,
      cursoId: cursoId ?? undefined,
      turmaId: turmaId ?? '',
    } as Record<string, unknown>, false);
  },
  { immediate: true },
);

// Sync disciplinasConfig: context → form (extract form-only fields)
watch(
  () => contexto.disciplinasConfig.value,
  (configs) => {
    const formConfigs = configs.map((dc) => ({
      disciplinaId: dc.disciplinaId,
      modoAgrupamento: dc.modoAgrupamento,
      preferenciasAgrupamento: dc.preferenciasAgrupamento.map((p) => ({
        modo: p.modo,
        ordem: p.ordem,
        diaSemanaIso: p.diaSemanaIso,
        aulasSeguidas: p.aulasSeguidas,
        dataInicio: p.dataInicio,
        dataFim: p.dataFim,
      })),
      professoresSelecionados: [...dc.professoresSelecionados],
    }));
    setValues({ disciplinasConfig: formConfigs } as Record<string, unknown>, false);
  },
  { deep: true },
);

const isEditMode = computed(() => !!props.editId);

const modals = useModalManager<'selecionar-turma' | 'configurar-disciplinas'>(
  {
    initial: isEditMode.value ? 'configurar-disciplinas' : 'selecionar-turma',
    history: true,
  }
);

function fecharTudo() {
  modals.closeAll();
  emit('close');
}

// Quando todos os modais fecham (ex: via backdrop), propagar close para o pai
watch(modals.hasActiveModal, (hasActive) => {
  if (!hasActive) {
    emit('close');
  }
});

async function avancarParaDisciplinas() {
  // Validate step 1 fields before advancing
  const { valid } = await validate({ mode: 'validated-only' });
  if (valid || (contexto.turmaId.value && contexto.calendarioLetivoId.value)) {
    modals.open('configurar-disciplinas');
  }
}
</script>

<template>
  <DialogManagedDialog
    :manager="modals"
    name="selecionar-turma"
    backdrop-action="close-all"
    @close="fecharTudo"
  >
    <SectionDiariosFormGeralTurmaSelect
      @next="avancarParaDisciplinas"
      @close="fecharTudo"
    />
  </DialogManagedDialog>

  <DialogManagedDialog
    :manager="modals"
    name="configurar-disciplinas"
    backdrop-action="close-all"
    @close="fecharTudo"
  >
    <SectionDiariosFormGeralDisciplinasConfig
      :edit-id="editId"
      @close="fecharTudo"
      @back="modals.close()"
    />
  </DialogManagedDialog>
</template>
