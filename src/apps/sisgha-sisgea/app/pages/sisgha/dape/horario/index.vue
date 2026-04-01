<script setup lang="ts">
const selectedToggleItem = ref<'professor' | 'turma' | 'mesclado'>('professor');
const { values, turmasOptions } = useHorarioDapeFilters();
</script>

<template>
  <UIContainer
    variant="large"
    class="flex flex-col"
    :class="selectedToggleItem !== 'mesclado' ? 'gap-7' : 'gap-3'"
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

<style scoped src="~/components/UI/API/List/Results/Grid/Grid.css" />
