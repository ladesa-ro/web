<script lang="ts" setup>
type Props = {
  horarioInicio?: string | null;
  horarioFim?: string | null;
  ambientes?: Array<{ id: string; nome?: string | null }> | null;
};

const props = defineProps<Props>();

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
  <div
    class="flex flex-col gap-2 border-2 border-dashed border-ldsa-grey/60 rounded-lg p-5 bg-[repeating-linear-gradient(135deg,var(--ladesa-grey-color,#9ca3af)_0,var(--ladesa-grey-color,#9ca3af)_2px,transparent_2px,transparent_10px)] bg-ldsa-grey/10 dark:bg-ldsa-grey/20"
  >
    <div class="flex items-center gap-2 font-medium text-ldsa-grey">
      <div class="rounded-full w-2.5 h-2.5 bg-ldsa-grey/60" />
      <h1>Ocupado</h1>
    </div>

    <p v-if="horarioLabel" class="text-sm text-ldsa-grey">
      {{ horarioLabel }}
    </p>

    <SectionCalendarioEventLocale
      v-if="ambientesLabel"
      :locale="ambientesLabel"
    />
  </div>
</template>
