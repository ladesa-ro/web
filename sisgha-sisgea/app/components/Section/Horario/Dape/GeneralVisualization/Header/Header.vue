<script setup lang="ts">
import IconClass from '~/components/Icons/IconClass.vue';
import IconEducator from '~/components/Icons/IconEducator.vue';
import IconOthers from '~/components/Icons/IconOthers.vue';
import SearchBar from '~/components/UI/SearchBar/SearchBar.vue';

const toggleItems = [
  {
    text: 'Professor',
    value: 'professor',
    icon: IconEducator,
  },
  {
    text: 'Turma',
    value: 'turma',
    icon: IconClass,
  },
  {
    text: 'Mesclado',
    value: 'mesclado',
    icon: IconOthers,
  },
];

const selectedToggleItem = defineModel<'professor' | 'turma' | 'mesclado'>(
  'toggle',
  { required: true }
);

//

const popoverOpen = ref(false);

//

const searchBarValue = defineModel<string | undefined>('searchBar', {
  required: false,
  default: '',
});
</script>

<template>
  <div class="flex flex-col gap-6">
    <section
      class="flex max-md:flex-col justify-between max-md:gap-4 pb-6 border-b border-b-ldsa-grey"
    >
      <UIToggle
        class="h-max"
        v-model="selectedToggleItem"
        :items="toggleItems"
      />

      <SectionHorarioDapeGeneralVisualizationHeaderSelectWeek
        v-model="popoverOpen"
      />
    </section>

    <section
      class="flex justify-between max-h-5"
      v-show="selectedToggleItem !== 'mesclado'"
    >
      <SearchBar class="search-bar-width" v-model="searchBarValue" />

      <div
        v-show="selectedToggleItem === 'turma'"
        class="flex gap-3 w-full search-bar-width"
      >
        <VVAutocompleteAPIOfertaFormacao class="flex-1" name="formacao" />
        <VVAutocompleteAPICurso class="flex-1" name="curso" />
      </div>
    </section>
  </div>
</template>

<style scoped>
/* class used to win the specifity of max-w class in search bar component */
section > .search-bar-width {
  max-width: 23.3rem;
}
</style>
