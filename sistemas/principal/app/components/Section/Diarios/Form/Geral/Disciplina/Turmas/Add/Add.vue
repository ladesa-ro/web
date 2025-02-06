<script lang="ts" setup>
const $emit = defineEmits(['close', 'next', 'back']);

const searchBarText = ref('');
const currentPage = ref(1);

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};

const nextPage = () => {
  if (currentPage.value < 2) currentPage.value++;
};

const options = computed(() => ({
  search: unref(searchBarText),
}));

const { crudModule } = useLadesaApiCrudTurmas();

const { previousItems: turmas } = await useApiBaseResourceList(
  crudModule.baseQueryKeys,
  crudModule.list,
  options
);

const selectedTurma = ref<string | null>(null);

const backForm = () => {
  $emit('back');
};

const checkedQuimica = ref<string[]>([]);

const onClose = () => {
  $emit('close');
};
</script>

<template>
  <form>
    <DialogModalBaseLayout
      :on-close="onClose"
      title="Vincule o diário a uma turma"
    >
      <VVAutocompleteAPIModalidade name="modalidade.id" label="Modalidade" />

      <v-container>
        <v-row v-if="turmas && turmas.length">
          <v-col
            v-for="turma in turmas"
            :key="turma.id"
            cols="4"
            class="text-center space-y-0"
          >
            <h4 class="mb-2 text-base font-medium text-center">
              {{ turma.curso.nome }}
            </h4>
            <v-checkbox
              v-model="checkedQuimica"
              hide-details
              density="compact"
              color="success"
              :label="turma.periodo"
              :value="turma.periodo"
            />
          </v-col>
        </v-row>
      </v-container>

      <template #button-group>
        <UIButtonModalBackButton @click="backForm" />
        <UIButtonModalAddClassButton />
      </template>
    </DialogModalBaseLayout>
  </form>
</template>
