<script lang="ts" setup>
import { ref } from 'vue';
import IconEducator from '../icons/Educator.vue';
import IconGroup from '../icons/Group.vue';

const emit = defineEmits(['selectRole']);

const activeButton = ref<string>('DAPE');

const selectProfessor = () => {
  activeButton.value = 'Professor';
  emit('selectRole', 'Professor');
};

const selectAgrupamento = () => {
  activeButton.value = 'AGRUPAMENTO';
  emit('selectRole', 'AGRUPAMENTO');
};
</script>

<template>
  <div
    class="ui-access-role-cards u-flex u-flex-col u-justify-between u-items-center"
  >
    <section class="u-flex u-flex-row u-justify-between u-w-full u-gap-4">
      <div
        :class="{
          'ui-access-role-cards__option--active': activeButton === 'AGRUPAMENTO',
          'ui-access-role-cards__option--inactive':
            activeButton !== 'AGRUPAMENTO',
        }"
        class="ui-access-role-cards__option"
        @click="selectAgrupamento"
      >
        <IconGroup height="40" width="42" />
        <p class="ui-access-role-cards__option-label">Aulas por dia</p>
      </div>

      <div
        :class="{
          'ui-access-role-cards__option--active': activeButton === 'Professor',
          'ui-access-role-cards__option--inactive': activeButton !== 'Professor',
        }"
        class="ui-access-role-cards__option"
        @click="selectProfessor"
      >
        <IconEducator height="49" width="36" />
        <p class="ui-access-role-cards__option-label">Professores</p>
      </div>
    </section>
  </div>
</template>
