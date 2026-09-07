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
  <VVTextField name="nome" label="Nome" :disabled="disabled" :required="true" />

  <div class="u-flex u-flex-col u-gap-1-5">
    <span class="u-font-semibold u-px-1 evento-form-fields__cor-label">Cor</span>
    <VVColorPalette name="cor" :disabled="disabled" />
  </div>

  <VVRRuleEditor name="repeticao" :disabled="disabled" />

  <VVCheckboxField
    name="diaInteiro"
    label="Dura todo o dia"
    :disabled="disabled"
  />

  <div class="u-flex u-gap-4">
    <div class="u-flex-1">
      <VVDateField
        name="dataInicio"
        label="Data inicial"
        :required="true"
        :disabled="disabled"
      />
    </div>
    <div class="u-flex-1">
      <VVDateField name="dataFim" label="Data final" :disabled="disabled" />
    </div>
  </div>

  <div v-if="!diaInteiro" class="u-flex u-gap-4">
    <div class="u-flex-1">
      <VVTimeField
        name="horarioInicio"
        label="Horário inicial"
        :disabled="disabled"
      />
    </div>
    <div class="u-flex-1">
      <VVTimeField
        name="horarioFim"
        label="Horário final"
        :disabled="disabled"
      />
    </div>
  </div>

  <VVAutocompleteAPICalendarioColecao
    name="colecao.id"
    label="Coleção"
    :disabled="disabled"
  />

  <VVAutocompleteAPICampus
    name="campus.id"
    label="Campus"
    :disabled="disabled"
  />

  <VVTextField
    name="motivo"
    label="Motivo"
    placeholder="Por que esta mudança?"
    :disabled="disabled"
  />

  <template v-if="showParticipants">
    <div
      v-if="origemProfessor"
      class="u-flex u-items-start u-gap-2-5 u-p-3 u-rounded-lg evento-form-fields__info"
    >
      <IconsInfo class="u-shrink-0 evento-form-fields__info-icon" />
      <span class="u-text-sm evento-form-fields__info-text">
        Este evento foi criado na edição de agenda do professor e, portanto, não
        é possível vinculá-lo a mais nenhum professor ou turma.
      </span>
    </div>

    <VVParticipantesSelector
      name="participantes"
      :disabled="disabled || origemProfessor"
    />
  </template>
</template>

<style scoped>
.evento-form-fields__cor-label {
  font-size: 0.813rem;
  color: var(--ladesa-grey-color);
}

.evento-form-fields__info {
  background-color: rgb(from var(--ladesa-blue-color) R G B / 10%);
  border: 1px solid rgb(from var(--ladesa-blue-color) R G B / 30%);
}

.evento-form-fields__info-icon {
  color: var(--ladesa-blue-color);
  margin-top: 0.125rem;
  width: 18px;
  height: 18px;
}

.evento-form-fields__info-text {
  color: var(--ladesa-blue-color);
}
</style>
