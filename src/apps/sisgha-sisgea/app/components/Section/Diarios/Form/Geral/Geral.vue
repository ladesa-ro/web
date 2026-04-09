<script setup lang="ts">
import { useForm } from 'vee-validate';
import {
  createAndProvideContextDiariosFormGeral,
  diariosFormValidateKey,
} from './Contexto';
import { diariosFormSchema } from './-Helpers/schema';

const props = defineProps<{
  editId?: string | null;
}>();

const emit = defineEmits<{
  close: [];
}>();

const { validate, setValues, values } = useForm({
  validationSchema: diariosFormSchema,
  initialValues: diariosFormSchema.getDefault(),
  keepValuesOnUnmount: true,
});

// Context is backed by form values — form is the source of truth
const contexto = createAndProvideContextDiariosFormGeral(
  { values, setValues },
  computed(() => props.editId ?? null)
);

// Provide form validate to children
provide(diariosFormValidateKey, validate);

const isEditMode = computed(() => !!props.editId);

const modals = useModalManager<'selecionar-turma' | 'configurar-disciplinas'>({
  initial: isEditMode.value ? 'configurar-disciplinas' : 'selecionar-turma',
  history: true,
});

function fecharTudo() {
  modals.closeAll();
  emit('close');
}

// Quando todos os modais fecham (ex: via backdrop), propagar close para o pai
watch(modals.hasActiveModal, hasActive => {
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
