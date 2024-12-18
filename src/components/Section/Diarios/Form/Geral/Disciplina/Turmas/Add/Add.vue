<script lang="ts" setup>
import { computed, ref, unref, watch } from 'vue';
import {
  turmasBaseQueryKey,
  useApiBaseResourceList,
  useTurmasRetriever,
} from '~/integrations';

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

const turmasRetriever = useTurmasRetriever();

const { previousItems: turmas } = await useApiBaseResourceList(
  turmasBaseQueryKey,
  turmasRetriever,
  options
);

const selectedTurma = ref<string | null>(null);

const backForm = () => {
  $emit('back');
};

const checkedQuimica = ref<string[]>([]);
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
    </div>

    <v-divider />

    <div class="button-group">
      <UIButtonModalBackButton @click="backForm" />
      <UIButtonModalAddClassButton />
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
