<script lang="ts" setup>
import { defineProps, ref, toRefs } from 'vue';
import { useContextDiariosFormGeral } from '../../Contexto';

//

type Props = {
  searchBarText?: string;
  // diario: DiarioFindOneResultDto;
};

const props = defineProps<Props>();

//

const { disciplinaId } = useContextDiariosFormGeral();

// const { diario } = toRefs(props);

const { diariosProfessoresList } =
  await useApiDiariosProfessoresFindAllByDiarioId({
    // diario: diario.value,
  });

//

const $emit = defineEmits(['close', 'back', 'next', 'add']);

const isFormVisible = ref(false);

const { searchBarText } = toRefs(props);
const { disciplinas } = await useApiDisciplinasFindAll(searchBarText);

const showTeacherSection = ref(false);
const showGroupingSection = ref(false);

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

const goToAdd = () => {
  $emit('add');
};

//

const { items: diarios } = await useApiDiariosFindAll('', {
  filterDisciplinaId: [disciplinaId.value!],
});
</script>

<template>
  <v-form v-if="!isFormVisible" class="form">
    <div class="form-header">
      <h1 class="main-title">
        <span>Turma</span>
      </h1>
    </div>

    <v-divider class="my-4" />

    <div class="form-body modal-form">
      <v-expansion-panels>
        <v-expansion-panel
          v-for="diario in diarios"
          :key="diario.id"
          :elevation="0"
          class="custom-panel border-[#9AB69E] border-2"
        >
          <v-expansion-panel-title
            class="custom-panel-title border-none"
            :hide-actions="true"
          >
            <div class="title-content">
              <div>
                <span
                  class="title-espansion mb-2 font-semibold text-black no-underline inline-block"
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
    </div>

    <v-divider />

    <div class="form-footer">
      <div class="button-solo">
        <UIButtonModalAddNewClassButton @click="goToAdd" />
      </div>
      <div class="button-group">
        <UIButtonModalBackButton @click="backForm" />
        <UIButtonModalFinishButton @click="closeForm" />
      </div>
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

  border: 1px solid #e0e0e0;
}

.title-content {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.subtitle {
  display: block;
  font-size: 15px;
  color: #9ab69e;
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
  color: #00a000;
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
