<script setup lang="ts">
import IconClass from '~/components/Icons/IconClass.vue';
import IconEducator from '~/components/Icons/IconEducator.vue';

const toggleItems = [
  { text: 'Professor', value: 'professor', icon: IconEducator },
  { text: 'Turma', value: 'turma', icon: IconClass },
];

const toggleValue = ref<'professor' | 'turma'>('professor');

//

const searchBarValue = ref('');

//

const checkboxItems = ['turma 1', 'turma 2', 'turma 3', 'turma 4', 'turma 5'];

const selectedCheckboxes = ref([]);
</script>

<template>
  <div class="flex justify-between w-full">
    <div>
      <UIToggle :items="toggleItems" v-model="toggleValue"></UIToggle>

      <UISearchBar v-model="searchBarValue" />

      <ul class="flex flex-col">
        <li
          v-for="item in checkboxItems"
          :key="item"
          class="border-t-1 border-t-ldsa-grey"
        >
          <UICheckbox
            class="p-3"
            :items="[item]"
            v-model="selectedCheckboxes"
          />
        </li>
      </ul>
    </div>
  </div>
</template>
