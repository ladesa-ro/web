<script lang="ts" setup>
import AlunoSelector from './-Helpers/AlunoSelector.vue';

const props = defineProps<{ turmaId: string; campusId?: string | null }>();
const emit = defineEmits<{ matriculado: [] }>();

const isActive = ref(false);
const selectedPerfilId = ref<string | null>(null);
const isSubmitting = ref(false);

const matriculas = useTurmaMatricula();

const {
  handle: handleWriteError,
  conflictMessage,
  clearConflictMessage,
} = useApiWriteErrorHandler();

function onOpen() {
  clearConflictMessage();
  selectedPerfilId.value = null;
  isActive.value = true;
}

function onClose() {
  isActive.value = false;
}

async function onSubmit() {
  if (!selectedPerfilId.value) return;

  isSubmitting.value = true;
  try {
    await matriculas.create({
      turma: { id: props.turmaId },
      perfil: { id: selectedPerfilId.value },
    });
  } catch (err) {
    const handled = await handleWriteError(err);
    if (!handled) throw err;
    return;
  } finally {
    isSubmitting.value = false;
  }

  emit('matriculado');
  onClose();
}
</script>

<template>
  <DialogSkeleton v-model="isActive">
    <template #activator>
      <UIButtonDefault type="button" @click.stop.prevent="onOpen">
        Matricular aluno
      </UIButtonDefault>
    </template>

    <DialogModalBaseLayout title="Matricular aluno" :on-close="onClose">
      <form class="u-flex u-flex-col u-gap-5" @submit.prevent="onSubmit">
        <p
          v-if="conflictMessage"
          class="conflict-message u-text-sm u-rounded-md u-p-3"
        >
          {{ conflictMessage }}
        </p>

        <AlunoSelector v-model="selectedPerfilId" :campus-id="campusId" />
      </form>

      <template #button-group>
        <UIButtonModalCancel @click="onClose" />
        <UIButtonModalSave
          :disabled="isSubmitting || !selectedPerfilId"
          @click="onSubmit"
        />
      </template>
    </DialogModalBaseLayout>
  </DialogSkeleton>
</template>

<style scoped>
.conflict-message {
  color: #dc2626;
  background-color: #fef2f2;
}

.dark .conflict-message {
  color: #f87171;
  background-color: #450a0a;
}
</style>
