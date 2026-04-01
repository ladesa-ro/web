<script lang="ts" setup>
import { useContextDiariosFormGeral } from '../../Contexto';

const $emit = defineEmits(['close', 'next']);

const { disciplinaSelecionada } = useContextDiariosFormGeral();

const searchBarText = ref('');

const options = computed(() => ({
  search: unref(searchBarText),
}));

const disciplinas = useDisciplinas();

const listQuery = disciplinas.list(options);
const isLoading = listQuery.isLoading;

await listQuery.suspense();

const radioItems = computed(
  () =>
    listQuery.data.value?.data?.map(disciplina => ({
      value: disciplina,
      label: disciplina.nome,
    })) || []
);

function closeForm() {
  $emit('close');
}

function nextForm() {
  if (disciplinaSelecionada.value) {
    disciplinaSelecionada.value = disciplinaSelecionada.value;
    $emit('next');
  }
}
</script>

<template>
  <form class="min-w-1/3 xl:min-w-[28.125rem]">
    <DialogModalBaseLayout
      :on-close="closeForm"
      title="Selecione uma Disciplina"
    >
      <UISearchBar v-model="searchBarText" class="mt-1.5" />

      <UIRadio
        v-if="radioItems.length"
        v-slot="{ item, selected }"
        v-model="disciplinaSelecionada"
        :items="radioItems"
      >
        <div
          class="flex p-5 justify-between items-center border-2 border-ldsa-grey rounded-lg mb-2"
        >
          <div class="flex flex-col justify-start">
            <span class="font-semibold text-left">
              {{ item.label }}
            </span>

            <span class="text-ldsa-grey text-sm text-left">
              Carga horária: {{ item.value.cargaHoraria }}H
            </span>
          </div>

          <UIRadioCircle :item-value="item.value" :is-selected="selected" />
        </div>
      </UIRadio>
      <span v-else-if="isLoading">Carregando...</span>
      <span v-else>Não foi possível carregar as disciplinas.</span>

      <template #button-group>
        <UIButtonModalCancel @click="closeForm" />
        <UIButtonModalAdvance
          :disabled="!disciplinaSelecionada"
          @click="nextForm"
        />
      </template>
    </DialogModalBaseLayout>
  </form>
</template>
