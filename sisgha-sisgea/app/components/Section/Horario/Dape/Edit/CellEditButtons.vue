<script setup lang="ts">
import type {
  Aula,
  EditableCellType,
  Vago,
} from '~/composables/schedule/useScheduleTypes';

const cell = defineModel<Aula | Vago>({
  required: true,
  default: {},
});

const emit = defineEmits(['atividade-change']);

const changeCellType = (atv: EditableCellType) => {
  if (cell.value.tipo !== atv) {
    cell.value.tipo = atv;

    if (cell.value.tipo === 'aula') {
      // TODO: fazer modificações no diário da aula
    }

    emit('atividade-change');
  }
};

//

const popoverOpen = defineModel<boolean>('popover', {
  default: false,
  required: false,
});

const toggleItems = [
  { text: 'Aula', value: 'aula' },
  { text: 'Vago', value: 'vago' },
];

const cellType = computed(() => cell.value.tipo);

const changeActivityValue = ref(cellType.value ?? 'vago');
</script>

<template>
  <div class="flex">
    <SectionHorarioDapeEditPopover
      v-model="popoverOpen"
      :handle-confirm-button-click="changeCellType(changeActivityValue)"
    >
      <template #activator>
        <IconsEdit
          class="px-[0.15625rem] text-ldsa-text-default hover:bg-ldsa-text-default/10 mr-1 rounded"
        />
      </template>

      <UIToggle
        class="h-9"
        v-model="changeActivityValue"
        :items="toggleItems"
      />

      <!-- TODO: add autocompletes para modificar a aula -->
    </SectionHorarioDapeEditPopover>

    <IconsExclude
      @click.stop="changeCellType('vago')"
      :class="[
        'inline w-4.5 p-0.5 text-ldsa-red hover:bg-ldsa-red/10 rounded',
        cell.tipo === 'vago' ? 'opacity-0 cursor-default' : 'cursor-pointer',
      ]"
    />
  </div>
</template>
