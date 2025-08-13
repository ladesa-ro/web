<script setup lang="ts">
import { useForm, type FormContext } from 'vee-validate';
import IconClass from '~/components/Icons/Class.vue';
import IconEducator from '~/components/Icons/Educator.vue';
import IconOthers from '~/components/Icons/Others.vue';

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

//

const turmasFilters = defineModel<FormContext | {}>('turmasFilters', {
  default: {},
});

const turmasAutocompleteValues = useForm();

onMounted(() => (turmasFilters.value = turmasAutocompleteValues));
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
      class="flex max-lg:flex-col gap-4 lg:gap-3 justify-between max-lg:w-full"
      v-show="selectedToggleItem !== 'mesclado'"
    >
      <UISearchBar class="search-bar-width" v-model="searchBarValue" />

      <div
        v-show="selectedToggleItem === 'turma'"
        class="flex max-sm:flex-col gap-4 sm:gap-3 w-full lg:max-w-135 lg:max-h-12"
      >
        <VVAutocompleteAPIOfertaFormacao class="flex-1" name="formacao" />
        <VVAutocompleteAPICurso class="flex-1" name="curso" />
      </div>
    </section>
  </div>
</template>

<style scoped>
@reference "~/assets/styles/app.css";

/* class used to win the specifity of max-w class in search bar component */
section > .search-bar-width {
  @apply max-w-full lg:max-w-[23.313rem];
}
</style>
