<script lang="ts" setup>
import { ref, computed, unref, watch } from 'vue';
import {
  turmasBaseQueryKey,
  useApiBaseResourceList,
  useTurmasRetriever,
} from '~/integrations';

const $emit = defineEmits(['close', 'next', 'back']);

const searchBarText = ref('');

const checkedQuimica = ref<string[]>([]);
const checkedInformatica = ref<string[]>([]);
const checkedFloresta = ref<string[]>([]);

const currentPage = ref(1);

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const nextPage = () => {
  if (currentPage.value < 2) {
    currentPage.value++;
  }
};

const backForm = () => {
  $emit('back');
};

const options = computed(() => ({
  search: unref(searchBarText),
}));

const turmasRetriever = useTurmasRetriever();

const { previousItems: turmas } = await useApiBaseResourceList(
  turmasBaseQueryKey,
  turmasRetriever,
  options
);

const selectedTurma = ref<string | null>(null);

const closeForm = () => {
  $emit('close');
};

const allQuimicaOptions = ['Todos', '1ºA', '1ºB', '2ºA', '2ºB', '3ºA', '3ºB'];
const allInformaticaOptions = ['Todos', '1ºA', '1ºB', '2ºA', '2ºB', '3ºA', '3ºB'];
const allFlorestaOptions = ['Todos', '1ºA', '1ºB', '2ºA', '2ºB', '3ºA', '3ºB'];

watch(checkedQuimica, (newVal, oldVal) => {
  if (newVal.includes('Todos') && !oldVal.includes('Todos')) {
    checkedQuimica.value = allQuimicaOptions;
  } else if (!newVal.includes('Todos') && oldVal.includes('Todos')) {
    checkedQuimica.value = [];
  } else if (newVal.length === allQuimicaOptions.length - 1 && !newVal.includes('Todos')) {
    checkedQuimica.value = allQuimicaOptions;
  } else if (newVal.includes('Todos') && newVal.length < oldVal.length) {
    checkedQuimica.value = newVal.filter(option => option !== 'Todos');
  }
});

watch(checkedInformatica, (newVal, oldVal) => {
  if (newVal.includes('Todos') && !oldVal.includes('Todos')) {
    checkedInformatica.value = allInformaticaOptions;
  } else if (!newVal.includes('Todos') && oldVal.includes('Todos')) {
    checkedInformatica.value = [];
  } else if (newVal.length === allInformaticaOptions.length - 1 && !newVal.includes('Todos')) {
    checkedInformatica.value = allInformaticaOptions;
  } else if (newVal.includes('Todos') && newVal.length < oldVal.length) {
    checkedInformatica.value = newVal.filter(option => option !== 'Todos');
  }
});

watch(checkedFloresta, (newVal, oldVal) => {
  if (newVal.includes('Todos') && !oldVal.includes('Todos')) {
    checkedFloresta.value = allFlorestaOptions;
  } else if (!newVal.includes('Todos') && oldVal.includes('Todos')) {
    checkedFloresta.value = [];
  } else if (newVal.length === allFlorestaOptions.length - 1 && !newVal.includes('Todos')) {
    checkedFloresta.value = allFlorestaOptions;
  } else if (newVal.includes('Todos') && newVal.length < oldVal.length) {
    checkedFloresta.value = newVal.filter(option => option !== 'Todos');
  }
});



</script>

