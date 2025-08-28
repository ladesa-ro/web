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

const open = ref(false);
</script>

<template>
  <div class="flex">
    <UIPopover v-model="open" arrow>
      <template #activator>
        <IconsEdit
        @click.stop
          class="inline-block p-[1px] text-ldsa-text-default mr-2.5 hover:bg-ldsa-grey/10"
        />
      </template>

      <div
        class="flex flex-col gap-3 border-2 border-ldsa-green-1 rounded-lg p-2.5 bg-ldsa-bg"
      >
        <button
          class="p-2 border-2 border-gray-400 rounded-md cursor-pointer"
          @click.stop="changeCellActivity('aula')"
        >
          Aula
        </button>
        <button
          class="p-2 border-2 border-gray-400 rounded-md cursor-pointer"
          @click.stop="changeCellActivity('vago')"
        >
          Vago
        </button>

        <div class="flex justify-between gap-3">
          <UIButtonModalCancel variant="small" />

          <UIButtonModalConfirm variant="small" />
        </div>
      </div>
    </UIPopover>

    <IconsExclude
      @click.stop="changeCellActivity('vago')"
      class="cursor-pointer inline w-3.5 text-ldsa-red hover:bg-ldsa-red/10"
    />
  </div>
</template>
