<script setup>
import SISGHALogo from '~/components/Logo/SISGHA/Logo.vue';
import { useApiContext } from '~/composables/api-context/setup';

const { resumoVinculos } = useApiContext();

const professorPerfilId = computed(
  () => resumoVinculos.value.mapaCargoVinculos.professor?.[0]?.id ?? null
);
</script>

<template>
  <SectionProfileSectionsLayout
    title="Disponibilidade"
    class="availability-layout"
    :icon="SISGHALogo"
  >
    <SectionCalendarioIndisponibilidadeProfessor
      v-if="professorPerfilId"
      tipo-entidade="professor"
      :entidade-id="professorPerfilId"
    />

    <p v-else class="availability-empty-message u-text-sm">
      Você não possui vínculo de professor para gerenciar indisponibilidade.
    </p>
  </SectionProfileSectionsLayout>
</template>

<style scoped>
@media (max-width: 56.25rem) {
  .availability-layout {
    max-height: max-content;
  }
}

.availability-empty-message {
  color: var(--ladesa-grey-color);
}

.day-week-navigator {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--ui-space-10);
  height: 2.25rem;
  padding-inline: var(--ui-space-1);
  background-color: var(--ladesa-green-1-color);
  color: var(--ladesa-white-color);
}

.arrow {
  padding-inline: var(--ui-space-3);
  padding-block: var(--ui-space-2-5);
  color: var(--ladesa-white-color);
}
</style>
