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

const {
  composables: { useListQuery },
} = useLadesaApiCrudTurmas();

const {
  data: { items: turmas },
  methods: { suspend },
} = useListQuery(options);

await suspend();

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
      <VVAutocompleteAPIModalidade label="Modalidade" name="modalidade.id" />

      <v-container>
        <v-row v-if="turmas && turmas.length">
          <v-col
            v-for="turma in turmas"
            :key="turma.id"
            class="text-center space-y-0"
            cols="4"
          >
            <h4 class="mb-2 text-base font-medium text-center">
              {{ turma.curso.nome }}
            </h4>
            <v-checkbox
              v-model="checkedQuimica"
              :label="turma.periodo"
              :value="turma.periodo"
              color="success"
              density="compact"
              hide-details
            />
          </v-col>
        </v-row>
      </v-container>

      <template #button-group>
        <UIButtonButtonModalBackButton @click="backForm" />
        <UIButtonButtonModalAddClassButton />
      </template>
    </DialogModalBaseLayout>
  </form>
</template>
