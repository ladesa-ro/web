<script lang="ts" setup>
import { useFieldArray } from 'vee-validate';

const props = defineProps<{
  periodNumber: number;
  name: string;
}>();

const {
  fields: etapas,
  push,
  remove,
} = useFieldArray<{ nome: string; cor: string }>(`${props.name}.etapas`);

const addEtapa = () => push({ nome: '', cor: '#000000' });
const removeEtapa = (index: number) => remove(index);
</script>

<template>
  <div class="u-flex u-items-center u-gap-2-5">
    <h1 class="u-font-medium">Período {{ periodNumber }}</h1>
    <div class="u-flex-1 etapas-formacao__divider" />
  </div>

  <div class="u-flex u-flex-col u-gap-5">
    <div
      v-for="(etapa, index) in etapas"
      :key="etapa.key"
      class="u-flex u-items-center u-gap-2-5"
    >
      <VVTextField type="color" :name="`${name}.etapas[${index}].cor`" />

      <VVTextField
        :name="`${name}.etapas[${index}].nome`"
        placeholder="Digite aqui"
        label="Nome da etapa"
      />

      <button
        v-if="index > 0"
        type="button"
        class="u-shrink-0 u-flex u-justify-center u-rounded-sm etapas-formacao__remove-button"
        aria-label="Remover etapa"
        @click.prevent.stop="removeEtapa(index)"
      >
        <IconsExclude class="etapas-formacao__remove-icon" />
      </button>
    </div>

    <button
      type="button"
      class="u-flex u-justify-center u-items-center u-gap-1-5 u-rounded-lg etapas-formacao__add-button"
      @click="addEtapa()"
    >
      Adicionar etapa
      <IconsAdd class="etapas-formacao__add-icon" />
    </button>
  </div>
</template>

<style scoped>
.etapas-formacao__divider {
  height: 2.5px;
  background-color: var(--ladesa-grey-color);
}

.etapas-formacao__remove-button {
  height: var(--ui-space-12);
  width: var(--ui-space-7);
  color: var(--ladesa-red-color);
}

.etapas-formacao__remove-button:hover {
  background-color: rgb(from var(--ladesa-red-color) R G B / 10%);
}

.etapas-formacao__remove-icon {
  width: var(--ui-space-5);
}

.etapas-formacao__add-button {
  border: 2px dashed var(--ladesa-grey-color);
  padding-block: var(--ui-space-3-5);
}

.etapas-formacao__add-button:hover {
  background-color: rgb(from var(--ladesa-grey-color) R G B / 10%);
}

.etapas-formacao__add-icon {
  width: var(--ui-space-3-5);
}
</style>
