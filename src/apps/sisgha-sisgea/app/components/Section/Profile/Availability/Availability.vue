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
    class="max-[56.25rem]:max-h-max"
    :icon="SISGHALogo"
  >
    <SectionCalendarioIndisponibilidadeProfessor
      v-if="professorPerfilId"
      tipo-entidade="professor"
      :entidade-id="professorPerfilId"
    />

    <p v-else class="text-sm text-ldsa-grey">
      Você não possui vínculo de professor para gerenciar indisponibilidade.
    </p>
  </SectionProfileSectionsLayout>
</template>

<style scoped>
@reference "~/assets/styles/app.css";

.day-week-navigator {
  @apply flex justify-between items-center gap-10;
  @apply h-9 px-1 bg-ldsa-green-1 text-ldsa-white;
}

.arrow {
  @apply px-3 py-2.5 text-ldsa-white;
}
</style>
