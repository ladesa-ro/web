<script lang="ts" setup>
import type { CalendarioAgendamentoCreateInputDto } from '@ladesa-ro/web.api.client';
import type { IAgendamentoFormOutput } from '~/components/Section/Calendario/Form/Shared/schema';

const props = defineProps<{
  editId?: string | null;
  initialData?: Partial<CalendarioAgendamentoCreateInputDto>;
  disabled?: boolean;
}>();

const emit = defineEmits<{
  back: [];
  submit: [data: IAgendamentoFormOutput];
  delete: [];
}>();
</script>

<template>
  <SectionCalendarioFormSharedEventoFormBase
    :edit-id="props.editId"
    :initial-data="props.initialData"
    :disabled="props.disabled"
    @back="emit('back')"
    @submit="data => emit('submit', data)"
    @delete="emit('delete')"
  />
</template>
