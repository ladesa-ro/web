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
  <div class="flex items-center gap-2.5">
    <h1 class="font-medium">Período {{ periodNumber }}</h1>
    <div class="h-[2.5px] flex-1 bg-ldsa-grey" />
  </div>

  <div class="flex flex-col gap-5">
    <div
      v-for="(etapa, index) in etapas"
      :key="etapa.key"
      class="flex items-center gap-2.5"
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
        class="shrink-0 flex justify-center text-ldsa-red h-12 w-7 hover:bg-ldsa-red/10 rounded-sm"
        aria-label="Remover etapa"
        @click.prevent.stop="removeEtapa(index)"
      >
        <IconsExclude class="w-5" />
      </button>
    </div>

    <button
      type="button"
      class="border-2 border-ldsa-grey border-dashed rounded-lg py-3.5 flex justify-center items-center gap-1.5 hover:bg-ldsa-grey/10"
      @click="addEtapa()"
    >
      Adicionar etapa
      <IconsAdd class="w-3.5" />
    </button>
  </div>
</template>
