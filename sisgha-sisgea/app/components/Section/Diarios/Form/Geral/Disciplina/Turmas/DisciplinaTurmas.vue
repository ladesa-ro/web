<script lang="ts" setup>
import { useContextDiariosFormGeral } from '../../Contexto';

type Props = {
  searchBarText?: string;
};
const props = defineProps<Props>();

//

const { disciplinaId } = useContextDiariosFormGeral();

const {
  composables: { useListQuery: useListQueryDiariosProfessores },
} = useLadesaApiCrudDiariosProfessores();

const { items: diariosProfessoresList } = await useListQueryDiariosProfessores(
  {}
);

//

const isFormVisible = ref(false);

const { searchBarText } = toRefs(props);

const showTeacherSection = ref(false);
const showGroupingSection = ref(false);

//

const $emit = defineEmits(['close', 'back', 'next', 'add']);

const closeForm = () => {
  $emit('close');
};

const backForm = () => {
  $emit('back');
};

const selectRole = (role: string) => {
  showTeacherSection.value = role === 'Professor';
  showGroupingSection.value = role === 'AGRUPAMENTO';
};

function onClose() {
  $emit('close');
}

const goToAdd = () => {
  $emit('add');
};

//

const {
  composables: { useListQuery },
} = useLadesaApiCrudDiarios();

const queries = computed(() => ({
  filterDisciplinaId: [disciplinaId.value!],
}));

const { items: diarios } = await useListQuery(queries);
</script>

<template>
  <div v-if="!isFormVisible">
    <DialogModalBaseLayout :on-close="onClose" title="Selecione uma turma">
      <v-expansion-panels>
        <v-expansion-panel
          v-for="diario in diarios"
          :key="diario.id"
          :elevation="0"
          class="custom-panel border-ldsa-grey border-2"
        >
          <v-expansion-panel-title
            class="custom-panel-title border-none"
            :hide-actions="true"
          >
            <div class="title-content">
              <div>
                <span
                  class="title-espansion mb-2 font-semibold text-ldsa-text-default no-underline inline-block"
                >
                  {{ diario.turma.periodo }} -
                  {{ diario.turma.curso.nomeAbreviado }}
                </span>
                <small class="subtitle">
                  Modalidade: {{ diario.turma.curso.ofertaFormacao.nome }}
                </small>
              </div>
              <div class="icons">
                <v-icon small class="icon">mdi-trash-can</v-icon>
                <v-icon small class="expansion-arrow icon ml-2"
                  >mdi-menu-down</v-icon
                >
              </div>
            </div>
          </v-expansion-panel-title>

          <v-expansion-panel-text>
            <SectionDiariosModalAccessRole @select-role="selectRole" />
            <v-divider inset />

            <div v-if="showTeacherSection" class="Seaction-Teacher pt-3">
              <UISearchBar
                :value="searchBarText"
                @update:value="searchBarText = $event"
              />

              <v-alert
                v-if="diariosProfessoresList.length === 0"
                type="warning"
                class="mt-4 rounded-md"
              >
                Nenhum professor encontrado para este diário.
              </v-alert>

              <LazyUIGridSelectionUser v-else :items="diariosProfessoresList">
                <template #item="{ item: diarioProfessor }">
                  <LazyUICardUser variant="block">
                    <template #title>
                      {{ diarioProfessor.perfil.usuario.nome }}
                    </template>

                    <UICardLine>
                      <span class="text-left w-full block">
                        Cargo: {{ diarioProfessor.perfil.cargo }}
                      </span>
                    </UICardLine>
                  </LazyUICardUser>
                </template>
              </LazyUIGridSelectionUser>
            </div>

            <div v-if="showGroupingSection" class="Seaction-Grouping pt-3">
              <UIDaySelectionClass />
            </div>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
      <div class="button-solo">
        <UIButtonModalAddNewClassButton @click="goToAdd" />
      </div>

      <template #button-group>
        <UIButtonModalBackButton @click="backForm" />
        <UIButtonModalFinishButton @click="closeForm" />
      </template>
    </DialogModalBaseLayout>
  </div>
</template>

<style scoped>
@reference "~/assets/styles/app.css";

.button-solo {
  display: flex;
  justify-content: flex-start;
  margin-top: 20px;
  gap: 20px;
}

.custom-panel {
  border-radius: 0.5rem !important;
}

.custom-panel-title {
  display: flex;

  justify-content: space-between;
  align-items: center;
  padding: 16px;

  @apply border-[1px] border-ldsa-grey;
}

.title-content {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.subtitle {
  display: block;
  font-size: 15px;
  @apply text-ldsa-grey;
  font-weight: 500;
}

.icons {
  display: flex;
  align-items: center;
}

.icon {
  cursor: pointer;
  margin-left: 8px;
}

.expansion-arrow {
  @apply text-ldsa-green-1;
  transform: rotate(0deg);
  transition: transform 0.3s ease;
}

.v-expansion-panel--active .expansion-arrow {
  transform: rotate(-180deg);
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
</style>
