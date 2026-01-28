<script setup lang="ts">
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { setupUIApiListContext } from '~/components/UI/API/List/Context/UIApiListContext';

const searchBarValue = ref<string>('');

const selectedToggleItem = ref<'professor' | 'turma' | 'mesclado'>('professor');

const schema = yup.object().shape({
  ofertaFormacaoId: yup.string().notRequired(),
  cursoId: yup.string().notRequired(),
});

const { values } = useForm({
  validationSchema: schema,
  initialValues: {
    ofertaFormacaoId: '',
    cursoId: '',
  },
});

const turmasFilters = computed(() => ({
  filterCursoId: values.cursoId,
  filterCursoOfertaFormacaoId: values.ofertaFormacaoId,
}));

const { crudModule: turmasCrudModule } = useLadesaApiCrudTurmas();

const turmasOptions = {
  crudModule: turmasCrudModule,
  filter: turmasFilters,
};

watch(turmasFilters, () => {
  setupUIApiListContext(turmasOptions);
});
</script>

<template>
  <UIContainer
    variant="large"
    class="flex flex-col"
    :class="selectedToggleItem !== 'mesclado' ? 'gap-7' : 'gap-3'"
  >
    <SectionHorarioDapeGeneralVisualizationHeader
      v-model:toggle="selectedToggleItem"
    />

    <SectionUsuariosGrid
      v-show="selectedToggleItem === 'professor'"
      items-link="horario/professor"
      :search-bar-text="searchBarValue"
    />

    <KeepAlive>
      <UIAPIList
        v-if="selectedToggleItem === 'turma'"
        :options="turmasOptions"
        :defaultStyle="false"
        search-bar-container-style="flex max-lg:flex-col sm:gap-3 gap-4"
      >
        <template #options-actions>
          <form
            class="flex max-sm:flex-col gap-4 sm:gap-3 w-full lg:max-w-135 h-max"
          >
            <VVAutocompleteAPIOfertaFormacao
              class="flex-1"
              name="ofertaFormacaoId"
            />
            <VVAutocompleteAPICurso class="flex-1" name="cursoId" />
          </form>
        </template>

        <template #grid-item="{ item, isLoading }">
          <SectionTurmasGridItem
            :is-loading="isLoading"
            :item="item"
            link="horario/turma"
            :edit-button="false"
          />
        </template>

        <template #grid-item-skeleton>
          <SectionTurmasGridItem :is-loading="true" :item="null" />
        </template>
      </UIAPIList>
    </KeepAlive>

    <KeepAlive>
      <SectionHorarioDapeGeneralVisualizationMesclado
        v-if="selectedToggleItem === 'mesclado'"
      />
    </KeepAlive>

    <SectionHorarioDapeGenerateModal
      :selected-toggle-item="selectedToggleItem"
    />
  </UIContainer>
</template>

<style scoped src="~/components/UI/API/List/Results/Grid/Grid.css"></style>
