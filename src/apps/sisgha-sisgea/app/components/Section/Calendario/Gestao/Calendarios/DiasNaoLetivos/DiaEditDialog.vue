<script setup lang="ts">
import type { CalendarioLetivoDiaFindOneOutputDto } from '@ladesa-ro/web.api.client';
import { calendarioLetivoDiaUpdate } from '@ladesa-ro/web.api.client';
import { useForm } from 'vee-validate';
import { diaEditSchema } from './-Helpers/schema';
import { formatDate } from './-Helpers/format';

type EditableDia = Pick<CalendarioLetivoDiaFindOneOutputDto, 'id' | 'data'>;

const props = defineProps<{
  modelValue: boolean;
  calendarioId: string | null;
  dia: EditableDia | null;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
  saved: [];
}>();

const api = useApiClient();

const { handleSubmit: handleEditSubmit, resetForm: resetEditForm } = useForm({
  validationSchema: diaEditSchema,
  initialValues: diaEditSchema.getDefault(),
});

watch(
  () => props.dia,
  newDia => {
    if (!newDia) return;
    if (newDia.id) {
      // Edit mode — values are set by the parent before opening
      // The parent should call expose.resetForEdit() or set dia prop
    } else {
      // Create mode
      resetEditForm({ values: diaEditSchema.getDefault() });
    }
  }
);

const saveEdit = handleEditSubmit(async formValues => {
  if (!props.dia || !props.calendarioId) return;
  try {
    await api.call(calendarioLetivoDiaUpdate, {
      path: {
        calendarioLetivoId: props.calendarioId,
        data: props.dia.data,
      },
      body: {
        diaLetivo: formValues.diaLetivo,
        feriado: formValues.feriado ?? '',
        diaPresencial: formValues.diaPresencial,
        extraCurricular: formValues.extraCurricular,
      },
    });
    emit('update:modelValue', false);
    emit('saved');
  } catch (e) {
    console.error('Erro ao salvar dia:', e);
  }
});

function close() {
  emit('update:modelValue', false);
}

function resetForEdit(dia: CalendarioLetivoDiaFindOneOutputDto) {
  // TODO: remove Record cast after SDK regeneration includes 'cor' field
  resetEditForm({
    values: {
      feriado: dia.feriado ?? '',
      cor: ((dia as Record<string, unknown>).cor as string) ?? null,
      diaLetivo: dia.diaLetivo,
      diaPresencial: dia.diaPresencial,
      extraCurricular: dia.extraCurricular,
    } as Record<string, unknown>,
  });
}

function resetForCreate() {
  resetEditForm({ values: diaEditSchema.getDefault() });
}

defineExpose({ resetForEdit, resetForCreate });
</script>

<template>
  <DialogSkeleton
    :model-value="modelValue"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <DialogModalBaseLayout
      v-if="dia"
      title="Editar dia"
      :close-button="true"
      :on-close="close"
    >
      <form class="u-flex u-flex-col u-gap-4" @submit.prevent="saveEdit">
        <VVTextField name="feriado" label="Nome" placeholder="Nome do dia" />

        <div class="u-flex u-flex-col u-gap-1-5">
          <span class="dia-edit-dialog__label u-font-semibold u-px-1">Cor</span>
          <VVColorPalette name="cor" />
        </div>

        <div class="dia-edit-dialog__data-info u-text-sm">
          Data: <strong>{{ formatDate(dia.data) }}</strong>
        </div>

        <VVCheckboxField name="diaLetivo" label="É dia letivo" />
        <VVCheckboxField name="diaPresencial" label="É presencial" />
        <VVCheckboxField name="extraCurricular" label="É extracurricular" />
      </form>

      <template #button-group>
        <UIButtonModalCancel @click="close" />
        <UIButtonModalBaseLayout
          text="Salvar"
          color="var(--ladesa-green-2-color)"
          type="button"
          @click="saveEdit"
        >
          <IconsConfirm />
        </UIButtonModalBaseLayout>
      </template>
    </DialogModalBaseLayout>
  </DialogSkeleton>
</template>

<style scoped>
.dia-edit-dialog__label,
.dia-edit-dialog__data-info {
  color: var(--ladesa-grey-color);
}

.dia-edit-dialog__label {
  font-size: 0.813rem;
}
</style>
