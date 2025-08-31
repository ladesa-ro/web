<script setup lang="ts">
import type {
  Aula,
  HorarioEditavelType,
  Vago,
} from '~/composables/schedule/useScheduleTypes';

const horarioMeta = defineModel<Aula | Vago>({
  required: true,
  default: {},
});

const emit = defineEmits(['atividade-change']);

const changeCellActivity = (atv: HorarioEditavelType) => {
  if (horarioMeta.value.tipo !== atv) {
    horarioMeta.value.tipo = atv;

    if (horarioMeta.value.tipo === 'aula') {
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

//

const toggleItems = [
  { text: 'Aula', value: 'aula' },
  { text: 'Vago', value: 'vago' },
];

const horarioTipo = computed(() => horarioMeta.value.tipo);

const changeActivityValue = ref(horarioTipo.value ?? 'vago');
</script>

<template>
  <div class="flex">
    <UIPopover disable-animation v-model="popoverOpen" arrow>
      <template #activator>
        <IconsEdit
          @click.stop
          class="inline-block p-[.5px] text-ldsa-text-default mr-2.5 hover:bg-ldsa-grey/10"
        />
      </template>

      <div
        class="flex flex-col gap-3 border-2 border-ldsa-green-1 rounded-lg p-2.5 bg-ldsa-bg"
      >
        <UIToggle
          class="h-9"
          v-model="changeActivityValue"
          :items="toggleItems"
        />

        <!-- TODO: add autocompletes para modificar a aula -->

        <div class="flex justify-between gap-3">
          <UIButtonModalCancel
            variant="small"
            @click="popoverOpen = !popoverOpen"
          />

          <UIButtonModalConfirm
            variant="small"
            @click="
              () => {
                changeCellActivity(changeActivityValue);
                popoverOpen = !popoverOpen;
              }
            "
          />
        </div>
      </div>
    </UIPopover>

    <IconsExclude
      @click.stop="changeCellActivity('vago')"
      :class="[
        'inline w-4 text-ldsa-red hover:bg-ldsa-red/10',
        horarioMeta.tipo === 'vago'
          ? 'opacity-0 cursor-default'
          : 'cursor-pointer',
      ]"
    />
  </div>
</template>
