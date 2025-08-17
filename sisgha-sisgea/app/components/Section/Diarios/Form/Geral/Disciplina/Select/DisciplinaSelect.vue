<script lang="ts" setup>
import { computed, ref, unref } from 'vue';
import { useContextDiariosFormGeral } from '../../Contexto';

const $emit = defineEmits(['close', 'next']);

const { disciplinaSelecionada } = useContextDiariosFormGeral();

const searchBarText = ref('');

const options = computed(() => ({
  search: unref(searchBarText),
}));

const {
  composables: { useListQuery },
} = useLadesaApiCrudDisciplinas();

const {
  data: { items: disciplinas },
  methods: { suspend },
  queryStatus: { isLoading },
} = useListQuery(options);

await suspend();

const radioItems = computed(
  () =>
    disciplinas.value?.map(disciplina => ({
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
      <UISearchBar class="mt-1.5" v-model="searchBarText" />

      <UIRadio
        v-if="radioItems.length"
        v-model="disciplinaSelecionada"
        :items="radioItems"
        v-slot="{ item, selected }"
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

          <UIRadioCircle
            :itemValue="item.value"
            :isSelected="selected"
          />
        </div>
      </UIRadio>
      <span v-else-if="isLoading">Carregando...</span>
      <span v-else>Não foi possível carregar as disciplinas.</span>

      <template #button-group>
        <UIButtonModalCancel @click="closeForm" />
        <UIButtonModalAdvance
          @click="nextForm"
        />
      </template>
    </DialogModalBaseLayout>
  </form>
</template>
