<script lang="ts" setup>
import { computed } from 'vue';
import EventLocale from './EventLocale.vue';

export type EventOcupadoProps = {
  horarioInicio?: string | null;
  horarioFim?: string | null;
  ambientes?: Array<{ id: string; nome?: string | null }> | null;
};

const props = defineProps<EventOcupadoProps>();

const horarioLabel = computed(() => {
  const inicio = props.horarioInicio?.slice(0, 5);
  const fim = props.horarioFim?.slice(0, 5);

  if (inicio && fim) return `${inicio} - ${fim}`;

  return inicio || fim || null;
});

const ambientesLabel = computed(() => {
  const ambientes = props.ambientes;

  if (!ambientes || ambientes.length === 0) return null;

  return ambientes.map(a => a.nome ?? a.id.substring(0, 8)).join(', ');
});
</script>

<template>
  <div class="ui-event-ocupado u-flex u-flex-col u-gap-2 u-rounded-lg u-p-5">
    <div
      class="ui-event-ocupado__title u-flex u-items-center u-gap-2 u-font-medium"
    >
      <div class="ui-event-ocupado__dot u-rounded-full" />
      <h1>Ocupado</h1>
    </div>

    <p v-if="horarioLabel" class="ui-event-ocupado__time u-text-sm">
      {{ horarioLabel }}
    </p>

    <EventLocale v-if="ambientesLabel" :locale="ambientesLabel" />
  </div>
</template>