<template>
  <v-form class="form">
    <div class="form-header">
      <h1 class="main-title">
        <span>Vincular Turma</span>
      </h1>
    </div>

    <v-divider class="my-4" />

    <div class="form-body modal-form">
      <VVAutocompleteAPIModalidade
        name="modalidade.id"
        label="Modalidade"
      />

      <v-container>
        <v-row justify="space-between" class="items-center mb-4">
          <v-col cols="2" class="text-left">
            <v-icon @click="prevPage" class="cursor-pointer">mdi-chevron-left</v-icon>
          </v-col>
          <v-col cols="8" class="text-center">
            <h3 class="text-lg font-semibold">Página {{ currentPage }} de 2</h3>
          </v-col>
          <v-col cols="2" class="text-right">
            <v-icon @click="nextPage" class="cursor-pointer">mdi-chevron-right</v-icon>
          </v-col>
        </v-row>

        <template v-if="currentPage === 1">
          <v-row>
            <v-col cols="4" class="text-center">
              <h4 class="mb-2 text-base font-medium">Química</h4>
              <v-checkbox v-model="checkedQuimica" label="Todos" :value="'Todos'"></v-checkbox>
              <v-checkbox v-model="checkedQuimica" label="1ºA" :value="'1ºA'"></v-checkbox>
              <v-checkbox v-model="checkedQuimica" label="1ºB" :value="'1ºB'"></v-checkbox>
              <v-checkbox v-model="checkedQuimica" label="2ºA" :value="'2ºA'"></v-checkbox>
              <v-checkbox v-model="checkedQuimica" label="2ºB" :value="'2ºB'"></v-checkbox>
              <v-checkbox v-model="checkedQuimica" label="3ºA" :value="'3ºA'"></v-checkbox>
              <v-checkbox v-model="checkedQuimica" label="3ºB" :value="'3ºB'"></v-checkbox>
            </v-col>

            <v-col cols="4" class="text-center">
              <h4 class="mb-2 text-base font-medium">Informática</h4>
              <v-checkbox v-model="checkedInformatica" label="Todos" :value="'Todos'"></v-checkbox>
              <v-checkbox v-model="checkedInformatica" label="1ºA" :value="'1ºA'"></v-checkbox>
              <v-checkbox v-model="checkedInformatica" label="1ºB" :value="'1ºB'"></v-checkbox>
              <v-checkbox v-model="checkedInformatica" label="2ºA" :value="'2ºA'"></v-checkbox>
              <v-checkbox v-model="checkedInformatica" label="2ºB" :value="'2ºB'"></v-checkbox>
              <v-checkbox v-model="checkedInformatica" label="3ºA" :value="'3ºA'"></v-checkbox>
              <v-checkbox v-model="checkedInformatica" label="3ºB" :value="'3ºB'"></v-checkbox>
            </v-col>

            <v-col cols="4" class="text-center">
              <h4 class="mb-2 text-base font-medium">Floresta</h4>
              <v-checkbox v-model="checkedFloresta" label="Todos" :value="'Todos'"></v-checkbox>
              <v-checkbox v-model="checkedFloresta" label="1ºA" :value="'1ºA'"></v-checkbox>
              <v-checkbox v-model="checkedFloresta" label="1ºB" :value="'1ºB'"></v-checkbox>
              <v-checkbox v-model="checkedFloresta" label="2ºA" :value="'2ºA'"></v-checkbox>
              <v-checkbox v-model="checkedFloresta" label="2ºB" :value="'2ºB'"></v-checkbox>
              <v-checkbox v-model="checkedFloresta" label="3ºA" :value="'3ºA'"></v-checkbox>
              <v-checkbox v-model="checkedFloresta" label="3ºB" :value="'3ºB'"></v-checkbox>
            </v-col>
          </v-row>
        </template>

        <template v-else>
          <v-row>
            <v-col cols="4" class="text-center">
              <h4 class="mb-2 text-base font-medium">Agronomia</h4>
              <v-checkbox v-model="checkedQuimica" label="1ºA" :value="'1ºA'"></v-checkbox>
              <v-checkbox v-model="checkedQuimica" label="1ºB" :value="'1ºB'"></v-checkbox>
            </v-col>

            <v-col cols="4" class="text-center">
              <h4 class="mb-2 text-base font-medium">Enfermagem</h4>
              <v-checkbox v-model="checkedInformatica" label="1ºA" :value="'1ºA'"></v-checkbox>
              <v-checkbox v-model="checkedInformatica" label="1ºB" :value="'1ºB'"></v-checkbox>
            </v-col>

            <v-col cols="4" class="text-center">
              <h4 class="mb-2 text-base font-medium">Veterinária</h4>
              <v-checkbox v-model="checkedFloresta" label="1ºA" :value="'1ºA'"></v-checkbox>
              <v-checkbox v-model="checkedFloresta" label="1ºB" :value="'1ºB'"></v-checkbox>
            </v-col>
          </v-row>
        </template>
      </v-container>
    </div>

    <v-divider />

    <div class="button-group">
      <UIButtonModalBackButton @click="backForm"/>
      <UIButtonModalCancelButton @click="closeForm" />
      <UIButtonModalAddClassButton/>
    </div>
  </v-form>
</template>

<style scoped>
.form {
  overflow: auto;
}

.modal-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.main-title {
  font-size: 24px;
  font-weight: 700;
}

.form {
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 32px;
}

.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  flex-wrap: nowrap;
  gap: 10px;
}

.button {
  font-weight: 700;
  margin-top: 20px;
  cursor: pointer;
  border: none;
}

.v-btn.buttonCancelar,
.v-btn.buttonCadastro {
  padding: 6px 20px;
  border-radius: 8px;
  height: auto;
  text-transform: none;
}

@media screen and (max-width: 450px) {
  .button-group {
    flex-direction: column;
    gap: 10px;
  }

  .v-btn.buttonCancelar,
  .v-btn.buttonCadastro {
    padding: 6px 20px;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
