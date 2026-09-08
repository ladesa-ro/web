<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import ButtonModalCancel from './ButtonModalCancel.vue';
import ButtonModalConfirm from './ButtonModalConfirm.vue';
import DialogSkeleton from './DialogSkeleton.vue';
import FormRadioGroup from './FormRadioGroup.vue';
import FormTextField from './FormTextField.vue';
import ModalBaseLayout from './ModalBaseLayout.vue';

export type RecurrenceScopeMode = 'edit' | 'delete';

export type RecurrenceScopeConfirmPayload = {
  scope: string;
  motivo?: string;
};

export type RecurrenceScopeModalProps = {
  modelValue: boolean;
  mode: RecurrenceScopeMode;
  restrictToCurrentOccurrence?: boolean;
};

const props = defineProps<RecurrenceScopeModalProps>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'confirm', payload: RecurrenceScopeConfirmPayload): void;
  (e: 'cancel'): void;
}>();

const isOpen = ref(props.modelValue);
const scope = ref('ESTA_OCORRENCIA');
const motivo = ref('');

watch(
  () => props.modelValue,
  val => {
    isOpen.value = val;
    if (val) {
      scope.value = 'ESTA_OCORRENCIA';
      motivo.value = '';
    }
  }
);

watch(isOpen, val => emit('update:modelValue', val));

const editItems = [
  { label: 'Esta ocorrência', value: 'ESTA_OCORRENCIA' },
  { label: 'Esta e as seguintes', value: 'ESTA_E_SEGUINTES' },
  { label: 'Todas as ocorrências', value: 'TODAS' },
];

const deleteItems = [
  { label: 'Esta ocorrência', value: 'ESTA_OCORRENCIA' },
  { label: 'Toda a série', value: 'TODA_SERIE' },
];

const items = computed(() =>
  props.mode === 'delete' ? deleteItems : editItems
);

const title = computed(() =>
  props.mode === 'delete' ? 'Excluir evento recorrente' : 'Salvar alterações'
);

const description = computed(() =>
  props.mode === 'delete'
    ? 'Este evento faz parte de uma série recorrente. O que você deseja excluir?'
    : 'Este evento faz parte de uma série recorrente. O que você deseja alterar?'
);

const showMotivo = computed(
  () => props.mode === 'delete' && scope.value === 'ESTA_OCORRENCIA'
);

function cancel() {
  isOpen.value = false;
  emit('cancel');
}

function confirmChoice() {
  isOpen.value = false;
  emit('confirm', {
    scope: scope.value,
    motivo: motivo.value.trim() || undefined,
  });
}
</script>

<template>
  <DialogSkeleton v-model="isOpen">
    <ModalBaseLayout
      v-if="isOpen"
      :title="title"
      :close-button="true"
      :on-close="cancel"
    >
      <p class="ui-recurrence-scope-modal__description u-text-sm">
        {{ description }}
      </p>

      <FormRadioGroup
        v-if="!restrictToCurrentOccurrence"
        v-model="scope"
        :items="items"
      />

      <FormTextField
        v-if="showMotivo"
        v-model="motivo"
        name="motivoCancelamento"
        label="Motivo (opcional)"
        placeholder="Explique o motivo do cancelamento"
      />

      <template #button-group>
        <ButtonModalCancel
          type="close"
          class="u-flex u-w-full"
          @click="cancel"
        />
        <ButtonModalConfirm
          type="submit"
          class="u-flex u-w-full"
          @click="confirmChoice"
        />
      </template>
    </ModalBaseLayout>
  </DialogSkeleton>
</template>
