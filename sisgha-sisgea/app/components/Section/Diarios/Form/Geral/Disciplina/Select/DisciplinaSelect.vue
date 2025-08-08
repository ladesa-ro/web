<script lang="ts" setup>
import { useContextDiariosFormGeral } from '../../Contexto';

const $emit = defineEmits(['close', 'next']);

// =====================================================

const { disciplinaId: selectedDisciplina } = useContextDiariosFormGeral();
// mesma coisa que:
// const selectedDisciplina = useContextDiariosFormGeral().disciplinaId;

// =====================================================

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

//

const radioItems = ref(
  disciplinas.value!.map(disciplina => ({
    value: disciplina,
    label: disciplina.nome,
  }))
);

//

const closeForm = () => $emit('close');
const nextForm = () => $emit('next');
</script>

<template>
  <form class="min-w-1/3 xl:min-w-[28.125rem]">
    <DialogModalBaseLayout
      :on-close="closeForm"
      title="Selecione uma Disciplina"
    >
      <UISearchBar class="mt-1.5" v-model="searchBarText" />

      <UIRadio
        v-if="radioItems"
        v-model="selectedDisciplina"
        :items="radioItems"
        v-slot="{ item, isThisItemSelected }"
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
            :isSelected="isThisItemSelected"
          />
        </div>
      </UIRadio>
      <span v-else-if="isLoading">Carregando...</span>
      <span v-else>Não foi possível carregar as disciplinas.</span>

      <template #button-group>
        <UIButtonModalCancel @click="closeForm" />
        <UIButtonModalAdvance
          :disabled="!selectedDisciplina"
          @click="nextForm"
        />
      </template>
    </DialogModalBaseLayout>
  </form>
</template>
