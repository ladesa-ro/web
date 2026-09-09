<script setup lang="ts">
const selectedToggleItem = ref<'professor' | 'turma' | 'mesclado'>('professor');
const { values, turmasOptions } = useHorarioDapeFilters();
</script>

<template>
  <UIContainer
    variant="large"
    class="u-flex u-flex-col"
    :class="selectedToggleItem !== 'mesclado' ? 'u-gap-7' : 'u-gap-3'"
  >
    <UIBreadcrumbDapeBreadcrumb />

    <SectionHorarioDapeGeneralVisualizationHeader
      v-model:toggle="selectedToggleItem"
    />

    <KeepAlive>
      <SectionUsuarios
        v-if="selectedToggleItem === 'professor'"
        items-link="horario/professor"
        :edit-button="false"
        :default-style="false"
        :crud-enable="false"
      />
    </KeepAlive>

    <KeepAlive>
      <UIAPIList
        v-if="selectedToggleItem === 'turma'"
        :options="turmasOptions"
        :default-style="false"
        search-bar-container-style="u-flex dape-horario__search-actions"
      >
        <template #options-actions>
          <form class="u-flex u-gap-4 u-w-full dape-horario__filters-form">
            <VVAutocompleteAPIOfertaFormacao
              class="u-flex-1"
              name="ofertaFormacaoId"
            />
            <VVAutocompleteAPICurso class="u-flex-1" name="cursoId" />
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

<style scoped src="~/components/UI/API/List/Results/Grid/Grid.css" />

<style scoped>
.dape-horario__filters-form {
  flex-direction: column;
  height: max-content;
}

@media (min-width: 640px) {
  .dape-horario__filters-form {
    flex-direction: row;
    gap: var(--ui-space-3);
  }
}

@media (min-width: 1024px) {
  .dape-horario__filters-form {
    max-width: 33.75rem;
  }
}

:deep(.dape-horario__search-actions) {
  flex-direction: column;
  gap: var(--ui-space-4);
}

@media (min-width: 640px) {
  :deep(.dape-horario__search-actions) {
    gap: var(--ui-space-3);
  }
}

@media (min-width: 1024px) {
  :deep(.dape-horario__search-actions) {
    flex-direction: row;
  }
}
</style>
