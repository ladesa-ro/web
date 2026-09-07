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
  <div class="u-flex u-flex-col u-gap-2 u-rounded-lg u-p-5 ocupado-card">
    <div class="u-flex u-items-center u-gap-2 u-font-medium ocupado-card__title">
      <div class="u-rounded-full ocupado-card__dot" />
      <h1>Ocupado</h1>
    </div>

    <p v-if="horarioLabel" class="u-text-sm ocupado-card__horario">
      {{ horarioLabel }}
    </p>

    <SectionCalendarioEventLocale
      v-if="ambientesLabel"
      :locale="ambientesLabel"
    />
  </div>
</template>

<style scoped>
.ocupado-card {
  border: 2px dashed rgb(from var(--ladesa-grey-color) R G B / 60%);
  background-image: repeating-linear-gradient(
    135deg,
    var(--ladesa-grey-color, #9ca3af) 0,
    var(--ladesa-grey-color, #9ca3af) 2px,
    transparent 2px,
    transparent 10px
  );
  background-color: rgb(from var(--ladesa-grey-color) R G B / 10%);
}

:global(.dark) .ocupado-card {
  background-color: rgb(from var(--ladesa-grey-color) R G B / 20%);
}

.ocupado-card__title {
  color: var(--ladesa-grey-color);
}

.ocupado-card__dot {
  width: 0.625rem;
  height: 0.625rem;
  background-color: rgb(from var(--ladesa-grey-color) R G B / 60%);
}

.ocupado-card__horario {
  color: var(--ladesa-grey-color);
}
</style>
