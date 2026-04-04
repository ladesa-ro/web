<script setup lang="ts">
import { createAndProvideContextDiariosFormGeral } from './Contexto';

const props = defineProps<{
  editId?: string | null;
}>();

const emit = defineEmits<{
  close: [];
}>();

const contexto = createAndProvideContextDiariosFormGeral(
  computed(() => props.editId ?? null)
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

function avancarParaDisciplinas() {
  modals.open('configurar-disciplinas');
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
