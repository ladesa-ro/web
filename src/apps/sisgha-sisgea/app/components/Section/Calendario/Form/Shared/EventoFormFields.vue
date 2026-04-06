<script lang="ts" setup>
import { useFormValues } from 'vee-validate';

defineProps<{
  disabled?: boolean;
  showParticipants?: boolean;
  origemProfessor?: boolean;
}>();

const formValues = useFormValues();
const diaInteiro = computed(() => formValues.value.diaInteiro as boolean);
</script>

<template>
  <VVTextField
    name="nome"
    label="Nome"
    :disabled="disabled"
    :required="true"
  />

  <div class="flex flex-col gap-1.5">
    <span class="text-[0.813rem] font-semibold text-ldsa-grey px-1">Cor</span>
    <VVColorPalette
      name="cor"
      :disabled="disabled"
    />
  </div>

  <VVRRuleEditor
    name="repeticao"
    :disabled="disabled"
  />

  <VVCheckboxField
    name="diaInteiro"
    label="Dura todo o dia"
    :disabled="disabled"
  />

  <div class="flex gap-4">
    <div class="flex-1">
      <VVDateField
        name="dataInicio"
        label="Data inicial"
        :required="true"
        :disabled="disabled"
      />
    </div>
    <div class="flex-1">
      <VVDateField
        name="dataFim"
        label="Data final"
        :disabled="disabled"
      />
    </div>
  </div>

  <div v-if="!diaInteiro" class="flex gap-4">
    <div class="flex-1">
      <VVTimeField
        name="horarioInicio"
        label="Horário inicial"
        :disabled="disabled"
      />
    </div>
    <div class="flex-1">
      <VVTimeField
        name="horarioFim"
        label="Horário final"
        :disabled="disabled"
      />
    </div>
  </div>

  <template v-if="showParticipants">
    <div v-if="origemProfessor" class="flex items-start gap-2.5 p-3 rounded-lg bg-blue-50 border border-blue-200">
      <IconsInfo class="text-blue-600 shrink-0 mt-0.5 w-[18px] h-[18px]" />
      <span class="text-sm text-blue-800">
        Este evento foi criado na edição de agenda do professor e, portanto, não é possível vinculá-lo a mais nenhum professor ou turma.
      </span>
    </div>

    <VVParticipantesSelector
      name="participantes"
      :disabled="disabled || origemProfessor"
    />
  </template>
</template>
